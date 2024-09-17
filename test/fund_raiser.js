const FundRaiser = artifacts.require("FundRaiser");

contract('FundRaiser', (accounts) => {
  let fundRaiserInstance;

  // Deploy the contract before running tests
  beforeEach(async () => {
    fundRaiserInstance = await FundRaiser.deployed();
  });

  // Test to check if the contract is deployed
  it('should deploy the contract', async () => {
    assert.notEqual(fundRaiserInstance.address, undefined, 'Contract address should not be undefined');
    assert.notEqual(fundRaiserInstance.address, null, 'Contract address should not be null');
    assert.notEqual(fundRaiserInstance.address, '', 'Contract address should not be an empty string');
  });
});
