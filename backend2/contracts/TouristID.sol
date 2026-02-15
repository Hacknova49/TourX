// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract TouristID is AccessControl {
    bytes32 public constant POLICE_ROLE = keccak256("POLICE_ROLE");
    bytes32 public constant TOURISM_ROLE = keccak256("TOURISM_ROLE");

    struct Tourist {
        string name;
        string kycHash;        // IPFS hash of KYC documents
        string itineraryHash;  // IPFS hash of itinerary
        string emergencyContact;
        uint256 startDate;
        uint256 endDate;
        bool exists;
    }

    mapping(address => Tourist) public tourists;

    event TouristRegistered(address indexed touristAddress, string name);

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender); // deployer is admin
    }

    // Only Tourism Department can register tourists
    function registerTourist(
        address _touristAddress,
        string memory _name,
        string memory _kycHash,
        string memory _itineraryHash,
        string memory _emergencyContact,
        uint256 _startDate,
        uint256 _endDate
    ) public onlyRole(TOURISM_ROLE) {
        require(!tourists[_touristAddress].exists, "Tourist already registered");

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

    // Both Police and Tourism Department can view tourist info
    function getTourist(address _touristAddress) public view returns (Tourist memory) {
        require(
            hasRole(POLICE_ROLE, msg.sender) || hasRole(TOURISM_ROLE, msg.sender),
            "Access denied"
        );
        require(tourists[_touristAddress].exists, "Tourist not found");
        return tourists[_touristAddress];
    }

    // Admin functions to assign roles
    function grantPoliceRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(POLICE_ROLE, account);
    }

    function grantTourismRole(address account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(TOURISM_ROLE, account);
    }
}
