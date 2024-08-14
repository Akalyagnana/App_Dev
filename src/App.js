import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login/login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import PrivateRouter from "./components/Context/Private_Router";
import Schedule from "./components/schedule/Schedule";
import Profile from "./components/profile/Profile";
import Tracker from "./components/tracker/Tracker";
import ManageShipments from "./components/Manage/ManageShipments";
import Aboutus from "./components/aboutus/Aboutus";
import Contactus from "./components/contactus/Contactus";
import Findloc from "./components/findloc/Findloc";
import Fuelsurch from "./components/fuelsurch/Fuelsurch";
import FAQ from "./components/faq/FAQ";
import Admin from "./components/admin/Admin";
import Info from "./components/info/Info";
import Adminfeed from "./components/adminfeed/Adminfeed";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route
        path="/home"
        element={
          <PrivateRouter>
          <Home/>
          </PrivateRouter>
        }
      />
      <Route path='/' element={<Info/>}/>
      
      <Route path="/login" element={<Login/>}/>

      <Route path="/register" element={<Register/>}/>
      
      <Route path="/schepic" element={
        <PrivateRouter>
          <Schedule/>
        </PrivateRouter>
        }
      />

      <Route path="/profile" element={
        <PrivateRouter>
          <Profile/>
        </PrivateRouter>
        }
      />

      <Route path="/tracker" element={<Tracker/>}/>

      <Route path="/manageship" element={
        <PrivateRouter>
          <ManageShipments/>
        </PrivateRouter>
        }
      />

      <Route path="/aboutus" element={<Aboutus/>}/>

      <Route path="/contactus" element={
        <PrivateRouter>
        <Contactus/>
        </PrivateRouter>
        }
      />

      <Route path="/findloc" element={<Findloc/>}/>

      <Route path="/fuelsurch" element={<Fuelsurch/>}/>

      <Route path="/FAQ" element={<FAQ/>}/>

      <Route path="/admin" element={
        <PrivateRouter>
        <Admin/>
        </PrivateRouter>
        }/>
      <Route path="/adminfeed" element={
        <PrivateRouter>
        <Adminfeed/>
        </PrivateRouter>
        }/>
      

    </Routes>
    </BrowserRouter>
  );
}

export default App;
