import { AuthContext } from "../layout/MainLayout";
import { useContext, useEffect, useState } from "react";

import useConversationList from "../customHooks/useConversation";
import { useNavigate } from "react-router-dom";
import ChatPageHeader from "../components/ChatPageHeader";
import ConversationMsgs from "../components/ConversationMsgs";
import SendMessage from "../components/SendMessage";

const ChatUserPage = ({
  receiverId,
  reFetchConvo,
  setReFetchConvo,
  handleRefetch,
  handleRefetchChatList,
}) => {
  const { token, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const { conversation, loading, error } = useConversationList(
    token,
    receiverId,
    reFetchConvo
  );
  useEffect(() => {
    if (conversation) {
      setReFetchConvo(false);
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
        <ConversationMsgs messages={conversation?.messages} />
      </div>
      <SendMessage
        receiverId={receiverId}
        refetchMsgs={handleRefetch}
        handleRefetchChatList={handleRefetchChatList}
      />
    </div>
  );
};

export default ChatUserPage;
