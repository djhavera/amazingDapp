import React from "react";
import { formatDate } from './utils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class SetString extends React.Component {
  state = {     
            partnumber: '',
            invnumber:'',
            invamt:'',
            job:'',
            txId: null,
            dataKey: '',
            counter: 0,
            contractData: [],
            check: [],
            tasks: [],
            drizzleTaskID:'',
            drizzleFetchKey:[],
            dataKey2: '',
            rows_created: '',
            task_Number: [],
            arr2:[]
          };
        
  componentDidMount() {
    const { drizzle, drizzleState } =  this.props;
    const contract =  drizzle.contracts.AmazingDapp;
    const dataKey = contract.methods["getTaskIds"].cacheCall();
    this.setState({drizzleTaskID: dataKey},() => this.getSmartContractIDs());
    debugger
    //this.setState({dataKey2: arrayedData2},() => this.getStructID());
    }

    async getSmartContractIDs() {
      const {drizzleTaskID}  = this.state
      const { AmazingDapp } = await this.props.drizzleState.contracts;
      const tasksFetch = await AmazingDapp.getTaskIds[drizzleTaskID];
      const arrayedData = tasksFetch  && await Object.entries(tasksFetch).slice(-1)
      debugger
      const arrayedData1 = arrayedData&& await arrayedData.reduce((prev, amount) => {
       return prev.concat(amount);
        }, []);
      const arrayedData2 = arrayedData1 && await arrayedData1[1].map(Number);
      this.setState({task_Number: arrayedData2},() => this.getStructKey());
    }

    async getStructKey() {
      const { drizzle } =  this.props;
      const contract =  drizzle.contracts.AmazingDapp;
      const {task_Number} = this.state
      var arr2 = [];
      var arr3 = [];
      debugger
      task_Number && await task_Number.forEach((item) => {
        arr2.push(contract.methods["fetchItemBufferOne"].cacheCall(item))
      })
      Promise.all(arr2).then((jsonResults) => {
        this.setState({drizzleFetchKey: jsonResults},() => this.getStructData());
      })
      debugger
    }

    async getStructData() {
      const { AmazingDapp } = this.props.drizzleState.contracts;
      const {drizzleFetchKey} = this.state
      var arr2 = []
      var tasks = []
      console.log(drizzleFetchKey)
      debugger
      drizzleFetchKey && await drizzleFetchKey.map(function(element) {
        //console.log(element)
        tasks = AmazingDapp.fetchItemBufferOne[element]
        //arr2 = tasks && [tasks.value]
        tasks && arr2.push(tasks.value)
        //console.log('getStructData from Drizzlestore to then get the .value')
        //tasks && console.log(tasks.value)
        arr2 && console.log(arr2)
        //this.setState({ arr2 });
        //tasks && tasks.value.map((x) => console.log('This is the .value call'))
        return tasks, arr2
    })
    const arrayedData1 = arr2&& await arr2.reduce((prev, amount) => {
      return prev.concat(amount);
       }, []);
    
    this.setState({ arr2 }, () => this.renderTask(arr2));
  
    //tasks && tasks.value.map((x) => console.log('This is the .value call'))
    
  }
  renderTask = (task) => (
    <TableRow key={task.id}>
    <TableCell >{task.tokenId}</TableCell>
    <TableCell >{formatDate(task.date)}</TableCell>
      <TableCell >{task.PN}</TableCell>
      <TableCell >{task.InvNo}</TableCell>
      <TableCell >{task.SignedInvVal}</TableCell>
      
      <TableCell>
      <Checkbox 
              onChange={() => this.toggleDone(parseInt(task.tokenId, 10))}
              checked={!!task.done}
              />
      </TableCell>
      <TableCell >{task.dateComplete != '0' ? formatDate(task.dateComplete) : ''}</TableCell>
    </TableRow>
  );
  handleChange = (field, e) => {
    this.setState({[field]: e.target.value});
  }
        
  handleSubmit = e => {
    e.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const { partnumber, invnumber, invamt, counter } = this.state;
    const contract  = drizzle.contracts.AmazingDapp;
    
    const txId = contract.methods['createPart'].cacheSend(partnumber, invnumber, invamt, {
        from: drizzleState.accounts[0]
      });
    this.setState({txId,
                  counter: counter +1});
    const dataKey = contract.methods["getTaskIds"].cacheCall();
    this.setState({drizzleTaskID: dataKey},() => this.getSmartContractIDs());
  }

  async getTxStatus () {
    const { stackId } = this.state;
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[stackId];
    // status is not yet tracked
    if (txHash === undefined || txHash === "") return null;
    return `Transaction status: ${transactions[txHash].status}`;
  };

