import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const TransactionDetails = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    loadTransactions();

    async function loadTransactions(){
      console.log("Inside trans");
        await axios
        .get(`http://localhost:8080/api/v1/transaction/all`)
        .then((res) => {
          setTransactions(res.data);
          console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
  },[]);

  return (
      <>
      <Navbar/>
    <div>
      <table class="table table-striped" style={{fontSize:"13px"}}>
        <thead>
          <tr>
            <th scope="col">Transaction ID</th>
            <th scope="col">Receiver BIC</th>
            <th scope="col">Receiver Name</th>
            <th scope="col">Receiver Number</th>
            <th scope="col">Transfer Type</th>
            <th scope="col">Message</th>
            <th scope="col">Currency Amount</th>
            <th scope="col">Transfer Fees</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Transfer Date</th>
            <th scope="col">Customer Id</th>
          </tr>
        </thead>
        <tbody>
            {transactions.map((t, index) => (
                <tr key = {t.transactionId} scope="row">
                    <td>{t.transactionId}</td>
                    <td>{t.receiverBIC}</td>
                    <td>{t.receiverAccountName}</td>
                    <td>{t.receiverAccountNumber}</td>
                    <td>{t.transferType}</td>
                    <td>{t.message}</td>
                    <td>{t.amount}</td>
                    <td>{t.tranferFees}</td>
                    <td>{t.totalAmount}</td>
                    <td>{t.transferDate}</td>
                    <td>{t.customer.customerId}</td>
                </tr>

            ))
          }
            </tbody>
</table>
</div>  
</>
)
}                          

export default TransactionDetails;
