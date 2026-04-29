import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { getCurrentUser } from "./api/auth";
import { login, logout } from "./store/authSlice";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import {Outlet} from "react-router-dom"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [])
return !loading ? (<div className='min-h-screen flex-wrap content-between bg-gray-400'>
  <div className="w-full block">
    <Header/>
      <main>
        Todo Content <Outlet/>
      </main>
    <Footer/>

  </div>
</div>) : null
}

export default App;
