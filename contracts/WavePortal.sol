// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
	uint256 totalWaves;
	event NewWave(address indexed from, uint256 timestamp, string message);
	struct Wave {
		address waver;
		uint256 timestamp;
		string message;
	}
	Wave[] waves;

	constructor() payable {
		console.log("We have been constructed!");
	}

	function wave(string memory _message) public {
		totalWaves += 1;
		console.log("%s waved w/ message %s", msg.sender, _message);
		waves.push(Wave(msg.sender, block.timestamp, _message));
		emit NewWave(msg.sender, block.timestamp, _message);

		uint256 prizeAmount = 0.0001 ether;
		require(prizeAmount <= address(this).balance, "Not enough funds to pay for prize.");
		(bool success, ) = msg.sender.call{ value: prizeAmount }("");
		require(success, "Failed to send prize.");
	}

	function getAllWaves() public view returns (Wave[] memory) {
		return waves;
	}

	function getTotalWaves() public view returns (uint256) {
		console.log("We have %d total waves!", totalWaves);
		return totalWaves;
	}
}
