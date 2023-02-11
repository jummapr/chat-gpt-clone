'use client'

import { db } from '@/firbase';
import { PlusIcon } from '@heroicons/react/24/solid'
import { addDoc, collection ,serverTimestamp} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'



const NewChat = () => {
  const router = useRouter();
  const {data:session} = useSession();

  const createChat = async() => {
    const doc = await addDoc(collection(db,'users',session?.user?.email!,'charts'),{
      messages: [],
      userId : session?.user?.email!,
      createAt: serverTimestamp(),

    });

    router.push(`/chat/${doc.id}`)
  }
  return (
    <div onClick={createChat} className='border-gray-700 border ChatRow'>
      <PlusIcon className='h-4 w-4'/>
      <p>New Chat</p>
    </div>
  )
}

export default NewChat
