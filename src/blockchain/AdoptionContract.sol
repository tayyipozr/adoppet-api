// SPDX-License-Identifier: MIT
pragma solidity >=0.6.6 <0.9.0;

contract Adoption {
    uint256 counter;
    mapping(uint256 => animal) public generallist;

    struct animal {
        address owner;
        address adaptee;
        uint256 animal_id;
    }

    function adopt(
        address owner,
        address adoptee,
        uint256 animal_id
    ) public returns (animal memory) {
        counter++;
        generallist[counter] = animal(owner, adoptee, animal_id);
        return generallist[counter];
    }
}
