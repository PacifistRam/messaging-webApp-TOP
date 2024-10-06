import { PiWechatLogo } from "react-icons/pi";

const ChatHomePage = () => {
  return (
    <div className=" grid gap-8 h-full ">
      <div className="text-5xl md:text-8xl py-4 md:py-7  place-self-center text-accent"><PiWechatLogo /></div>
      <div className="place-self-center grid gap-2">
        <h3 className="text-2xl md:text-4xl font-extrabold mb-2">ChatterBox WebApp TOP</h3>
        <span className="font-bold text-xl md:text-2xl"> Let's Start Chatting</span>
        <p className="text-lg md:text-xl capitalize">send And receive Messages using Rest api implementation </p>
        <p className="text-lg md:text-xl capitalize font-semibold">click on the chats on left to continue the conversation, or start a new chat </p>
      </div>
    </div>
  )
}

export default ChatHomePage