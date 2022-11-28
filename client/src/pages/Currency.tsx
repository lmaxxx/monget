import DefaultPageWrapper from "../hoc/DefaultPageWrapper";
import {Center} from "@mantine/core";
import CurrencyEditForm from "../components/CurrencyEditForm";

const Currency = () => {

  return (
    <DefaultPageWrapper>
      <Center style={{
        height: "100%",
        width: "100%",
      }}>
        <CurrencyEditForm/>
      </Center>
    </DefaultPageWrapper>
  )
}

export default Currency
