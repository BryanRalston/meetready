import { copyFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";
// @ts-expect-error JS plugin alongside the TS vite config
import { appEnvPlugin } from "./scripts/app-env-plugin.mjs";
import { isMigrationFile } from "./scripts/migration-plan.mjs";

const githubPages = process.env.GITHUB_PAGES === "1";
const pagesBase = "/meetready/";

function hasGlobbedMigrations(root: string): boolean {
  try {
    return readdirSync(join(root, "migrations")).some(isMigrationFile);
  } catch {
    return false;
  }
}

function pgliteBootstrapPlugin(): Plugin {
  return {
    name: "meetready:pglite-bootstrap",
    apply: "serve",
    async configureServer(server) {
      if (!hasGlobbedMigrations(server.config.root)) return;
      try {
        const mod = (await server.ssrLoadModule("/src/lib/db.ts")) as {
          ensureDbReady?: () => Promise<void>;
        };
        if (typeof mod.ensureDbReady === "function") {
          await mod.ensureDbReady();
        }
      } catch (err) {
        console.error("[meetready] DB bootstrap failed:", err);
        throw err;
      }
    },
  };
}

function spa404(): Plugin {
  return {
    name: "meetready:spa-404",
    closeBundle() {
      const dirs = ["dist", join("dist", "client"), join(".output", "public")];
      for (const dir of dirs) {
        const index = resolve(dir, "index.html");
        const shell = resolve(dir, "_shell.html");
        if (!existsSync(index) && existsSync(shell)) copyFileSync(shell, index);
        if (!existsSync(index)) continue;
        copyFileSync(index, resolve(dir, "404.html"));
        writeFileSync(resolve(dir, ".nojekyll"), "");
      }
    },
  };
}

export default defineConfig(({ command, isPreview }) => ({
  base: githubPages ? pagesBase : "/",
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: false,
    watch: {
      ignored: ["**/docs/usag/**", "**/*.pdf"],
    },
  },
  preview: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    pgliteBootstrapPlugin(),
    appEnvPlugin(),
    tailwindcss(),
    tanstackStart(
      githubPages
        ? {
            spa: { enabled: true },
            router: { basepath: "/meetready" },
          }
        : undefined,
    ),
    ...(!githubPages && (command === "build" || isPreview)
      ? [
          nitro({
            preset: "vercel",
            serverDir: "./server",
          }),
        ]
      : []),
    viteReact(),
    ...(githubPages ? [spa404()] : []),
  ],
}));
