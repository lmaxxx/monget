import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import AccountButtonsGroup from "../components/AccountButtonsGroup";
import AccountList from "../components/AccountList";

const Accounts = () => {
  return (
    <DefaultPageWrapper>
      <AccountButtonsGroup/>
      <AccountList/>
    </DefaultPageWrapper>
  )
}

export default Accounts
