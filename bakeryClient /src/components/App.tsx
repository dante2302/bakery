import { Route, Routes } from "react-router";
import About from "./About/About";
import Home from "./Home/Home";
import Contact from "./Contact/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
    </Routes>
  )
}

export default App