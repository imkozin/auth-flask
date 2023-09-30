import { useEffect, useState } from "react"

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
    <>
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet our team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper
            suspendisse.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {users.map((user) => (
            <li key={user.id}>
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={`https://i.pravatar.cc/150?img=${user.id}`} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{user.email}</h3>
                  <p className="text-sm font-semibold leading-6 text-cyan-600">{user.organization_id}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}


export default Employees;