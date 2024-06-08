import { Route, Routes } from "react-router";
import About from "./About/About";
import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import Nav from "./Nav/Nav";
import "./index.scss";
import Footer from "./Footer/Footer";
import OrderAll from "./Order/OrderAll";
import OrderPage from "./Order/OrderPage";

function App() {
  return (
    <>
    <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="order" >
          <Route index element={<OrderAll />} />
          <Route path={':name'} element={<OrderPage />} />
        </Route>
      </Routes>
    <Footer />
    </>
  )
}

export default App
