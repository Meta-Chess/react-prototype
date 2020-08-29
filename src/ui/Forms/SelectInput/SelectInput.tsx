/* eslint no-var: "off" */
import * as native from "./SelectInput.native";
import * as web from "./SelectInput.web";

declare var common: typeof native;
declare var common: typeof web;

export * from "./SelectInput.web";
