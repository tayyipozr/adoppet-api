// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6 <0.9.0;

contract Adoption {
    uint256 counter;
    mapping(uint256 => animal) public generallist;

    struct animal {
        address owner;
        address adopter;
        string content;
    }

    function adopt(
        address owner,
        address adopter,
        string calldata content
    ) public returns (animal memory) {
        counter++;
        generallist[counter] = animal(owner, adopter, content);
        return generallist[counter];
    }
}
