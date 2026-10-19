import { NavLink } from "react-router-dom";

//STYLES
import styles from "./NavBar.module.css";

//CONTEXTS
import { useAuthValue } from "../Context/AuthContext";
//HOOKS
import { useAuthenticator } from "../Hooks/useAuthenticator";

const NavBar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthenticator();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>

      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="/Login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Cadastrar"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Cadastrar
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to="/Dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Posts/Create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Criar Post
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink
            to="/Sobre"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {user && (
          <button onClick={logout}>Sair</button>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