async toggleDone (id) {
    const {contractData} = this.state;
    const { drizzle} = this.props;
    const { AmazingDapp } = await this.props.drizzleState.contracts;
    const contract = drizzle.contracts.AmazingDapp;
    await contract.methods['toggleDone'].cacheSend(id, {
        from: this.props.drizzleState.accounts[0]
      });
      debugger
      await this.getStructData(AmazingDapp,contractData)
  }
  render() {
    const { transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.txId];
    const {drizzleTaskID} = this.state
    const {dataKey2} = this.state
    const {counter} = this.state
    const {task_Number} = this.state
    const{drizzleFetchKey} = this.state
    const {rows_created} = this.state
    const {contractFetch} = this.state
    const {arr2} = this.state
    const{contractData} = this.state
    const { AmazingDapp } = this.props.drizzleState.contracts;
    const storedData = AmazingDapp.fetchItemBufferOne['0x1204b3dcd975ba0a68eafbf4d2ca0d13cc7b5e3709749c1dc36e6e74934270b3']//AmazingDapp.fetchItemBufferOne[this.state.contractData];
    let tasksData = []
//<div>getStructData:  {JSON.stringify(arr2)}</div>
    return (
      <div>
      <ToastContainer />
      <div>Drizzle Key for TaskIds  {JSON.stringify(drizzleTaskID)}</div>
      <div>getSmartContractID:  {JSON.stringify(task_Number)}</div>
      <div>getStructKey:  {JSON.stringify(drizzleFetchKey)}</div>
      

      <div className="card">
        
      </div>
        <div className="row">
          <div className="col-sm-12">
            <h2 className="orange">Create Task</h2>
          </div>
        </div>
        <div className="row">
          <form id="new-task" className="col-sm-12" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label for="task-partnumber">Part Number</label>
              <input 
                id="task-partnumber" 
                type="text" 
                className="form-control" 
                onChange={(e) => this.handleChange('partnumber', e)} />
            </div>
            <div className="form-group">
              <label for="task-invnumber">Invoice Number</label>
              <input 
                id="task-invnumber" 
                type="text" 
                className="form-control" 
                onChange={(e) => this.handleChange('invnumber', e)} />
            </div>
            <div className="form-group">
              <label for="task-invamt">Invoice Amount ($)</label>
              <input 
                id="task-invamt" 
                type="text" 
                className="form-control" 
                onChange={(e) => this.handleChange('invamt', e)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
          <p>
            {txHash ? `Transaction status: ${transactions[txHash] && transactions[txHash].status}` : null}
          </p>
  
          <Table>
          <TableHead>
            <TableRow>
              <TableCell >tokenID</TableCell> 
              <TableCell >Date Created</TableCell>
              <TableCell>Part Number</TableCell>
              <TableCell >Invoice Number</TableCell>
              <TableCell >Invoice Amount ($)</TableCell>
              <TableCell >Complete?</TableCell>
              <TableCell >Date Complete</TableCell>
            </TableRow>
          </TableHead>
            <TableBody id="arr2">
                {arr2 && arr2.map((task) => this.renderTask(task))}
              </TableBody>
        </Table>
    
        </div>
      </div>

    );
  }
  //{this.renderTask()}
}


export default SetString;
/*
      <div>Drizzle Key for TaskIds  {JSON.stringify(drizzleTaskID)}</div>
      <div>getSmartContractID:  {JSON.stringify(task_Number)}</div>
      <div>getStructKey:  {JSON.stringify(drizzleFetchKey)}</div>
      <div>getStructData:  {JSON.stringify(arr2)}</div>
 {this.renderTask()}
        <div>Drizzle IDs for fetch buffer: {dataKey} </div>
        <div>Fetch Task IDS from Smart Contract  {JSON.stringify(tasks)}</div>
        <div> What does this show?  {tasksData}</div>
        <div>This should return the value from fetch buffer: {JSON.stringify(arr2)} </div>
        <div> {counter} </div>
<div>STORED DATA: {JSON.stringify(storedData)}</div>
      <div>Task Ids should fetch values:  {JSON.stringify(contractData)}</div>
      <div>Struct Data:  {JSON.stringify(this.state.check)}</div>
      <div>Task Ids is the Drizzle Key:  {JSON.stringify(dataKey2)}</div>
      <div>Number of Task Ids:  {JSON.stringify(rows_created)}</div>
      <div>StoredData:  {JSON.stringify(storedData)}</div>
      <div>ContractFetch:  {JSON.stringify(contractFetch)}</div>
          <TableBody>
          {arrayedData.map(row => (
            <TableRow key={row.PartNumber}>
              <Checkbox />
              <Checkbox 
              onChange={() => this.toggleDone({row})}
              checked={!!arrayedData.done}
              />
              <TableCell>
                {row.PartNumber}
              </TableCell>
              <TableCell >{JSON.stringify(row.ID)}</TableCell>
              <TableCell >{row.InvNumber}</TableCell>
              <TableCell >{row.Amt}</TableCell>
              <TableCell >{JSON.stringify(row.Date)}</TableCell>
              <TableCell >{JSON.stringify(row.completeDate)}</TableCell>
              <TableCell >{JSON.stringify(row.Complete)}</TableCell>
    
            </TableRow>
          ))}
          </TableBody>
          
            async getDrizzleID () {
    const {counter, dataKey, tasks} = await this.state
    const { drizzle} = this.props;
    let promises = [];
    let contractFetch = [];
    const contract = drizzle.contracts.AmazingDapp;
    let fetched = [];
    const { AmazingDapp } = await this.props.drizzleState.contracts;
    const smartContractTasks = await AmazingDapp.getTaskIds[this.state.dataKey2]
    const arrayedData = await smartContractTasks && Object.entries(smartContractTasks).slice(-1)
    const arrayedData1 = await arrayedData&& arrayedData.reduce((prev, amount) => {
     return prev.concat(amount);
      }, []);
    const arrayedData2 = await arrayedData1[1].map(Number);
    await this.getStructID()
    await this.getStructData()
    /*
    await this.setState({
      dataKey: [...this.state.dataKey, fetched],
      //contractData: finalID,
      //check: finalData,
      tasks: arrayedData2,
      rows_created: arrayedData2.length

     });
   
     contractFetch= await AmazingDapp.fetchItemBufferOne[this.state.contractData];
    
     await this.setState({
      check: contractFetch
     });
  }*/
          
         