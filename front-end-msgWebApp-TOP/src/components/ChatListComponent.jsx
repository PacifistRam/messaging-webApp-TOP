import { useContext, useEffect, memo, useState } from "react";

// authContext Import
import { AuthContext } from "../layout/MainLayout";
import { RefetchContext } from "../pages/ChatPage";

// custom hook import
import useChatList from "../customHooks/useChatList";

const ChatListComponent = memo(({
  handleOpenChat,
}) => {
  const { token } = useContext(AuthContext);
  const { reFetch, setReFetch, currentReceiver } = useContext(RefetchContext);
  const [ shouldReFetch, setShouldReFetch ] = useState(true)
  const { chatList, loading, error } = useChatList(token,  shouldReFetch);

  useEffect(() => {
    if(chatList) {
      setReFetch(false)
      setShouldReFetch(false)
    }
  },[chatList, setReFetch])

  useEffect(() => {
   if(reFetch && !chatList.some(chat => chat.id === currentReceiver)) {
    setShouldReFetch(true)
   } else {
    setReFetch(false)
   }
  }, [currentReceiver, reFetch]);

  if (loading) {
    return (
      <div className="h-full flex justify-center  gap-02 pt-8 font-bold">
        <span className="text-lg">Retrieving Chat </span>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      
      {chatList.length ? (
        <ul className="grid gap-5">
          {chatList.map((chat) => (
            <li key={chat.id}>
              <button
                onClick={() => handleOpenChat(chat.id)}
                className={`btn hover:text-primary-content hover:bg-accent w-full px-2  justify-start ${
                  currentReceiver === chat.id ? "btn-primary  " : "btn-ghost"
                } `}
              >
                <div className="avatar placeholder">
                  <div className="bg-slate-700 text-neutral-content w-10 rounded-full">
                    <span className="text-">{chat.name.charAt(0)}</span>
                  </div>
                </div>
                <span>{chat.name}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats found</p>
      )}
    </div>
  );
});

export default ChatListComponent;
