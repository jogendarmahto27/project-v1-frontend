import axios from 'axios';
import { useState,useEffect } from 'react';
import Navbar from './Navbar';
import './Test.css';

function TestTransaction() {
  const [customerId, setCustomerId] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [clearBalance, setClearBalance] = useState(0);
  const [customerStatus, setCustomerStatus] = useState("");
  const [overdraftFlag, setOverdraftFlag] = useState(false);
  const [bankStatus, setBankStatus] = useState("");
  const [bankName, setBankName] = useState("");
  const [receiverAccountName, setReceiverAccountName] = useState("");
  const [receiverAccountNumber, setReceiverAccountNumber] = useState("");
  const [receiverStatus, setReceiverStatus] = useState("");
  const [receiverBIC, setReceiverBIC] = useState("");
  const [transferType, setTransferType] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [transfer_fee, setTransfer_fee] = useState("");
  const [updated_clear, setUpdated_clear] = useState(clearBalance);
  const [error_amount, setError_amount] = useState("");
  const [transactionStatus,setTransactionStatus] = useState("")
  const workingDays = ['monday','tuesday','wednesday','thursday','friday']
  const messagesl = {
    'CHQB':"beneficiary customer must be paid by cheque only.",
    'CORT':"Payment is made in settlement for a trade.",
    'HOLD':"Beneficiary customer or claimant will call upon identification.",
    'INTC':"Payment between two companies that belongs to the same group.",
    'PHOB':"Please advise the intermediary institution by phone.",
    'PHOI':"Please advise the intermediary by phone.",
    'PHON':"Please advise the account with institution by phone.",
    'REPA':"Payments has a related e-Payments reference.",
    'SDVA':"Payment must be executed with same day value to the customer."
  }

  useEffect(() => {
    setClearBalance(0);
    setAccountHolderName("");
   

    if (customerId.length == 14) {
      console.log("inside the function");
      axiosTest();
      setCustomerStatus("Customer Not Found");

      async function axiosTest() {
        var response = 1;
        console.log("hhh");
        await axios
          .get(`http://localhost:8080/api/v1/customer/${customerId}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.customerId == null)
              setCustomerStatus("Customer Not Found");
            else setCustomerStatus("");

            if (res.data.overdraftFlag == true) {
              setOverdraftFlag(true);
            }
            setClearBalance(res.data.clearBalance);
            setAccountHolderName(res.data.accountHolderName);
          })
          .catch((err) => {
            console.log(err);
          });
        return response;
      }
    }
    return () => {};
  }, [customerId]);


  function ValiditeCustomerState() {
    if (customerStatus === "") return false;
    else return true;
  }

  useEffect(() => {
    setBankName("");
    if (receiverBIC.length == 11) {
      bicTest();
      setBankStatus("Bank Not Found");

      async function bicTest() {
        var response = 1;
        await axios
          .get(`http://localhost:8080/api/v1/bank/${receiverBIC}`)
          .then((res) => {
            if (res.data.bic == null) setBankStatus("Bank Not Found");
            else {
              setCustomerStatus("");
              console.log(res.data.bankName);
              setBankStatus("");
              setBankName(res.data.bankName);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        return response;
      }
    }

    return () => {};
  }, [receiverBIC]);
  // ----------Receiver blocklist check--------------
  useEffect(() => {
    if (receiverAccountName.length > 2) {
      console.log("inside the receiver function");
      receiverNameTest();
      setReceiverStatus("");

      async function receiverNameTest() {
        var response = 1;
        console.log("receiver hhh");
        await axios
          .get(`http://localhost:8080/api/v1/blocklist/${receiverAccountName}`)
          .then((res) => {
            console.log(res.data);
            if (res.data == "yes") {
              setReceiverStatus("Receiver name is in sanctioned blocklist");
              console.log("blocklist");
            } else {
              setReceiverStatus("");
              console.log("not in a blocklist");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        return response;
      }
    }
    return () => {};
  }, [receiverAccountName]);
//  ---------------Amount check-----------------------

  const onAmount = async (e) => {
    const amount = e.target.value;
    if (amount > 0) {
      setAmount(amount);
      setTransfer_fee(amount * 0.0025);
      if (overdraftFlag == true) {
        setUpdated_clear(clearBalance - amount - amount * 0.0025);
        setError_amount("");
      } else {
        if (clearBalance >= amount * 0.0025) {
          setUpdated_clear(clearBalance - amount - amount * 0.0025);
          setError_amount("");
        } else {
          setUpdated_clear("");
          setError_amount("Insufficient Balance. Transfer can't be initated");
        }
      }
    } else {
      setAmount("");
      setTransfer_fee("");
      setUpdated_clear("");
      window.alert("Amount cannot be negative or zero");
    }
  };

  // ------------------Make Transaction-------------------------

  const makeTransaction = async(e) => {
    e.preventDefault();
    setTransferType(document.getElementById("select-transfer").value)
    setMessage(document.getElementById("select-message").value)
    if(receiverStatus=="" && error_amount=="" && ( (receiverAccountName.includes("bank") 
    && accountHolderName.includes("bank") && transferType.includes("bank")) || (!receiverAccountName.includes("bank") &&
    !accountHolderName.includes("bank") && transferType.includes("customer")) ) &&
    ((clearBalance - amount - amount * 0.0025)>=0 || overdraftFlag == true )){  
        const sendTransaction = {
          customer : { customerId}, receiverBIC, receiverAccountName,receiverAccountNumber,
            transferType,message,amount 
          }
          console.log("inside check transaction");

        await axios
        .post(`http://localhost:8080/api/v1/transaction/new`,sendTransaction)
        .then((res) => {
          console.log(res.data);
          console.log("sent transaction to database");
          window.alert("Transaction successful");
        }).catch(err => {
          console.log(err)
        })
    }
    else{
      window.alert(" Transaction failed due to invalid credentials. Please check transfer type and receiver details");   
    }

  }

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    let day = d.getDay();
    console.log(weekday[d.getDay()]);
    if(day==0 || day==6){
      window.alert("Transaction cannot be processed on non-working days");
    }


  
// -----------------JSX Code for transaction page-----------------
  return (
    <>
    <Navbar className="page-container"/>
     { (day>=1 && day<=5) ?
    (
      <div className="page-container">
    <div style={{ fontSize: "14px" }} className="forms">
      
      <br />
    
       <h2>Customer Details</h2><br />
      <font>
      <label htmlFor="lcid">Customer Id</label><font/>
      
       &nbsp;&nbsp;&nbsp;&nbsp;<br></br>
      <input
        type="text"
        maxLength="14"
        required
        id="customerId"
        name="customerId"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      {customerStatus}
      <br />
      <br />
      <label htmlFor="lname">Account Holder Name</label> &nbsp;&nbsp;&nbsp;
      <input
        type="text"
        id="accountHolderName"
        name="accountHolderName"
        value={accountHolderName}
        required
        disabled
      />
      <br />
      <br />
      <label htmlFor="lbal">Clear Balance </label>&nbsp;&nbsp;&nbsp;{" "}
      <input
        type="text"
        id="clearBalance"
        name="clearBalance"
        disabled
        required
        value={clearBalance}
      />
      <br />
      <br /><br></br>

      <h2>Reciever Details</h2>
      <br />
      <br />
      <label htmlFor="ReceiverBIC">Reciever BIC</label>&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        type="text"
        maxLength="11"
        required
        disabled={ValiditeCustomerState()}
        value={receiverBIC}
        onChange={(e) => {
          setReceiverBIC(e.target.value);
        }}
      />
      {bankStatus} <br />
      <br />
      <label htmlFor="RecieverBankname">Bank Name</label>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input
        type="text"
        value={bankName}
        readonly
        name="recieverbankname"
        id="recieverbankname"
      /><br></br>
      <br />
      <label htmlFor="rcid">Receiver Account Name </label>&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        type="text"
        maxLength="40"
        required
        id="receiverAccountName"
        name="receiverAccountName"
        value={receiverAccountName}
        onChange={(e) => setReceiverAccountName(e.target.value)}
      />
      {receiverStatus}
      <br />
      <br />
      <label htmlFor="rcid">Receiver Account Number </label>&nbsp;&nbsp;&nbsp;&nbsp;
      <input
        type="text"
        required
        id="recieverAccountNumber"
        name="recieverAccountNumber"
        value={receiverAccountNumber}
        onChange={(e) => setReceiverAccountNumber(e.target.value)}
      /><br></br>
      <br />
      <br />
      <h2>Transaction Details</h2>
      <br />
      <br />
      <label>Transfer Type : </label>
      <select
        id="select-transfer"
        className="form-select" 
        value={transferType}
        onChange={(e) => {
          setTransferType(e.target.value);
        }}
        required
      >
        <option value="customer type" selected>Customer Type</option>
        <option value="bank transfer">Bank Type</option>
      </select>
      <br />
      <br />
      {/* ----------Message details-------------- */}
      <label>Message </label>
      <select class="form-select"  id="select-message" aria-label="Default select example">
        <option value={messagesl['CHQB']} selected>{messagesl['CHQB']}</option>
        <option value={messagesl['CORT']}>{messagesl['CORT']}</option>
        <option value={messagesl['HOLD']}>{messagesl['HOLD']}</option>
        <option value={messagesl['INTC']}>{messagesl['INTC']}</option>
        <option value={messagesl['PHOB']}>{messagesl['PHOB']}</option>
        <option value={messagesl['PHOI']}>{messagesl['PHOI']}</option>
        <option value={messagesl['PHON']}>{messagesl['PHON']}</option>
        <option value={messagesl['REPA']}>{messagesl['REPA']}</option>
        <option value={messagesl['SDVA']}>{messagesl['SDVA']}</option>
      </select><br></br><br></br>
      <label>Amount</label>
      <span style={{ color: "red" }}>*</span>
     {/* <div className="error"> */}
        <input style={{fontSize:"18px"}}
          type="number"
 //         className="form-control"
 //         id="formGroupExampleInput"
          placeholder="Enter Amount"
          value={amount}
          onChange={onAmount}
          required
        />
        <div>{error_amount}</div>
      {/* </div> */}
      <br />
      <label>Transfer Fee</label>
      <input
        type="number"
        id="transfer_fee"
 //       className="form-control-plaintext"
        value={transfer_fee}
        disabled
      />
      <br />
      <br />
      <label>Updated Clear Balance</label>
      <input
        type="number"
        id="amount_update"
 //       className="form-control-plaintext"
        value={updated_clear}
        disabled
      />
      <br />
      <br />
      <center>
      <button className="btn btn-primary btn-lg" type="submit" onClick={makeTransaction}>Submit Transaction</button>
      <div>{transactionStatus}</div>
      </center>
      </font>

        </div>
        </div>) : <br> <h3> Transaction can be done only on working days</h3> </br>}
        </>
      
  );
}

export default TestTransaction;
