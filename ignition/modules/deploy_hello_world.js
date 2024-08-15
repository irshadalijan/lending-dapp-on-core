const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("HelloWorldModule", (m) => {
  const HelloWorldContract = m.contract("HelloWorld", []);
  return { HelloWorldContract };
});