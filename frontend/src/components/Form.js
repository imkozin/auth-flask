import { useState, useEffect } from "react";
import { Button, Alert, Snackbar } from "@mui/material";

function Form() {
    const [organizations, setOrganizations] = useState([{}])
    const [open, setOpen] = useState(false)
    const [org, setOrg] = useState('') // organization title name
    const [success, setSuccess] = useState(false)

    const handleClick = () => {
      setOpen(true)
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return
      }
      setOpen(false)
    }

    useEffect(() => {
     const getOrganizations = async () => {
       try {
         const res = await fetch('/orgs')
         if (res.ok) {
           const data = await res.json()
           const organizationList = data.organizations
           setOrganizations(organizationList)
           console.log(organizationList);
         } else {
           console.error('Error fetching user data:', res.statusText)
         }
        } catch (err) {
            console.log('Error:', err)
        }
     }
     getOrganizations()   
    }, [])

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
        try {
            const res = await fetch(`/delete-org/${id}`, {
                method: 'DELETE'
            })

            if (res.status === 200) {
                setOrganizations((prevOrganizations) => prevOrganizations.filter((org) => org.id !== id))
                setSuccess(true)
                handleClick()
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
          <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
            <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Create new organization
              </h1>
              <p className="mb-8 leading-relaxed">
                Kickstarter biodiesel roof party wayfarers cold-pressed. Palo
                santo live-edge tumeric scenester copper mug flexitarian. Prism
                vice offal plaid everyday carry. Gluten-free chia VHS squid
                listicle artisan.
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
                {success && (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: '100%' }}
                    >
                      Organization deleted successfully!
                    </Alert>
                  </Snackbar>
                )}
                <button
                  className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <div class="container px-5 py-12 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Our organizations
              </h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
                gentrify, subway tile poke farm-to-table. Franzen you probably
                haven't heard of them.
              </p>
            </div>
            <div class="flex flex-wrap -m-2">
              {organizations.map((org) => {
                return (
                  <div key={org.id} class="p-2 lg:w-1/3 md:w-1/2 w-full">
                    <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                      <img
                        alt="team"
                        class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                        src={`https://eu.ui-avatars.com/api/?name=${org.title}&size=80`}
                      />
                      <div class="flex-grow">
                        <h2 class="text-gray-900 title-font font-medium">
                          {org.title}
                        </h2>
                        <p class="text-gray-500">{}</p>
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

export default Form;