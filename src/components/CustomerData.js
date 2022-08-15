import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import './CustomerData.css';
import Navbar from "./Navbar";

const CustomerData = () => {
  const [customerId, setCustomerId] = useState("");
  const [customer_id, setCustomer_id] = useState("");
  const [customer, setCustomer] = useState([]);
  const [overdraftValue, setOverdraftValue] = useState("");
  const [error_id,setError_id] = useState("");

  // const getCustomer = async(e) => {
  //   setCustomerId(e.target.value);
  //   const res = await axios.get(`http://localhost:8080/api/v1/customer/${customerId}`);
  //   setCustomerId(res.data);
  // }

  async function loadCustomer(e) {
    e.preventDefault();
    console.log("message hhh");
    // setCustomerId(e.target.value);
    if(customer_id.length<14){ 
      setError_id("Account ID not Found. Please enter valid ID");
      setCustomer([]);
      setOverdraftValue("");
    }
    else {
      await axios
      .get(`http://localhost:8080/api/v1/customer/${customer_id}`)
      .then((res) => {
        setCustomer(res.data);
        console.log(res.data);
        setOverdraftValue(customer.overdraftFlag == true ? "YES" : "NO");
      })
      .catch((err) => {
        console.log(err);
        if (customer_id === "")
         setError_id("Please enter customer ID");
       // else if(customer_id.length<14) setError_id("Account ID not Found. Please enter valid ID");
      });
    }
      
  }

  return (
    <>
    <Navbar/>
    <div className="mains mt-4" style={{fontSize:"18px"}}>
      <form>
      
      <h2 style={{fontSize:"25px"}} class="mt-4">Customer Details</h2>
    
        <form>
          <div class="formss">
            <input
              type="text"
              name="customer_id"
              placeholder="Enter employee id"
              value={customer_id}
              onChange={(e) => setCustomer_id(e.target.value)}
            ></input>
            <center>
            <button
              type="button"
              class="btn btn-primary btn-lg mt-4"
              onClick={loadCustomer}
            >
              search customer
            </button>
            
            
            <div>{error_id}</div>
            </center>
          </div>
          
        </form>
        

      <br />
      <br />

      <table className="table table-borderless" style={{fontSize:"18px"}}>
        <tbody>
          <tr>
            <td>Customer ID</td>
            <td>{customer.customerId}</td>
          </tr>
          <tr>
            <td>Customer Name</td>
            <td>{customer.accountHolderName}</td>
          </tr>
          <tr>
            <td>Overdraft Status</td>
            <td>{overdraftValue}</td>
          </tr>
          <tr>
            <td>Clear Balance</td>
            <td>{customer.clearBalance}</td>
          </tr>
        </tbody>
      </table>
      </form>
      
    </div>
    </>
    
  );
};

export default CustomerData;
