const { keyboard, Key, sleep } = require("@nut-tree-fork/nut-js");

function PressVirtualCoin() {
  keyboard.config.autoDelayMs = 0;
  (async () => {
    await keyboard.pressKey(Key.Num5);
    await sleep(250);
    await keyboard.releaseKey(Key.Num5);
    await sleep(1000);
  })();
}
module.exports = { PressVirtualCoin };
