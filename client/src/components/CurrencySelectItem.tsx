import {Group, Image, Text} from "@mantine/core";
import {forwardRef} from "react";
import {CurrencySelectItemProps} from "../types/sliceTypes/user.type";

const CurrencySelectItem = forwardRef<HTMLDivElement, CurrencySelectItemProps>(
  ({ image, label, ...others }: CurrencySelectItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Image src={image} width={"35px"} radius={"xs"} alt={"flag"} />
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
)

export default CurrencySelectItem
