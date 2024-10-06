import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import LogIn from "./pages/LogIn";
import ChatPage from "./pages/ChatPage";
import SignUp from "./pages/SignUp";
import ChatHomePage from "./pages/ChatHomePage";
import ChatUserPage from "./pages/ChatUserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LogIn />,
      },
      {
        path: "chat-app",
        element: <ChatPage />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        errorElement: <h1> Wrong Page! Nothing to see here</h1>,
      },
    ],

    errorElement: (
      <h1>
        404 Not found <Link to={"/"}>Go Home</Link>
      </h1>
    ),
  },
]);

function App() {
  return (
    <div className="max-w-[1440px] mx-auto ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
