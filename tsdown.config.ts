import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig = defineConfig({
  entry: "index.ts",
  minify: true,
  sourcemap: true,
});

export default config;
