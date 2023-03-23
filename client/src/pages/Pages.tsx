import {Route, Routes} from "react-router-dom";
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
import CategoryTransactions from "./CategoryTransactions";
import NotFound from "./NotFound";

const Pages = () => {
  return (
    <Routes>
      <Route path={"/overlook"} element={<Overlook/>}/>
      <Route path={"/login"} element={<Login/>}/>
      <Route path={"/registration"} element={<Registration/>}/>
      <Route path={"/currency/registration"} element={<CurrencyRegistration/>}/>
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
      <Route path={"/transaction/create/:id"} element={<TransactionCreate/>}/>
      <Route path={"/transactions/:id"} element={<CategoryTransactions/>}/>
      <Route path={"*"} element={<NotFound/>}/>
    </Routes>
  )
}

export default memo(Pages)
