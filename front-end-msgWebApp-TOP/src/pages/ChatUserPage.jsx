import { AuthContext } from "../layout/MainLayout";
import { RefetchContext } from "./ChatPage";
import { useContext, useEffect, useState } from "react";

import useConversationList from "../customHooks/useConversation";
import { useNavigate } from "react-router-dom";
import ChatPageHeader from "../components/ChatPageHeader";
import ConversationMsgs from "../components/ConversationMsgs";
import SendMessage from "../components/SendMessage";

const ChatUserPage = ({ receiverId, handleRefetch }) => {
  const { token, user } = useContext(AuthContext);
  const { reFetch, setReFetch, currentReceiver } = useContext(RefetchContext);
  const navigate = useNavigate();
  const { conversation, loading, error } = useConversationList(
    token,
    currentReceiver,
    reFetch
  );
  useEffect(() => {
    if (conversation) {
      setReFetch(false);
    }
  }, [conversation]);

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/");
    }
  }, [user.isAuthenticated]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid h-full grid-rows-pageLayout">
      <ChatPageHeader receiver={conversation?.receiver} />
      <div className="overflow-y-auto h-full relative ">
        {loading ? (
          <div className="flex gap-1 items-center h-full justify-center">
            <span className="text-xl">Loading</span>{" "}
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <ConversationMsgs messages={conversation?.messages} />
        )}
      </div>
      <SendMessage  />
    </div>
  );
};

export default ChatUserPage;
