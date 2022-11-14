import {Routes, Route} from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Overlook from "./Overlook";
import {memo} from "react";
import Home from "./Home";
import CurrencyRegistration from "./CurrencyRegistration";
import Accounts from "./Accounts";
import Categories from "./Categories";
import Currency from "./Currency";
import Charts from "./Charts";
import AccountCreate from './AccountCreate'
import AccountEdit from "./AccountEdit";
import TransferCreate from "./TransferCreate";
import Transfers from "./Transfers";
import CategoryCreate from "./CategoryCreate";
import CategoryEdit from "./CategoryEdit";
import TransactionCreate from "./TransactionCreate";
import TransactionEdit from "./TransactionEdit";

const Pages = () => {
  return (
    <Routes>
      <Route path={"/overlook"} element={<Overlook/>}/>
      <Route path={"/login"} element={<Login/>}/>
      <Route path={"/registration"} element={<Registration/>}/>
      <Route path={"/currencyRegistration"} element={<CurrencyRegistration/>}/>
      <Route path={"/"} element={<Home/>}/>
      <Route path={"/accounts"} element={<Accounts/>}/>
      <Route path={"/account/:id"} element={<AccountEdit/>}/>
      <Route path={"/account/create"} element={<AccountCreate/>}/>
      <Route path={"/charts"} element={<Charts/>}/>
      <Route path={"/categories"} element={<Categories/>}/>
      <Route path={"/currency"} element={<Currency/>}/>
      <Route path={"/transfer"} element={<TransferCreate/>}/>
      <Route path={"/transfers"} element={<Transfers/>}/>
      <Route path={"/category"} element={<CategoryCreate/>}/>
      <Route path={"/category/:id"} element={<CategoryEdit/>}/>
      <Route path={"/transaction/:id"} element={<TransactionEdit/>}/>
      <Route path={"/transaction"} element={<TransactionCreate/>}/>
    </Routes>
  )
}

export default memo(Pages)
