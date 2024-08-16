const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("BTCfi", (m) => {
	const BTC = m.contract("Bitcoin", ["Bitcoin", "BTC"]);
	const USD = m.contract("USD", ["US Dollar", "USD"]);
	const lending = m.contract("CoreLoanPlatform", [USD, BTC]);
	m.call(BTC, "transferOwnership", [lending]);
	m.call(USD, "transferOwnership", [lending]);

	return { BTC, USD, lending };
});