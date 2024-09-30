import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const MainLayout = () => {
  return <div>
    <Navbar />
    <Outlet />
    <p>Footer</p>
  </div>;
};

export default MainLayout;
