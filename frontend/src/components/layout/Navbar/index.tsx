import {
  Button,
  Flex,
  Hide,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
} from "@chakra-ui/react"
import { FaBars, FaHeart, FaSignOutAlt } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../../store/UserProvider"

export const Navbar = () => {
  const { logout } = useUser()
  const navigate = useNavigate()

  return (
    <Flex h='64px' p='6' align='center' justify='space-between' direction='row'>
      <Text
        fontWeight='bold'
        fontSize={["lg", "4xl"]}
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
      >
        Dev-Hiring-Challange
      </Text>
      <Show below='md'>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<FaBars />}
            variant='outline'
          />
          <MenuList>
            <MenuItem
              color='blue.500'
              icon={<FaHeart />}
              onClick={() => navigate("/likeds")}
            >
              Likeds
            </MenuItem>
            <MenuItem color='red.500' icon={<FaSignOutAlt />} onClick={logout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Show>
      <Hide below='md'>
        <Flex
          align='center'
          justify='space-between'
          direction='row'
          gap={[3, 12]}
        >
          <Button
            onClick={() => navigate("/likeds")}
            leftIcon={<FaHeart />}
            colorScheme='blue'
            variant='outline'
          >
            Likeds
          </Button>
          <Button
            onClick={logout}
            leftIcon={<FaSignOutAlt />}
            colorScheme='red'
            variant='solid'
          >
            Logout
          </Button>
        </Flex>
      </Hide>
    </Flex>
  )
}
