import { useEffect, useState } from "react";

const useConversationList = (token, receiverId, reFetchConvo) => {
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const baseUrl = `http://localhost:5000/msg/conversation/${receiverId}`
        
        const options = {
            method: 'get',
            headers: { 'Authorization' : `Bearer ${token}`},
            
        }
        
        const fetchConversation = async () => {
            try {
                setLoading(true)
                const response = await fetch(baseUrl, options)
                const conversationData = await response.json()

                if(response.ok) {
                    setConversation(conversationData)
                    
                }else {
                    setError(conversationData.message || "error occurred while fetching chats")
                    
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
            if(token && receiverId && reFetchConvo) {
                fetchConversation()
            }


            
    }, [token, receiverId, reFetchConvo])

    return { conversation, loading, error}
}

export default useConversationList