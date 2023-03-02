import { MODULE_NAME } from "./constants.js";
import * as helpers from "./helpers.js";
import * as log from "./logging.js";

export default function registerModuleSettings() {
  helpers.registerModuleSetting({
    name: "toggleBroadcast",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => window.location.reload(),
  });

  helpers.registerModuleSetting({
    name: "disableAvClient",
    scope: "client",
    config: !game.settings.get(MODULE_NAME, "toggleBroadcast"),
    default: true,
    type: Boolean,
    onChange: () => {},
  });

  // Register debug logging setting
  helpers.registerModuleSetting({
    name: "debug",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: (value) => log.setDebug(value),
  });
  
  // Set grid distance that is considered "within proximity"
    game.settings.register(moduleName, "audioDistance", {
        name: `${moduleName}.settings.audioDistance.name`,
        hint: `${moduleName}.settings.audioDistance.hint`,
        scope: "world",
        config: true,
        type: Number,
        default: 30,
        range: {
            min: 5,
            max: 200,
            step: 5
        }
    });

  // Set the initial debug level
  log.setDebug(game.settings.get(MODULE_NAME, "debug"));
}
