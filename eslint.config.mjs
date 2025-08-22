import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "react-hooks-extra": reactHooksExtra,
    },
    rules: {
      "react-hooks-extra/no-direct-set-state-in-use-effect": "warn",
    },
  },
];

export default eslintConfig;