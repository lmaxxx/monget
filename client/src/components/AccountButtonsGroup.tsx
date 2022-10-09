import {Group, Button} from "@mantine/core";
import { IconArrowsTransferUp, IconPlus } from '@tabler/icons';
import {Link} from 'react-router-dom'

const AccountButtonsGroup = () => {
  return (
    <Group position={"apart"}>
      <Button component={Link} to={"/account/create"} color="green" leftIcon={<IconPlus/>}>Create account</Button>
      <Button component={Link} to={"/transfer"} color="orange" leftIcon={<IconArrowsTransferUp/>}>New transfer</Button>
    </Group>
  )
}

export default AccountButtonsGroup
