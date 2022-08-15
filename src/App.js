import CustomerData from "./components/CustomerData";
import Navbar from "./components/Navbar";
import TestTransaction from "./components/TestTransaction";
import Login from "./pages/Login";
import {BrowserRouter,Routes,Link } from 'react-router-dom';
import { Route } from "react-router";
import TransactionDetails from "./components/TransactionDetails";


const App = () => {
  return (
    <div >
      <BrowserRouter>
      <Routes>

      <Route  exact path='/' element={<Login />}/>
        <Route path='/transaction' element={<TestTransaction/>}/>
        <Route  path='/customer' element={<CustomerData/>}/>
        <Route  path='/transactiondetails' element={<TransactionDetails />}/>
        <Route  path='/logout' element={<Login/>}/>



 

      </Routes>
      
      </BrowserRouter>


    </div>
  );
}

export default App;
