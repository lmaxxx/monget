import {forwardRef} from "react";
import {Group, Text} from "@mantine/core";
import AccountIcon from "./AccountIcon";
import {AccountSelectItemProps} from "../types/sliceTypes/account.type";
import HiddenTextStyles from "../assets/hiddenTextStyles";

const AccountSelectItem = forwardRef<HTMLDivElement, any>(
  ({
     label,
     iconName,
     iconBackgroundColor,
     ...others
   }: AccountSelectItemProps, ref) => (
    <div ref={ref} {...others} style={{maxWidth: "100%"}}>
      <Group noWrap>
        <AccountIcon iconName={iconName} backgroundColor={iconBackgroundColor} size={"2rem"}/>
        <Text sx={{...HiddenTextStyles, width: "140px"}} size="sm">
          {label}
        </Text>
      </Group>
    </div>
  )
)

export default AccountSelectItem
