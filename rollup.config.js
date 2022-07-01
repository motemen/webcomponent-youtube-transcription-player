// Import rollup plugins
import html from "@web/rollup-plugin-html";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import minifyHTML from "rollup-plugin-minify-html-literals";
import summary from "rollup-plugin-summary";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

export default {
  plugins: [
    html({
      input: "index.html",
    }),
    resolve(),
    commonjs(),
    minifyHTML(),
    typescript(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    summary(),
  ],
  output: {
    dir: "dist",
  },
  preserveEntrySignatures: "strict",
};
