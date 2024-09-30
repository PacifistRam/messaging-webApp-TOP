import { Link } from "react-router-dom";
import DarkLightToggle from "./DarkLightToggle";

const Navbar = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content rounded-sm px-4 mb-4">
      <div className="navbar-start">
        <p className="text-3xl font-bold">ChatLogo</p>
      </div>
      <div className="navbar-end gap-5 ">
          <ul className="  flex gap-3 font-semibold text-xl">
            <li className="text-neutral-content hover:text-secondary ">
              <Link to={"/chat-app"}>Chat</Link>
            </li>
            <li className="text-neutral-content hover:text-secondary ">
              <Link to={"/sign-up"}>Sign-Up</Link>
            </li>
            <li className="text-neutral-content hover:text-secondary ">
              <Link to={""}>Log-Out</Link>
            </li>
          </ul>
          <DarkLightToggle />
      </div>
    </div>
  );
};

export default Navbar;
