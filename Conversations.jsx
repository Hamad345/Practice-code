// import React from "react"
import Conversation from "./Conversation"
import useGetConversations from "../../hooks/useGetConversations"

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  // console.log(conversations)

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {Array.isArray(conversations) && conversations.map((conversation, index) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIndex={index.true} 
        />
      ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
}




export default Conversations
