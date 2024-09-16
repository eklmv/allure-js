module.exports = {
  extends: ["../../.eslintrc.cjs"],
  env: {
    jasmine: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json", "./test/tsconfig.json"],
  },
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: [".eslintrc.cjs", "vitest.config.ts", "vitest-setup.ts"],
    },
  ],
};
