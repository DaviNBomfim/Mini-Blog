//CSS
import "./App.css";

//FIREBASE
import { onAuthStateChanged } from "firebase/auth"; 

//HOOKS
import { useState, useEffect } from "react";
import { useAuthenticator } from "./Hooks/useAuthenticator";

//Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import CreatePost from "./Pages/CreatePost/CreatePost";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Search from "./Pages/Search/search";
import Posts from "./Pages/Posts/Posts";
import EditPost from "./Pages/EditPost/EditPost";
//Components
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";

//CONTEXT
import { AuthProvider } from "./Context/AuthContext";

//React router dom
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";



function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthenticator();

  const loading = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if(loading) {
    return(<p>Carregando</p>);
  }

  return (
    <div className="App">
      <AuthProvider value = {{user}}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Sobre" element={<About />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/Posts/:id" element={<Posts />} />
              <Route path="/Cadastrar" element={!user ? <Register /> : <Navigate to="/"/>} />
              <Route path="/Login" element={!user ? <Login /> : <Navigate to="/"/>} />
              <Route path="/Posts/edit/:id" element={user ? <EditPost /> : <Navigate to="/Login"/>} />
              <Route path="/Posts/Create" element={user ? <CreatePost /> : <Navigate to="/Login"/>} />
              <Route path="/Dashboard" element={user ? <Dashboard /> : <Navigate to="/Login"/>} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
