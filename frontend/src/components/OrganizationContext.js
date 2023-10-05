import { createContext, useState, useEffect } from "react";

export const OrganizationContext = createContext()

const OrganizationProvider = ({children}) => {
    const [organizations, setOrganizations] = useState([{}]);
    const [refresh, setRefresh] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const getOrganizations = async () => {
        try {
          const res = await fetch('/orgs')
          if (res.ok) {
            const data = await res.json()
            const organizationList = data.organizations
            setOrganizations(organizationList)
            console.log(organizationList)
          } else {
            console.error('Error fetching user data:', res.statusText)
          }
        } catch (err) {
          console.log('Error:', err)
        }
      }
      getOrganizations()
    }, [refresh])

    return (
        <OrganizationContext.Provider value={{organizations, setOrganizations, refresh, setRefresh, isLoggedIn, setIsLoggedIn}}>
            {children}
        </OrganizationContext.Provider>
    )
}

export default OrganizationProvider;