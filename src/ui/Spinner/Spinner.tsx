/* eslint no-var: "off" */
import * as native from "./Spinner.native";
import * as web from "./Spinner.web";

declare var common: typeof native;
declare var common: typeof web;

export * from "./Spinner.web";
