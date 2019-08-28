pragma solidity ^0.5.0;

pragma experimental ABIEncoderV2;

contract AmazingDapp {
    struct Task {
    uint id;
    uint date;
    string PN;
    string InvNo;
    string SignedInvVal;
    uint tokenId;
    bool done;
    uint dateComplete;
    }
  uint lastTaskId;
  uint[] taskIds;
  mapping(uint => Task) tasks;

  event TaskCreated(
    uint id,
    uint date,
    string InvNo,
    string PN,
    string SignedInvVal,
    uint tokenId,
    bool done
  );

  event TaskStatusToggled(
    uint id,
    bool done,
    uint date
  );
  constructor() public {
    lastTaskId = 0;
  }

  function getTaskIds()
    public
    view
    returns(uint[] memory)
    {
      return taskIds;
    }
/*
  function getTasks()
    external
    view
    returns(Task[] memory) {
    Task[] memory _tasks = new Task[](lastTaskId);
    for(uint i = 0; i < lastTaskId; i++) {
      _tasks[i] = tasks[i];
    }
    return _tasks;
  }*/

  function createPart(
                        string calldata _PN,
                        string calldata _InvNo,
                        string calldata _SignedInvVal
                        )
                        external
                        //public checkIfPartExist1(_PN)
                        {
                          lastTaskId++;
                          tasks[lastTaskId] = Task(lastTaskId, now, _PN, _InvNo, _SignedInvVal, lastTaskId, false, 0);
                          taskIds.push(lastTaskId);
                          emit TaskCreated(lastTaskId, now,  _PN, _InvNo, _SignedInvVal, lastTaskId, false);
                        }

    function toggleDone(uint id) 
    external
   {
    Task storage task = tasks[id];
    task.done = !task.done;
    task.dateComplete = task.done ? now : 0;
    emit TaskStatusToggled(id, task.done, task.dateComplete);
  }
 // Define a function 'fetchItemBufferOne' that fetches the data
    function fetchItemBufferOne(uint _lastTaskId)
            public
            view
            returns
            (
                uint lastTaskIDParam,
                uint tokenId,
                string memory PN,
                //string memory _ItemNo,
                string memory InvNo,
                string memory SignedInvVal,
                uint dateComplete,
                uint date,
                bool done
            )
            {
                lastTaskIDParam = tasks[_lastTaskId].id;
                tokenId = tasks[_lastTaskId].tokenId;
                date = tasks[_lastTaskId].date;
                PN = tasks[_lastTaskId].PN;
                InvNo = tasks[_lastTaskId].InvNo;
                SignedInvVal = tasks[_lastTaskId].SignedInvVal;
                dateComplete = tasks[_lastTaskId].dateComplete;
                done = tasks[_lastTaskId].done;
                return
                (
                    lastTaskIDParam,
                    tokenId,
                    PN,
                    InvNo,
                    SignedInvVal,
                    dateComplete,
                    date,
                    done
                );
            }

  modifier taskExists(uint id) {
    if(tasks[id].id == 0) {
      revert();
    }
    _;
  }

}
