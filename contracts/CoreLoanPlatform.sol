// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract CoreLoanPlatform {
    // Interfaces for ERC20 tokens
    IERC20 public immutable USD;
    IERC20 public immutable BTC;

    // Loan Parameters (Immutable Constants)
    uint256 public constant COLLATERAL_RATIO = 150; // 150% collateralization
    uint256 public constant BORROWABLE_RATIO = 80; // 80% of collateral can be borrowed
    uint256 public constant INTEREST_RATE = 5; // 5% interest rate
    uint256 public constant LOAN_DURATION = 30 days;
    uint256 private totalStaked = 0; //Counter for total staked
    uint256 private totalBorrowed = 0; //Counter for total borrowed

    // Loan Struct
    struct Loan {
        uint256 amount; // Amount of USD borrowed
        uint256 collateral; // Amount of BTC deposited as collateral
        uint256 startTimeStamp; // Timestamp of loan initiation
        bool active; // Status of the loan (true = active, false = repaid)
    }

    // Mappings to Store Loan and Balance Data
    mapping(address => Loan) public loans; // Maps borrower's address to their loan details
    mapping(address => uint256) public lenderBalances; // Maps lender's address to their BTC balance

    // Function Declarations (Placeholders)
    function depositCollateral(uint256 amount) external {
        // TODO : Implement Logic for deposting Collateral
    }

    function withdrawCollateral(uint256 amount) external {
        // TODO : Implement Logic for withdrawing Collateral
    }

    function withdrawBTC(uint256 amount) external {
        // TODO : Implement Logic for withdrawing BTC
    }

    function getBorrowableAmount(address user) external view returns (uint256) {
        // TODO : Implement Logic for fetching borrowable amount
    }

    function getUserCollateral(address user) external view returns (uint256) {
        // TODO : Implement Logic for fetching user's collateral amount
    }

    function borrowBTC(uint256 amount) external {
        // TODO : Implement Logic for borrowing BTC
    }

    function depositBTC(uint256 amount) external {
        // TODO : Implement Logic for deposting BTC
    }

    function repayLoan(address user) external {
        // TODO : Implement Logic for repaying Loan
    }

    function calculateInterest(address user) external view returns (uint256) {
        // TODO : Implement Logic for calculating interest
    }

    function getLoanDetails(
        address borrower
    ) external view returns (Loan memory) {
        // TODO : Implement Logic for fetching loan of specific borrower
    }

    function getLenderBalance(address lender) external view returns (uint256) {
        // TODO : Implement Logic for getting the Lender balance
    }

    function getTotalStaked() external view returns (uint256) {
        // TODO : Implement Logic for fetching total staked amount
    }

    function getTotalBorrowed() external view returns (uint256) {
        // TODO : Implement Logic for fetching total borrowed amount
    }

    function getCurrentApy() external pure returns (uint256) {
        // TODO : Implement Logic for fetching current APY
    }

    function getUserBorrowed(address user) external view returns (uint256) {
        // TODO : Implement Logic for fetching a User's borrowed amount
    }

    function getUserStaked(address user) external view returns (uint256) {
        // TODO : Implement Logic for fetching a User's Staked amount
    }
}
