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
import ScrollToTop from "./ScrollToTop";
import ErrorPage from "./ErrorBoundaries/ErrorPage";

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
          <Route path=":name" element={<OrderPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="404" element={<Page404 />} />
        <Route path="error" element={<ErrorPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ScrollToTop>
        <Footer />
      </ScrollToTop>
    </GlobalErrorBoundary>
  )
}

