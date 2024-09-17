// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract FundRaiser {

  constructor(){

  }

  struct Event {
    string name;
    uint256 goal;
    uint256 goalAchieved;
  }

  mapping(uint256 => Event) public events;


  function createEvent(uint256 eventId, string calldata _name, uint256 _goal) public {
    events[eventId] = Event(_name, _goal, 0);
  }

  function updateEvent(uint256 _id, string memory _name, uint256 _goal) public {
    require(events[_id].goalAchieved < events[_id].goal, "Event has already reached its goal");
    events[_id].name = _name;
    events[_id].goal = _goal;
  }

  function fund(uint256 _id, uint256 _amount) public payable {
    events[_id].goalAchieved += _amount;
  }

  function getEventDetails(uint256 _id) public view returns (Event memory) {
    return events[_id];
  }
}