/* eslint-disable @typescript-eslint/no-require-imports */
const { spawn } = require("node:child_process");
const http = require("node:http");
const { chromium } = require("@playwright/test");

const host = "127.0.0.1";
const port = 3100;
const baseUrl = `http://${host}:${port}`;

function waitForServer() {
  return new Promise((resolve, reject) => {
    const deadline = Date.now() + 30_000;
    const check = () => {
      const request = http.get(`${baseUrl}/`, (response) => {
        response.resume();
        if (response.statusCode && response.statusCode < 500) {
          resolve();
          return;
        }
        retry();
      });
      request.on("error", retry);
    };
    const retry = () => {
      if (Date.now() >= deadline) {
        reject(new Error(`Timed out waiting for ${baseUrl}`));
        return;
      }
      setTimeout(check, 250);
    };
    check();
  });
}

function stopServer(server) {
  if (!server || server.killed) return;
  server.kill();
}

async function measure(page, viewport) {
  await page.addInitScript(() => {
    window.__aktenkompassLcp = [];
    if ("PerformanceObserver" in window && PerformanceObserver.supportedEntryTypes?.includes("largest-contentful-paint")) {
      new PerformanceObserver((list) => {
        window.__aktenkompassLcp.push(...list.getEntries());
      }).observe({ type: "largest-contentful-paint", buffered: true });
    }
  });
  await page.setViewportSize(viewport);
  const response = await page.goto(`${baseUrl}/`, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle").catch(() => undefined);

  return page.evaluate(({ viewportWidth, viewportHeight, responseStatus }) => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    const lcpEntries = window.__aktenkompassLcp || performance.getEntriesByType("largest-contentful-paint");
    const layoutShiftEntries = performance.getEntriesByType("layout-shift");
    const eventEntries = performance.getEntriesByType("event");
    const classify = (name) => {
      if (/\.woff2?(\?|$)/i.test(name)) return "font";
      if (/(^|\/)__next\/static\/.*\.js(\?|$)/i.test(name) || /\.js(\?|$)/i.test(name)) return "javascript";
      if (/\.css(\?|$)/i.test(name)) return "css";
      if (/(^|\/)\_next\/image|\.(avif|webp|png|jpe?g|gif|svg)(\?|$)/i.test(name)) return "image";
      if (/\.(mp4|webm|mov)(\?|$)/i.test(name)) return "video";
      return "other";
    };
    const grouped = Object.fromEntries(["font", "javascript", "css", "image", "video", "other"].map((type) => [
      type,
      resources.filter((entry) => classify(entry.name) === type).reduce((total, entry) => total + (entry.transferSize || entry.encodedBodySize || 0), 0),
    ]));
    const cls = layoutShiftEntries.reduce((total, entry) => total + (entry.hadRecentInput ? 0 : entry.value), 0);
    const lcp = lcpEntries.at(-1);
    const hero = document.querySelector('img[alt*="Arbeitsplatz"]');
    const heroRect = hero?.getBoundingClientRect();

    return {
      viewport: `${viewportWidth}x${viewportHeight}`,
      responseStatus,
      requestCount: resources.length + 1,
      totalTransferBytes: resources.reduce((total, entry) => total + (entry.transferSize || entry.encodedBodySize || 0), navigation?.transferSize || 0),
      totalEncodedBytes: resources.reduce((total, entry) => total + (entry.encodedBodySize || 0), navigation?.encodedBodySize || 0),
      documentHtmlBytes: document.documentElement.outerHTML.length,
      navigation: navigation ? {
        responseEnd: navigation.responseEnd,
        domInteractive: navigation.domInteractive,
        domContentLoaded: navigation.domContentLoadedEventEnd,
        loadEventEnd: navigation.loadEventEnd,
        transferSize: navigation.transferSize,
        encodedBodySize: navigation.encodedBodySize,
      } : null,
      lcp: lcp ? {
        startTime: lcp.startTime,
        element: lcp.element?.tagName || null,
        source: lcp.element?.currentSrc || lcp.element?.textContent?.slice(0, 80) || null,
      } : null,
      cls,
      inp: eventEntries.filter((entry) => entry.interactionId).length ? "interaction entries available" : null,
      resourceBytesByType: grouped,
      hero: hero ? {
        currentSrc: hero.currentSrc,
        naturalWidth: hero.naturalWidth,
        naturalHeight: hero.naturalHeight,
        renderedWidth: heroRect?.width,
        renderedHeight: heroRect?.height,
      } : null,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      externalHostnames: [...new Set(resources.map((entry) => new URL(entry.name).hostname).filter((hostname) => hostname !== location.hostname))],
      resources: resources.map((entry) => ({ name: entry.name, type: classify(entry.name), transferSize: entry.transferSize, encodedBodySize: entry.encodedBodySize, duration: entry.duration })),
    };
  }, { viewportWidth: viewport.width, viewportHeight: viewport.height, responseStatus: response?.status() ?? null });
}

async function main() {
  const server = spawn(process.execPath, ["scripts/test-server.cjs"], { stdio: "inherit" });
  try {
    await waitForServer();
    const browser = await chromium.launch();
    const results = [];
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport });
      results.push(await measure(page, viewport));
      await page.close();
    }
    const mediaPage = await browser.newPage();
    await mediaPage.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
    const media = await mediaPage.evaluate(async () => {
      const image = new Image();
      image.src = "/media/hero/hero-poster.webp";
      await image.decode();
      const video = document.createElement("video");
      video.preload = "metadata";
      const metadata = new Promise((resolve) => {
        const finish = () => resolve({
          width: video.videoWidth || null,
          height: video.videoHeight || null,
          durationSeconds: Number.isFinite(video.duration) ? video.duration : null,
          readyState: video.readyState,
        });
        video.addEventListener("loadedmetadata", finish, { once: true });
        setTimeout(() => resolve({ width: null, height: null, durationSeconds: null, readyState: video.readyState, timedOut: true }), 10_000);
      });
      video.src = "/videos/video.mp4";
      document.body.append(video);
      return {
        poster: { width: image.naturalWidth, height: image.naturalHeight },
        video: await metadata,
      };
    });
    await mediaPage.close();
    await browser.close();
    console.log(JSON.stringify({ measuredAt: new Date().toISOString(), baseUrl, results, media }, null, 2));
  } finally {
    stopServer(server);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
