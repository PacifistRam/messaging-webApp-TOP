import { Link } from "react-router-dom";
import DarkLightToggle from "./DarkLightToggle";
import { AuthContext } from "../layout/MainLayout";
import { useContext } from "react";

const Navbar = ({handleLogOut}) => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar bg-neutral text-neutral-content rounded-sm px-4 mb-4">
      <div className="navbar-start">
        <p className="text-3xl font-bold text-accent">ChatLogo</p>
      </div>
      <div className="navbar-end gap-5 ">
        <ul className="  flex gap-6 font-semibold text-xl items-center">
          {user.isAuthenticated ? (
            <>
              <li className="text-neutral-content hover:text-secondary ">
                {user.name}
              </li>
              <li>
              <button
              onClick={handleLogOut}
               className="btn btn-outline btn-sm border-accent font-bold text-error text-base ">Log-Out</button>
              </li>
            </>
          ) : (
            <li className="text-neutral-content">
             <Link to={"/sign-up"}>Sign-Up</Link>
            </li>
          )}
        </ul>
        <DarkLightToggle />
      </div>
    </div>
  );
};

export default Navbar;
