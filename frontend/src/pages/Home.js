import { Link } from "react-router-dom";

function Home () {
 
    return (
      <section className="text-gray-600 body-font ">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src="./logo.jpeg"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Welcome to IvanTech
            </h1>
            <p className="mb-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              quos mollitia nam libero dicta neque repudiandae ab a, tenetur
              optio corporis provident sequi quis iure expedita nulla
              perferendis natus beatae.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">
                <Link to={'/login'}>Sign In</Link>
              </button>
              <button className="ml-4 inline-flex text-blue-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                <Link to={'/register'}>Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Home;