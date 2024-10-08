import { useCallback, useContext, createContext, useEffect, useState } from "react";
import { AuthContext } from "../layout/MainLayout";
import { Outlet, useNavigate } from "react-router-dom";
import ChatListComponent from "../components/ChatListComponent";
import ChatHomePage from "./ChatHomePage";
import ChatListHeader from "../components/ChatListHeader";
import ChatUserPage from "./ChatUserPage";

export const RefetchContext = createContext();

const ChatPage = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [currentReceiver, setCurrentReceiver] = useState(null)
  
  const[ reFetch, setReFetch ] = useState(true)

  
  
  
  
  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/");
    }
  }, [user.isAuthenticated, navigate]);

  

  const handleRefetch = () => {
    setReFetch(true)
  }
  
  


  const openChat = useCallback((receiverId) => {
    console.log("receiverId:", receiverId)
    if (currentReceiver !== receiverId) {
      setCurrentReceiver(receiverId)
      handleRefetch()
    }
  },[currentReceiver])

  return (
    <RefetchContext.Provider value ={{reFetch, setReFetch, handleRefetch, currentReceiver} }>
    <div className="grid grid-cols-12 gap-6 h-full ">
      <aside className="col-span-3 border border-neutral rounded-3xl px-3 py-3">
        <div className="grid gap-4">
          <ChatListHeader handleOpenChat={openChat} />
          <ChatListComponent 
            handleOpenChat={openChat} />
        </div>
      </aside>
      <div className="col-span-9 border border-neutral rounded-3xl px-3 py-3 w-full overflow-auto">
        {currentReceiver ? (
          <ChatUserPage
           receiverId={ currentReceiver}
            />
        ) : (
          <ChatHomePage />
        )}
      </div>
    </div>
    </RefetchContext.Provider>
  );
};

export default ChatPage;
