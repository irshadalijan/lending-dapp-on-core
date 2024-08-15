const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
module.exports = buildModule("LoanDAppBasicModule", (m) => {
	const Contract = m.contract("CoreLoanPlatform", []);
	return { Contract };
});