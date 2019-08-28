const fetch = require("node-fetch");
const truffleAssert = require('truffle-assertions');

const AmazingDapp = artifacts.require('./AmazingDapp.sol');
contract('Testing', accounts => { 
    let candidate = 'David Havera';
    let PO = '12345';
    let InvNo = '89';

    it('Can we deploy the smart contract to an address?', async function () {
        var instance = await AmazingDapp.deployed()
        console.log('TEST 2 - Address')
        console.log(instance.address);

    });


    it('can add meta data', async function () {
        instance = await AmazingDapp.deployed()
        let tx = await instance.createPart(
                                        candidate,
                                        PO,
                                        InvNo,
                                        {from: accounts[0]})
        //https://ethereum.stackexchange.com/questions/34614/return-a-struct-from-a-mapping-in-test-truffle
        //let result = await instance.tasks.call(1)
        console.log('GET TASKS: ')
        //console.log(result)
        let result2 = await instance.getTaskIds.call();
        console.log(parseInt(result2))
        let result3 = await instance.fetchItemBufferOne(parseInt(result2))
        console.log(result3)
                                        // https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-events
        // https://ethereum.stackexchange.com/questions/31309/why-does-calling-allevents-work-from-the-truffle-console-but-not-from-my-applic
        //console.log(JSON.stringify(tx))
    });

});
 
