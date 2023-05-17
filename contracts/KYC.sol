//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract KYC {
    struct UserData {
        string name;
        string documentId;
        bool isVerified;
    }

    mapping(address => UserData) public userData;
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function addUser(address _user, string memory _name, string memory _documentId) public onlyAdmin {
        userData[_user] = UserData(_name, _documentId, false);
    }

    function verifyUser(address _user) public onlyAdmin {
        userData[_user].isVerified = true;
    }

    function isUserVerified(address _user) public view returns (bool) {
        return userData[_user].isVerified;
    }
}
