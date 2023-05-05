import { useEffect, useState } from "react";
import {token} from './ABI/Tokenabi'
import {bank} from './ABI/Contractabi'
const {ethers} = require('ethers')

const App = () => {
  const {ethereum} = window
  const [Signer,setSigner] = useState(null)
  const [tokenContract,setTokenContract] = useState(null)
  const [bankContract,setBankContract] = useState(null)
  const [TokenAddress,setTokenAddress] = useState("")
  const [amount,setAmount] = useState(0)
  const BankAddress = '0x114C8CBf548A6C249A06C60412878770DCF887a7'

  async function Token(tokenAddress){
    // setSigner(signer)

    localStorage.setItem('TokenAddress',tokenAddress)
    console.log("TOkEN ADDRESS",tokenAddress)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts',[])
      let signer =  provider.getSigner()
      // await signer.wait()
      let TokenContract = new ethers.Contract(tokenAddress,token,signer)
      setTokenContract(TokenContract)
      let BankContract = new ethers.Contract(BankAddress,bank,signer)
      setBankContract(BankContract)
  }

  
      
        // localStorage.setItem('Signer',JSON.stringify(await signer.getAddress()))
        // localStorage.setItem('TokenAddress',JSON.stringify(TokenAddress))
        // setTokenAddress(JSON.parse(localStorage.getItem('TokenAddress')))
        // let signerAddress = JSON.parse(localStorage.getItem('Signer'))
        // console.log(signerAddress)

    
        // useEffect(() => {
        //   if (TokenAddress) {
        //     Token(TokenAddress);
        //   }
        // }, [TokenAddress]);
        
  // useEffect(() => {
  //   ethereum.on("accountsChanged", (accounts) => {
  //     Token(TokenAddress)
  //   })
  // })

  function showDetails(){
    console.log("signer",Signer,"contractAddress",BankAddress,token,bank)
  }



  async function Deposit(){
    let tokenadd = localStorage.getItem("TokenAddress")
    console.log("TOken address",tokenadd)
    setTokenAddress(tokenadd)
    await Token(tokenadd)
    if (!tokenContract || !bankContract) {
      return;
    }
    console.log("Tokencontract",tokenContract,"BankContract",bankContract)
   
    await tokenContract.approve(BankAddress,amount)
    await bankContract.depositTokens(amount)
  }

  async function Balance(){
      console.log("Balance",ethers.utils.formatEther(await bankContract.customerBalance(Signer.getAddress())))
  }

 async function Withdraw(){
  await bankContract.withdrawTokens(amount)

 }
  return (
    <div>
      <input placeholder="Enter Token Address" onChange={(event)=>{setTokenAddress(event.target.value)}}></input><br/>
      <button style = {{backgroundColor:"violet"}}onClick = {()=>{Token(TokenAddress)}}>Confirm Token Address</button><br/>
      <input placeholder="Enter Amount" onChange={(event)=>{setAmount(event.target.value)}}></input><br/>
      <button style = {{backgroundColor:"violet"}} onClick={Deposit}>Deposit Token</button><br/>
      <button style = {{backgroundColor:"violet"}} onClick={Balance}>Token balance</button><br/>
      <input placeholder="Enter Amount" onChange={(event)=>{setAmount(event.target.value)}}></input><br/>
      <button style = {{backgroundColor:"violet"}} onClick={Withdraw}>Withdraw Token</button>
      <button onClick={showDetails}>showDetails</button>
    </div>
  );
};

export default App;




//   useEffect(async ()=>{
//     const provider = new ethers.providers.Web3Provider(window.ethereum)
//     await provider.send('eth_requestAccounts',[])
//     signer =await provider.getSigner()
//     localStorage.setItem('Signer',JSON.stringify(signer.getAddress()))
//   },[signer])


// useEffect(async ()=>{
//   localStorage.setItem('TokenAddress',JSON.stringify(TokenAddress))
// },[TokenAddress])