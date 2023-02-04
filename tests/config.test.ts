import { Config, loadConfig } from "../src/libs/config";
import path from "path";
describe("config testing", () => {
  test("nominal config load", async () => {
    process.env.K2_ENV = "test";
    process.env.K2_INVENTORY = path.join(__dirname, "fakes");

    const config = loadConfig();
    expect(config).not.toBeUndefined();
    expect(config.get("global.config.key", "unknow")).toBe("value30");
    expect(config.get("specific.env.key", "unknow")).toBe("value1");
    expect(config.get("inexistant", "unknow")).toBe("unknow");
  });
});
