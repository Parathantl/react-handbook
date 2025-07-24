import About from './About'
import Component1 from './Component1'
import Component2 from './Component2'
import ContactUs from './ContactUs'
import Counter from './Counter'
import LoginForm from './LoginForm'
import Navbar from './Nabbar'
import UniverisityProfile from './UserProfile'

function App() {
  // const isLoggedIn = false;

  // const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (
    <>
      {/* <Component1 />
      <Component2 /> */}
      {/* <Counter /> */}
      {/* <LoginForm /> */}
      {/* {isLoggedIn ? (<Counter />) : <LoginForm />} */}

      {/* {
        items.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item}</h2>
            </div>
          )
        })
      } */}
      <Navbar />

      <UniverisityProfile />

      <About />

      <ContactUs />

    </>
  )
}

export default App
