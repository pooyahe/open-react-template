/* eslint-disable @typescript-eslint/no-require-imports */
const { spawn } = require("node:child_process");

const port = process.env.PORT || "3100";
const next = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", port], {
  stdio: "inherit",
  windowsHide: true,
});

let shuttingDown = false;

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  next.kill(signal);
  setTimeout(() => process.exit(0), 5_000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
next.on("exit", (code) => process.exit(code ?? 0));
