import { useEffect, useState } from "react";

const useChatList = (token,  reFetch) => {
    const [chatList, setChatList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const baseUrl = `http://localhost:5000/msg/conversation-list/`
        
        const options = {
            method: 'get',
            headers: { 'Authorization' : `Bearer ${token}`}
        }
        
        const fetchChatList = async () => {
            try {
                const response = await fetch(baseUrl, options)
                const chatListData = await response.json()

                if(response.ok) {
                    setChatList(chatListData)
                    
                }else {
                    setError(chatListData.message || "error occurred while fetching chats")
                    
                }
            } catch (error) {
                if(error.name === 'TypeError') {
                    setError("The server is currently unavailable. Please try again later")
                }else {
                    setError("server error please try later")
                }
            } finally {
                setLoading(false)
            }
        }
        if(token &&  reFetch  ) {
            fetchChatList()
        }

            
    }, [ token, reFetch])

    return { chatList, loading, error}
}

export default useChatList