import { useEffect, useRef } from "react";
import { IoCloseSharp } from "react-icons/io5";

const DialogAllUsers = ({ usersList, modalIsOpen, toggleModal,  handleOpenChat }) => {
  useEffect(() => {
    if (modalIsOpen) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [modalIsOpen]);

  const handleUserClick = (userId) => {
    console.log(userId)
    handleOpenChat(userId);
    toggleModal()
  }

  const modalRef = useRef(null);
  return (
    <dialog ref={modalRef} className="modal ">
      <div className="modal-box w-1/3  max-h-50 p-0">
        <div>
          <div className="bg-neutral text-neutral-content p-3 flex justify-between items-center ">
            <h2 className="text-2xl font-bold">New Chat</h2>
            <button
              onClick={toggleModal}
              className="btn btn-sm text-2xl btn-ghost btn-circle text-error "
            >
             <IoCloseSharp />
            </button>
          </div>
          {usersList.length ? (
            <ul className="grid gap-5 p-5">
              {usersList.map((user) => (
                <li key={user.id}>
                  <button
                    onClick={() => handleUserClick(user.id)}
                    className="btn btn-ghost w-full px-2  justify-start  text-neutral-content rounded-md"
                  >
                    <div className="avatar placeholder">
                      <div className="bg-slate-700 text-neutral-content w-10 rounded-full">
                        <span className="text-">{user.name.charAt(0)}</span>
                      </div>
                    </div>
                    <span>{user.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found</p>
          )}
        </div>
      </div>
      <div onClick={toggleModal} className="modal-backdrop"></div>
    </dialog>
  );
};

export default DialogAllUsers;
