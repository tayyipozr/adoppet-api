// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.6.6 <0.9.0;

import '/Users/ozrtayyip/Desktop/adoppet-api/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract AdopToken is ERC20 {
    address public admin;

    constructor() ERC20('AdopToken', 'ADT') {
        _mint(msg.sender, 10000 * 10**18);
        admin = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, 'Only admin can mint tokens');
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
