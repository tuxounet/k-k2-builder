import fs from "fs";
import path from "path";
import { IStackProps } from "../types";

export class Config {
  constructor(
    readonly env: string,
    readonly inventoryFolder: string,
    locals?: Record<string, unknown>
  ) {
    const globalConfigFile = path.join(
      this.inventoryFolder,
      "config",
      `global.json`
    );
    if (!fs.existsSync(globalConfigFile)) {
      throw new Error(
        `global config values not found at : "${globalConfigFile}"`
      );
    }
    const globalConfig = JSON.parse(
      fs.readFileSync(globalConfigFile, { encoding: "utf-8" })
    );
    const envConfigFile = path.join(
      this.inventoryFolder,
      "config",
      "envs",
      `${this.env}.json`
    );
    if (!fs.existsSync(envConfigFile)) {
      throw new Error(`config file not found at  "${envConfigFile}"`);
    }
    const envConfig = JSON.parse(
      fs.readFileSync(envConfigFile, { encoding: "utf-8" })
    );

    this.configuration = {
      ...globalConfig,
      ...envConfig,
      ...locals,
    };
  }

  readonly configuration: IStackProps;
  getOrDefault<T>(path: string, defaultValue: T): T {
    const current = this.configuration as any;
    const travel = (regexp: RegExp): any =>
      String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce(
          (res, key) => (res !== null && res !== undefined ? res[key] : res),
          current
        );
    const result: any = travel(/[,[\]]+?/) ?? travel(/[,[\].]+?/);
    return result === undefined || result === current
      ? defaultValue
      : (result as T);
  }

  get<T>(path: string): T {
    const result = this.getOrDefault(path, null);

    if (result === null) {
      throw new Error("value not found in config at path " + path);
    }

    return result as T;
  }
}

export function loadConfig(locals?: Record<string, unknown>): Config {
  const currentEnv = process.env.K2_ENV ?? "";

  const inventoryFolder = process.env.K2_INVENTORY ?? process.cwd();
  const configFolder = path.join(inventoryFolder, "config");
  if (!fs.existsSync(configFolder)) {
    throw new Error("config folder not found at path " + configFolder);
  }
  const envsFolder = path.join(configFolder, "envs");
  const allowedEnvs = fs
    .readdirSync(envsFolder, { encoding: "utf-8" })
    .filter((item) => path.extname(item).toLowerCase() === ".json")
    .map((item) => item.replace(path.extname(item), "").trim());
  if (!allowedEnvs.includes(currentEnv)) {
    throw new Error("current env not defined in envs configs");
  }
  const envConfigFile = path.join(envsFolder, currentEnv + ".json");
  if (!fs.existsSync(envConfigFile)) {
    throw new Error("no config file found for env at " + envConfigFile);
  }

  return new Config(currentEnv, inventoryFolder, locals);
}
