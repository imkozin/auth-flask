import { useEffect, useContext } from "react";
import { TeamContext } from "./TeamContext";
import { OrganizationContext } from "./OrganizationContext";

const Team = () => {
    const {users, setUsers} = useContext(TeamContext);
    const { organizations, setOrganizations, refresh, setRefresh } =
      useContext(OrganizationContext)
    //  const [value, setValue] = useState('')
    //  const [error, setError] = useState(false)
    //  const [helperText, setHelperText] = useState('Choose wisely')

    //  const handleRadioChange = (event) => {
    //    setValue(event.target.value)
    //    setHelperText(' ')
    //    setError(false)
    //  }

    //  const handleSubmit = (event) => {
    //    event.preventDefault()

    //    if (value === 'best') {
    //      setHelperText('You got it!')
    //      setError(false)
    //    } else if (value === 'worst') {
    //      setHelperText('Sorry, wrong answer!')
    //      setError(true)
    //    } else {
    //      setHelperText('Please select an option.')
    //      setError(true)
    //    }
    //  }


  const filteredUsers = users.filter(user => user.organization === null)
  console.log(filteredUsers);
  const assignedUsers = users.filter(user => user.organization !== null)

  return (
    <section className="text-gray-600 body-font">
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet our team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Libero fames augue nisl porttitor nisi, quis. Id ac elit odio
              vitae elementum enim vitae ullamcorper suspendisse.
            </p>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
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
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them.
          </p>
          <form className="flex items-center justify-center gap-x-10">
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Employee
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {users.map((user) => (
                    <option key={user.id}>{user.email}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Organization
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {users.map((user) => (
                    <option key={user.id}>{user.organization}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-7 flex items-center gap-x-6">
              <button
                type="submit"
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
                  src="https://dummyimage.com/90x90"
                />
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    {user.email}
                  </h2>
                  <p className="text-gray-500">{user.organization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default Team;