import About from './About'
import ContactUs from './ContactUs'
import Navbar from './Nabbar'
import UniverisityProfile from './UserProfile'
import { Routes, Route, Link } from 'react-router';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<UniverisityProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>

      

    </>
  )
}

export default App
