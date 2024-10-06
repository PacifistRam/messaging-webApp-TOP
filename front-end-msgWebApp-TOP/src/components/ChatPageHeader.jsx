const ChatPageHeader = ({receiver}) => {
  return (
   <> {receiver && <div className="avatar placeholder flex gap-4 items-center bg-neutral px-3 py-2 rounded-xl">
      <div className="bg-slate-700 text-neutral-content w-10 rounded-full">
        <span className="text-">{receiver?.name.charAt(0)}</span>
      </div>
      <span>{receiver.name}</span>
    </div> }
    </>
  );
};

export default ChatPageHeader;
