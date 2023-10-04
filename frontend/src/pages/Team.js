import { useContext, useState, useEffect } from 'react'
import { Button, Alert, Snackbar } from '@mui/material'
import { TeamContext } from '../components/TeamContext'
import { OrganizationContext } from '../components/OrganizationContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Team = () => {
  const { users } = useContext(TeamContext)
  const { organizations, refresh, setRefresh, setIsLoggedIn } = useContext(OrganizationContext)
  const [employee, setEmployee] = useState('')
  const [org, setOrg] = useState('')
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token) {
      setIsLoggedIn(false)
      navigate('/404')
    }
  }, [location])

  const current = localStorage.getItem('email')

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/add-user-to-org', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: employee, organization: org }),
    })

    console.log('emp', employee)
    console.log('org', org)

    if (res.status === 201) {
      refresh ? setRefresh(false) : setRefresh(true)
      setSuccess(true)
      handleClick()
    } else {
      console.error('Failed to assign user to organization:', res.status)
    }
  }

  const handleRemove = async (id) => {
    const res = await fetch(`/remove-user-from-org/${id}`, {
      method: 'DELETE',
    })

    if (res.status === 200) {
      refresh ? setRefresh(false) : setRefresh(true)
    } else {
      console.error('Failed to remove user from organization', res.status)
    }
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/delete-user/${id}`, {
      method: 'DELETE',
    })

    if (res.status === 200) {
      refresh ? setRefresh(false) : setRefresh(true)
    } else {
      console.error('Failed to delete user', res.status)
    }
  }

  const filteredUsers = users.filter((user) => user.organization === null)
  console.log(filteredUsers)
  const assignedUsers = users.filter((user) => user.organization !== null)
  console.log(assignedUsers)
  console.log('users', users)

  return (
    <section className="text-gray-600 body-font">
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet our team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit,
              rem culpa dolor aliquid neque quidem commodi rerum atque libero
              molestiae, perspiciatis quia dolore accusantium magni, reiciendis
              odio corporis laborum. Ad.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {filteredUsers.map((user) => (
              <li key={user.id}>
                <div className="flex items-center gap-x-6">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={`https://i.pravatar.cc/150?img=${user.id}`}
                    alt=""
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {user.email}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-cyan-600">
                      {user.organization
                        ? user.organization
                        : 'No Organization'}
                    </p>
                  </div>
                  {current !== user.email ? (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  ) : (
                    <>Logged In</>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Manage team
          </h1>

          <p className="lg:w-2/3 mx-auto leading-relaxed text-base mb-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem perferendis porro voluptate quaerat magnam officia.
            Voluptas, nesciunt sed totam consequatur beatae quaerat inventore
            sequi dicta, vero quisquam explicabo maiores eligendi?
          </p>
          {success && (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: '100%' }}
              >
                User assigned to Organization!
              </Alert>
            </Snackbar>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center gap-x-10"
          >
            <div className="sm:col-span-3">
              <label
                htmlFor="employee"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Employee
              </label>
              <div className="mt-2">
                <select
                  id="employee"
                  name="employee"
                  autoComplete="employee-name"
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Choose employee</option>
                  {filteredUsers.map((user) => (
                    <option value={user.email} key={user.id}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="organization"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Organization
              </label>
              <div className="mt-2">
                <select
                  id="organization"
                  name="organization"
                  autoComplete="organization-name"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Choose organization</option>
                  {organizations.map((org) => (
                    <option value={org.title} key={org.id}>
                      {org.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-7 flex items-center gap-x-6">
              <button
                type="submit"
                onClick={handleClick}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-wrap -m-2">
          {assignedUsers.map((user) => (
            <div key={user.id} className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src={`https://i.pravatar.cc/150?img=${user.id}`}
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    {user.email}
                  </h2>
                  <p className="text-gray-500">{user.organization}</p>
                </div>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleRemove(user.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team;
