import {FC} from 'react'
import CurrencySelectItem from "./CurrencySelectItem";
import currencies from "../data/currencies.json";
import {Select} from "@mantine/core";
import {UseFormReturnType} from "@mantine/form";

interface PropsType {
  form: UseFormReturnType<any>
  label?: string
  disabled?: boolean
}

const CurrencySelect: FC<PropsType> = ({form, label, disabled}) => {
  return (
    <Select
      label={label}
      disabled={disabled}
      placeholder="Search currency"
      itemComponent={CurrencySelectItem}
      data={currencies}
      searchable
      maxDropdownHeight={280}
      nothingFound="Nothing found"
      {...form.getInputProps("currency")}
    />
  )
}

export default CurrencySelect
