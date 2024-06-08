import { Route, Routes } from "react-router";
import About from "./About/About";
import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import Nav from "./Nav/Nav";
import "./index.scss";
import Footer from "./Footer/Footer";
import OrderAll from "./Order/OrderAll";
import OrderPage from "./Order/OrderPage";
import GlobalErrorBoundary from "./ErrorBoundaries/GlobalErrorBoundary";
import Page404 from "./ErrorBoundaries/Page404";

export default function App() {
  return (
    <GlobalErrorBoundary>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="order" >
          <Route index element={<OrderAll />} />
          <Route path="cake" element={<OrderPage />} />
          <Route path="cookie" element={<OrderPage />} />
          <Route path="candy" element={<OrderPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      <Footer />
    </GlobalErrorBoundary>
  )
}

