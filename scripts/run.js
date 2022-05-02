const main = async () => {
	// This will actually compile our contract and generate the necessary files we need to work with our contract under the artifacts directory.
	//  The Hardhat Runtime Environment, or HRE for short, is an object containing all the functionality that Hardhat exposes when running a task, test or script. In reality, Hardhat is the HRE.
	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

	// Hardhat will create a local Ethereum network for us, but just for this contract. Then, after the script completes it'll destroy that local network
	const waveContract = await waveContractFactory.deploy({ value: hre.ethers.utils.parseEther("0.1") });

	//We'll wait until our contract is officially deployed to our local blockchain
	await waveContract.deployed();
	console.log("Contract deployed to:", waveContract.address);

	/*
	 * Get Contract balance
	 */
	let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

	let waveCount;
	waveCount = await waveContract.getTotalWaves();
	console.log("Total Waves: ", waveCount.toString());

	/*
	 * Let's try two waves now
	 */
	const waveTxn = await waveContract.wave("This is wave #1");
	await waveTxn.wait();

	const waveTxn2 = await waveContract.wave("This is wave #2");
	await waveTxn2.wait();

	/*
	 * Get Contract balance to see what happened!
	 */
	contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

	/*
	 * Let's see a all waves!
	 */
	let allWaves = await waveContract.getAllWaves();
	console.log("All Waves: ", allWaves);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0); // exit Node process without error
	} catch (error) {
		console.log(error);
		process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
	}
	// Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
