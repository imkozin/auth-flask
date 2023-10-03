import { createContext, useEffect, useState } from "react";

export const TeamContext = createContext();

const TeamProvider = ({children}) => {
    const [users, setUsers] = useState([{}]);

    useEffect(() => {
      const getUsers = async () => {
        try {
          const response = await fetch('/users')
          if (response.ok) {
            const data = await response.json()
            const userList = data.users
            setUsers(userList)
          } else {
            console.error('Error fetching user data:', response.statusText)
          }
        } catch (err) {
          console.log('Error:', err)
        }
      }

      getUsers()
    }, [])

    return (
        <TeamContext.Provider value={{users, setUsers}}>
            {children}
        </TeamContext.Provider>
    )
}

export default TeamProvider;