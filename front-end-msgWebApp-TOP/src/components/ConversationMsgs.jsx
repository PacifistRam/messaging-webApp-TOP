import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../layout/MainLayout";

// date fns imports
import { format, parseISO, differenceInCalendarDays } from "date-fns";

const ConversationMsgs = ({ messages }) => {
  const { user } = useContext(AuthContext);
  const lastMessageRefRef = useRef(null);

  useEffect(() => {
    if (lastMessageRefRef.current) {
      lastMessageRefRef.current.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }
  }, [messages]);
  return (
    <>
      {messages && (
        <div className="py-4 px-2 w-full absolute ">
          <ul className="flex flex-col gap-2  ">
            {messages.map((msg, index) => {
              const getTime = format(parseISO(msg.timeStamp), "hh:mm a");
              const getDate = format(parseISO(msg.timeStamp), "dd MMMM yy");
              const isDayOver =
                index > 0 &&
                differenceInCalendarDays(
                  parseISO(msg.timeStamp),
                  parseISO(messages[index - 1].timeStamp)
                );
              return (
                <React.Fragment key={msg.id}>
                  <li className="place-self-center text-sm font-light ">
                    {index === 0 || isDayOver ? getDate : ""}
                  </li>
                  <li
                    className={`chat-bubble max-w-60 text-accent-content grid gap-1 ${
                      user.userId === msg.senderId
                        ? "self-end chat-bubble-info  "
                        : "self-start chat-bubble-accent  "
                    } `}
                  >
                    <span>{msg.content}</span>
                    <span className="text-xs place-self-end font-light">
                      {getTime}
                    </span>
                  </li>
                  {index === messages.length - 1 && (
                    <div ref={lastMessageRefRef}></div>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default ConversationMsgs;
