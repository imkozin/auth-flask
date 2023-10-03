import { useState, useContext } from "react";
import { Button, Alert, Snackbar } from "@mui/material";
import { OrganizationContext } from "./OrganizationContext";

function Organization() {
    const { organizations, setOrganizations, refresh, setRefresh } =
      useContext(OrganizationContext)
    const [open, setOpen] = useState(false);
    const [org, setOrg] = useState(''); // organization title name
    const [success, setSuccess] = useState(false);

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
        try {
          const res = await fetch('/create-org', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: org }),
          })

          if (res.status === 201) {
            refresh ? setRefresh(false) : setRefresh(true)
            setSuccess(true)
            handleClick()
          } else {
            // Handle other status codes or errors
            console.error('Failed to create organization:', res.status)
          }
        } catch (error) {
          console.error('Network error:', error)
        }
    }

    const handleDelete = async (id) => {
        console.log('id', id);
        try {
            const res = await fetch(`/delete-org/${id}`, {
                method: 'DELETE'
            })

            if (res.status === 200) {
                setOrganizations((prevOrganizations) => prevOrganizations.filter((org) => org.id !== id))
                refresh ? setRefresh(false) : setRefresh(true)
            }
            else {
                console.error('Failed to delete organization:', res.status);
            }
        } catch (err) {
            console.error('Network error:', err);
        }
    }

    return (
      <>
        {success && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              Organization created successfully!
            </Alert>
          </Snackbar>
        )}
        <section className="text-gray-600 body-font">
          <div class="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
            <div className="w-full md:w-2/3 flex flex-col mb-2 items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Create new organization
              </h1>
              <p className="mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda culpa, nobis possimus, dolor, nihil nemo vel incidunt perferendis natus pariatur voluptatibus doloribus veniam fuga quaerat ab sequi. Voluptas, cum eaque.
              </p>
              <div className="flex w-full justify-center items-end">
                <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                  <label
                    for="hero-field"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Organization
                  </label>
                  <input
                    type="text"
                    id="hero-field"
                    name="hero-field"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded focus:ring-2 focus:ring-blue-200 focus:bg-transparent border border-gray-300 focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button
                  className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <div className="container px-5 py-12 mx-auto">
            <div className="flex flex-col text-center w-full mb-10">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Our organizations
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex non doloribus veniam eum, porro incidunt praesentium accusamus eius error numquam dolor saepe quia cumque a similique quos expedita explicabo adipisci?
              </p>
            </div>
            <div className="flex flex-wrap -m-4">
              {organizations.map((org) => {
                return (
                  <div
                    key={org.id}
                    className="p-4 lg:w-1/4 md:w-1/2 sm:w-full mx-auto text-center"
                  >
                    <div className="h-full flex flex-col items-center text-center">
                      <img
                        alt="team"
                        className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-5"
                        src={`https://eu.ui-avatars.com/api/?name=${org.title}&size=80`}
                      />
                      <div className="w-full">
                        <h2 className="title-font font-medium text-[28px] text-gray-900">
                          {org.title}
                        </h2>
                        <div className="mb-4">
                          {org.employees && org.employees.length > 0 ? (
                            org.employees.map((employee, index) => (
                              <p
                                key={index}
                                className="flex items-center text-gray-600 mb-2"
                              >
                                <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-blue-400 text-white rounded-full flex-shrink-0">
                                  <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2.5"
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M20 6L9 17l-5-5"></path>
                                  </svg>
                                </span>
                                {employee}
                              </p>
                            ))
                          ) : (
                            <p className="text-gray-600 mb-2">
                              <span>No employees yet</span>
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(org.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ) 
              })}
            </div>
          </div>
        </section>
      </>
    )
}

export default Organization;