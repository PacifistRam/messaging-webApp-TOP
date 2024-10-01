
import { useContext, useEffect } from "react"
import { AuthContext } from "../layout/MainLayout"
import { useNavigate } from "react-router-dom"


const ChatPage = () => {
  const navigate = useNavigate()
  const {user, token} = useContext(AuthContext)

  useEffect(()=> {
    if(!user.isAuthenticated){
      navigate("/")
    }
  },[user])
  return (
    <div>
      <h1>Chat PAge</h1>
      {user.isAuthenticated && <p>my Name is {user.name}</p>}
    </div>
    
  )
}

export default ChatPage