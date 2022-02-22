// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Transaction{
    receive() external payable{}
    fallback() external payable{}
    
    event Transfer(
        address sender, 
        address receiver,
        uint amount, 
        string message,
        uint256 timestamp,
        string keyword 
    );

    function publishTransaction(
        address payable _receiver, 
        uint _amount, 
        string memory _message, 
        string memory _keyword
    ) public payable returns(string memory){
        _receiver.transfer(msg.value);
        emit Transfer(msg.sender, _receiver, _amount, _message, block.timestamp, _keyword);
        return "Transfer Berhasil";
    }
}