import { defineConfig, type UserConfig } from "tsdown";

const config: UserConfig = defineConfig({
  minify: true,
  sourcemap: true,
});

export default config;
