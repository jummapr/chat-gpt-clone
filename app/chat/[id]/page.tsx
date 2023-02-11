import Chat from '@/components/Chat'
import ChatInput from '@/components/ChatInput'
import React from 'react'

type TProps = {
    params : {
        id: string;
    }
}

const ChatPage = ({params: {id}}:TProps) => {
  return (
    <div className='flex flex-col h-screen overflow-hidden overflow-y-auto'>
      <Chat ChatID={id}/>
      <ChatInput ChatID={id}/>
    </div>
  )
}

export default ChatPage
