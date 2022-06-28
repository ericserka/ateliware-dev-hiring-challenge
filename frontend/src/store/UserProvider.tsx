import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { v4 } from "uuid"

type UserContextProps = {
  userId: string
  logout: () => void
}

const USER_ID_KEY = "ateliware-dev-hiring-challange@user-id"

const UserContext = createContext<UserContextProps>(undefined!)

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [userId, setUserId] = useState<string>("")
  const [data, setData] = useState<number[]>([])

  useEffect(() => {
    const userId = localStorage.getItem(USER_ID_KEY)
    if (userId) {
      setUserId(userId)
    } else {
      localStorage.setItem(USER_ID_KEY, v4())
    }
  }, [])

  const logout = () => {
    localStorage.removeItem(USER_ID_KEY)
    window.location.reload()
  }

  return (
    <UserContext.Provider value={{ userId, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
