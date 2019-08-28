import React from "react";
import { formatDate } from './utils';
import Button                   from '@material-ui/core/Button'
import {
  ContractData,
  ContractForm,
} from "drizzle-react-components";

export default class ReadString extends React.Component {
  state = { drizzleKey: [],
            dataKey: null,
            contract: null };

  componentDidMount() {
    
    const { drizzle, drizzleState } =  this.props;
    const contract =  drizzle.contracts.AmazingDapp;
    this.setState({ 
      // this appends a row to the array
      contract: drizzle.contracts.AmazingDapp
     })
    const dataKey = contract.methods["fetchItemBufferOne"].cacheCall(1);
    this.setState({ dataKey });
    debugger
    }
    
    async getTasks() {
      const { todo } = this.props;
      const taskIds = await todo.methods.getTaskIds().call();
      const promises = [];
      taskIds.forEach((taskId) => {
        promises.push(todo.methods.getTask(taskId).call());
      });
      return Promise.all(promises);
    }
  

  async mappingCall() {
    const contract =  drizzle.contracts.AmazingDapp;
    const { drizzle, drizzleState } =  await this.props;
    let dataKey = []
    const rows_created = 2;

    for (let i = 1; i <= rows_created; i++) {
          // let drizzle know we want to watch the fetch method
          dataKey.push(await contract.methods["fetchItemBufferOne"].cacheCall(i));
          await console.log(drizzle);
          await console.log(drizzleState);
          await console.log(dataKey)
    } 
    debugger
    // save the `dataKey` to local component state for later reference
     this.setState({
                    drizzleKey: [dataKey] 
                  });
      debugger
  }

  renderTask = (task) => (
    <tr key={task.id}>
      <td>{task.id}</td>
      <td>{formatDate(task.date)}</td>
      <td>{task.PN}</td>
      <td>{task.InvNo}</td>
      <td>{task.SignedInvVal}</td>
      <td>{task.tokenId}</td>
      <td>{task.done}</td>
      <td>{task.completeDate != '0' ? formatDate(task.completeDate) : ''}</td>
    </tr>
//  <div>My stored string:{JSON.stringify(storedData)}</div>;
  );
  render() {
    const { AmazingDapp } = this.props.drizzleState.contracts;
    const storedData = AmazingDapp.fetchItemBufferOne[this.state.dataKey];
    return (
          <div>
        
          
          <p>
      
          </p>
          </div>
    );
  }

}

/*
        // get the contract state from drizzleState
        const { AmazingDapp } = this.props.drizzleState.contracts;
        const { drizzleKey, dataKey } = this.state;
        //const tasks = AmazingDapp.fetchItemBufferOne[drizzleKey];
        const tasks = AmazingDapp.fetchItemBufferOne[dataKey];
        //const tasker = tasks && Object.values(tasks)
//<Button onClick = {this.mappingCall} type="primary">Call Mapping</Button>
        debugger
        return (
        <div>
        <div className="card">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="orange">Tasks</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>PN</th>
                  <th>InvNo</th>
                  <th>SignedInvVal</th>
                  <th>tokenId</th>
                  <th>Done</th>
                  <th>Date Complete</th>
                </tr>
              </thead>

            </table>
          </div>
      
        </div>
      </div>
      </div>
    );

      }
      //              <tbody id="tasks">
      //{tasks && tasks.value.map((task) => this.renderTask(task))}
      //</tbody>*/