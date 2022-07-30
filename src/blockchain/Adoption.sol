// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6 <0.9.0;

pragma abicoder v2;

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

    function getAnimal() public view returns (animal[] memory) {
        animal[] memory ret = new animal[](counter);
        for (uint256 i = 0; i < counter; i++) {
            ret[i] = generallist[i];
        }
        return ret;
    }
}
