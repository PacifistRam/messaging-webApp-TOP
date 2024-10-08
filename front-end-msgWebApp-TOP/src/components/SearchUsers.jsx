

const SearchUsers = ({
  searchOpen,
  setSearchOpen,
  handleSearchBox,
  searchField,
  setSearchField,
  filteredUsers,
  handleOpenChat,
}) => {

 

  const handleOnClick = (receiverId) => {
    handleOpenChat(receiverId);
    setSearchOpen(false);
    setSearchField("");
  };

  

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          tabIndex={1}
          placeholder="search or start new chat"
          value={searchField}
          onChange={handleSearchBox}
          onFocus={handleSearchBox}
          className="input input-sm input-bordered input-accent w-full placeholder:text-md"
        />
        {searchOpen && (
          <div className="bg-neutral absolute z-40  mt-3 rounded-lg w-full p-4 max-h-[50vh] overflow-y-auto">
            {filteredUsers ? (
              <ul className="grid gap-3">
                {filteredUsers.map((user) => (
                  <li key={user.id}>
                    <button
                      onClick={() => handleOnClick(user.id)}
                      tabIndex={3}
                      className="border btn btn-ghost text-outline-content w-full rounded-md flex justify-between"
                    >
                      <div className="avatar placeholder flex justify-between items-center gap-2">
                        <div className="bg-slate-700 text-neutral-content w-10 rounded-full">
                          <span className="text-">{user.name.charAt(0)}</span>
                        </div>
                        <span> {user.name}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users's found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
