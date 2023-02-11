'use client'

import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firbase';
import Message from './Message';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

type TProps = {
    ChatID: string;
}

const Chat = ({ChatID}:TProps) => {
  const {data: session} = useSession();
  const [messages] = useCollection(session && query(
    collection(db,'users',session?.user?.email!,'charts',ChatID,'messages'),
    orderBy('createdAt','asc')
  ));
  return (
    <div className='flex-1 overflow-y-auto overflow-x-hidden'>

      {messages?.empty && (
        <>
          <p className='mt-10 text-center text-white'>Type A Prompt Below To get started!</p>
          <ArrowDownCircleIcon className='h-10 w-10 mx-auto mt-5 text-white animate-bounce'/>
        </>
      )}
          {
            messages?.docs.map((message) =>(
              <Message key={message.id} message={message.data()}/>
            ))
          }
    </div>
  )
}

export default Chat
