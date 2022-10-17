import {FC, useEffect} from 'react'
import {Group, Text, useMantineTheme} from "@mantine/core";
import CategoryIcon from "./CategoryIcon";
import {TransactionIconType} from "../data/transactionIcons";

interface PropsType {
  section: string
  icons: any
  iconProps?: any
}

const CategorySection: FC<PropsType> = ({section, icons, iconProps}) => {
  const iconNames = Object.keys(icons)
  const theme = useMantineTheme()
  const hasOnClickEvent = !!iconProps.onClick

  return (
    <>
      <Text mt={"md"} mb={"sm"} size={"xl"} color={theme.colors.gray[8]} align={"center"}>{section}</Text>
      <Group position={"center"}>
        {
          iconNames.map((iconName) =>
              <CategoryIcon
                {...iconProps}
                key={iconName}
                m={"0.5"}
                backgroundSize={"4rem"}
                iconSize={"80%"}
                iconName={iconName as TransactionIconType}
                style={{cursor: "pointer"}}
                onClick={hasOnClickEvent ? iconProps.onClick.bind(this, iconName) : null}
              />
            )
        }
      </Group>
    </>
  )
}

export default CategorySection
