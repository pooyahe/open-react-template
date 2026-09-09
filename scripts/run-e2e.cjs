/* eslint-disable @typescript-eslint/no-require-imports */
const { spawn } = require("node:child_process");
const http = require("node:http");

const port = 3100;
const baseURL = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["scripts/test-server.cjs"], {
  env: { ...process.env, PORT: String(port) },
  stdio: "inherit",
  windowsHide: true,
});

function isReady() {
  return new Promise((resolve) => {
    const request = http.get(`${baseURL}/`, (response) => {
      response.resume();
      resolve(response.statusCode >= 200 && response.statusCode < 500);
    });
    request.on("error", () => resolve(false));
    request.setTimeout(500, () => {
      request.destroy();
      resolve(false);
    });
  });
}

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (await isReady()) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("E2E server did not become ready within 30 seconds");
}

function stopServer() {
  if (!server.killed) server.kill("SIGTERM");
}

async function main() {
  try {
    await waitForServer();
    const playwright = spawn(process.execPath, ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)], {
      env: { ...process.env, PLAYWRIGHT_BASE_URL: baseURL },
      stdio: "inherit",
      windowsHide: true,
    });
    playwright.on("exit", (code, signal) => {
      stopServer();
      process.exit(code ?? (signal ? 1 : 0));
    });
  } catch (error) {
    stopServer();
    console.error(error);
    process.exit(1);
  }
}

process.on("SIGINT", () => stopServer());
process.on("SIGTERM", () => stopServer());
main();
