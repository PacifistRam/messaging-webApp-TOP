import { useState, useContext, useEffect } from "react";

import { RiChatNewLine } from "react-icons/ri";
import { AuthContext } from "../layout/MainLayout";

import DialogAllUsers from "./DialogAllUsers";

import useAllUsers from "../customHooks/useAllUsers";
import SearchUsers from "./SearchUsers";

const ChatListHeader = ({ handleOpenChat }) => {
  const { token, user } = useContext(AuthContext);
  const { allUsers, loading, error } = useAllUsers(token);
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleModalToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSearchBox = (e) => {
    const { value } = e.target;

    setSearchField(value);

    // open the search popup if the there is input
    setSearchOpen(value.length > 0);
  };

  useEffect(() => {
    if (searchField?.length > 0 && allUsers) {
      const filtered = allUsers.filter((u) =>
        u.name.toLowerCase().startsWith(searchField.toLowerCase()) && u.id !== user.userId
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchField, allUsers]);

  return (
    <div className="grid gap-2">
      <div className="flex justify-between px-2 items-center">
        <h2 className="text-2xl font-bold">Chats</h2>
        <button
        tabIndex={1}
         onClick={handleModalToggle} className="btn btn-ghost text-2xl ">
          <RiChatNewLine />
        </button>
        <DialogAllUsers
          usersList={allUsers}
          modalIsOpen={isOpen}
          toggleModal={handleModalToggle}
          handleOpenChat={handleOpenChat}
        />
      </div>
      <SearchUsers
        searchOpen = {searchOpen}
        setSearchOpen = {setSearchOpen}
        handleSearchBox = {handleSearchBox}
        searchField = {searchField}
        setSearchField = {setSearchField}
        filteredUsers = {filteredUsers}
        handleOpenChat={handleOpenChat}
         />

    </div>
  );
};

export default ChatListHeader;
