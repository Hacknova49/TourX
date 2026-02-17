// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract TouristID is AccessControl {
    bytes32 public constant POLICE_ROLE = keccak256("POLICE_ROLE");
    bytes32 public constant TOURISM_ROLE = keccak256("TOURISM_ROLE");

    struct Tourist {
        string name;
        bytes32 kycHash;
        bytes32 itineraryHash;
        string emergencyContact;
        uint32 startDate;
        uint32 endDate;
        bool exists;
    }

    mapping(address => Tourist) private tourists;

    event TouristRegistered(address indexed touristAddress, string name);

    constructor() {
        // Skip _setupRole to avoid revert; grant roles manually after deployment
    }

    function registerTourist(
        address _touristAddress,
        string memory _name,
        bytes32 _kycHash,
        bytes32 _itineraryHash,
        string memory _emergencyContact,
        uint32 _startDate,
        uint32 _endDate
    ) public onlyRole(TOURISM_ROLE) {
        require(!tourists[_touristAddress].exists, "Already registered");
        tourists[_touristAddress] = Tourist({
            name: _name,
            kycHash: _kycHash,
            itineraryHash: _itineraryHash,
            emergencyContact: _emergencyContact,
            startDate: _startDate,
            endDate: _endDate,
            exists: true
        });
        emit TouristRegistered(_touristAddress, _name);
    }

    function getTourist(address _touristAddress) public view returns (Tourist memory) {
        require(
            hasRole(POLICE_ROLE, msg.sender) || hasRole(TOURISM_ROLE, msg.sender),
            "Access denied"
        );
        require(tourists[_touristAddress].exists, "Not found");
        return tourists[_touristAddress];
    }
}
