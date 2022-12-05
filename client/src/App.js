import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import MapContainer from "./MapContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import News from "./News";
import NewCrossing from "./NewCrossing";
import Contact from "./Contact";
import Footer from "./Footer";
import PoliceReports from "./PoliceReports";
import { Auth0Provider } from '@auth0/auth0-react';
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./Profile";

const { REACT_APP_AUTH0_DOMAIN } = window.__RUNTIME_CONFIG__;
const { REACT_APP_AUTH0_CLIENT_ID } = window.__RUNTIME_CONFIG__;

const App = () => {

  return (
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      clientId={REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
    >
      <Login />
      <Logout />
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<MapContainer />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/newcrossing" element={<NewCrossing />}></Route>
          <Route path="/policereports" element={<PoliceReports />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </Auth0Provider>
  );
};

export default App;
