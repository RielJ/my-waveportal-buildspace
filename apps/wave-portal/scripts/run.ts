import { BigNumber } from "ethers";
import hre from "hardhat";

const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1")
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  let waveCount: BigNumber;
  waveCount = await waveContract.getTotalWaves();
  console.log({ waveCount });

  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let waveTxn = await waveContract.wave("A message!");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  console.log({ waveCount });

  waveTxn = await waveContract.connect(randomPerson).wave("Another Message!");
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
  console.log({ waveCount });

  const wavers = await waveContract.getAllWaves();
  console.log({ wavers });
};

const runMain = async () => {
  try {
    await main();
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
};

runMain();
