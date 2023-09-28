import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState([{}])

  useEffect(() => {
    const getUsers = async() => {
      try {
        const response = await fetch('/users')
        if (response.ok) {
          const data = await response.json()
          const userList = data.users
          setData(userList)
        } else {
          console.error('Error fetching user data:', response.statusText)
        }
        
      } catch (err) {
        console.log('Error:', err);
      };
    }

    getUsers()
  }, [])

  return (
    <div>
      {data.map((user, i) => {
        return (
          <div key={i}>
            <p>Email: {user.email}</p>
            <p>Organization ID: {user.organization_id}</p>
          </div>
        )})}
    </div>
  )
}

export default App;
