import { BrowserRouter, useLocation } from "react-router-dom";
import "./App.css";
import { Header } from "./components/header";
import PermanentDrawerLeft from "./components/navBar";
import AppRoutes from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
}

const AppContent = () => {
  const location = useLocation();

  // Define the routes that should not have the layout
  const noLayoutRoutes = ["/log-in", "/reset-password", "/forgot-password","/create-customer"];

  const isNoLayoutRoute = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="App">
      {!isNoLayoutRoute && <PermanentDrawerLeft />}
      <div className="main-content">
        {!isNoLayoutRoute && <Header />}
        <div className="content">
          <AppRoutes />
        </div>
        {/* {!isNoLayoutRoute && <Footer />} */}
      </div>
    </div>
  );
};

export default App;
