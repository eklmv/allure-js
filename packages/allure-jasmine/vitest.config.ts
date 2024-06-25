import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "./test/spec",
    fileParallelism: false,
    testTimeout: 5000,
    setupFiles: ["./vitest-setup.ts"],
    reporters: ["default", ["allure-vitest/reporter", { resultsDir: "./out/allure-results" }]],
    typecheck: {
      enabled: true,
      tsconfig: "./tsconfig.test.json",
    },
  },
});
