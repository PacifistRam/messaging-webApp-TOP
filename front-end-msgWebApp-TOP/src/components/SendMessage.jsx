import { useContext, useState } from "react";
import { RiMailSendFill } from "react-icons/ri";

import { AuthContext } from "../layout/MainLayout";
import { RefetchContext } from "../pages/ChatPage";

const SendMessage = () => {
  const { token } = useContext(AuthContext);
  const { handleRefetch,  currentReceiver} = useContext(RefetchContext)
  const [msgField, setMsgField] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setMsgField(e.target.value);
  };

  const sendChat = async (e) => {
    e.preventDefault();
    if (!msgField || loading ) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/msg/create-msg", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId:  currentReceiver,
          content: msgField,
        }),
      });
      const msgCreated = await response.json();
      if (response.ok) {
        setMsgField("");
        handleRefetch();
      } else {
        console.log("didn't send the msgs");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={sendChat}
      className="w-full grid grid-cols-12 gap-1 justify-center items-center mt-2 "
    >
      <input
        type="text"
        placeholder="type message...."
        onChange={handleChange}
        value={msgField}
        autoFocus
        className={`input input-primary col-span-11 focus-visible:outline-accent rounded-3xl ${loading? 'input-disabled' : ''}`}
      />
      <button
        type="submit"
        className={`col-span-1 place-self-center btn text-xl bg-primary text-primary-content hover:text-accent  ${loading? 'btn-disabled' : ''}`}
      >
        {loading ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          <RiMailSendFill />
        )}
      </button>
    </form>
  );
};

export default SendMessage;
