const Employees = () => {
    const [users, setUsers] = useState([{}])

  useEffect(() => {
    const getUsers = async() => {
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
        console.log('Error:', err);
      };
    }

    getUsers()
  }, [])

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <p>Email: {user.email}</p>
            <p>Organization ID: {user.organization_id}</p>
          </div>
        )})}
    </div>
  )
}

export default Employees;