const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Token", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {


    // Contracts are deployed using the first signer/account by default
    //const [owner, otherAccount] = await ethers.getSigners();
    const [owner_] = await ethers.getSigners();

    const Faruq = await ethers.getContractFactory("Token");
    const faruq = await Faruq.deploy(owner_.address, "Faruq", "FRQ", 10000);

    


    return { faruq, owner_ };
  }
  it("Should deploy and set the owner correctly", async function () {
    const { faruq, owner_ } = await loadFixture(
      deployContractAndSetVariables
    );

    expect(await faruq.owner_()).to.equal(owner_.address);
    console.log("adress is:", owner.address);
  });


});