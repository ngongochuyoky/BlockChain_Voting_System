const hre = require("hardhat");

async function main() {

  const ElectionFact = await hre.ethers.getContractFactory("ElectionFact");
  const electionFact = await ElectionFact.deploy();

  await electionFact.deployed();

  console.log(
    `ElectionFactory deployed to ${electionFact.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
