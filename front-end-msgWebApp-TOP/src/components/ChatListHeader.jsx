import { useState, useContext, useEffect } from "react";

import { RiChatNewLine } from "react-icons/ri";
import { AuthContext } from "../layout/MainLayout";

import DialogAllUsers from "./DialogAllUsers";

import useAllUsers from "../customHooks/useAllUsers";
import { FaLessThanEqual } from "react-icons/fa6";




const ChatListHeader = ({ handleOpenChat}) => {
  const {token, user} = useContext(AuthContext)
  const {allUsers, loading, error} = useAllUsers(token)
  const [isOpen, setIsOpen] = useState(false)
  const [searchfield, setSearchField] = useState("")
  const [filteredUsers, setFilteredUsers] = useState([])
  
  

  const handleModalToggle = () =>  {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }
  
  return (
    <div className="grid gap-2">
      <div className="flex justify-between px-2 items-center">
          <h2 className="text-2xl font-bold">Chats</h2>
          <button
            onClick={ handleModalToggle} 
            className="btn btn-ghost text-2xl "><RiChatNewLine  /></button>
              <DialogAllUsers
              usersList ={allUsers}
              modalIsOpen = {isOpen}
              toggleModal = {handleModalToggle}
              handleOpenChat={handleOpenChat}
               />
      </div>
      <input 
      type="text"
      placeholder="search or start new chat"
      className="input input-sm input-bordered input-accent w-full placeholder:text-md" />
    </div>
  );
};

export default ChatListHeader;
