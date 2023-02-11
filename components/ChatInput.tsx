"use client";

import { db } from "@/firbase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import {toast} from 'react-hot-toast'
import ModelSelection from "./ModelSelection";
import useSWR from "swr";
type TProps = {
  ChatID: string;
};
const ChatInput = ({ ChatID }: TProps) => {
  const [inputPrompt, setInputPrompt] = useState("");
  const { data: session } = useSession();

  //! use SWR to get the model
  const {data:model} = useSWR('', {
    fallbackData: 'text-davinci-003'
  })  

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!inputPrompt) return;

    const input = inputPrompt.trim();
    setInputPrompt("");

    const message: Message = {
      text: input,
      createdAt : serverTimestamp(),
      user : {
        _id : session?.user?.email!,
        name : session?.user?.name!,
        avatar : session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}`
      }
    }

    await addDoc(collection(db,'users', session?.user?.email!, 'charts',ChatID,'messages'),message)

    // toast notification to say Loading...
    const  notifiction = toast.loading('ChatGPT is Thinking...')

    await fetch('/api/askQuestion',{
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        prompt : input,
        ChatID,
        model,
        session
      })
    }).then(() => {
      // Tost notifications
      toast.success('ChatGPT has responded successfully', {
        id: notifiction
      })

    })
  }

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm outline-none mt-9">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent flex-1  outline-none disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          type="text"
          placeholder="Type Your Message here..."
        />
        <button disabled={!inputPrompt || !session} type="submit" className={`bg-[#11A37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed`}>
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
};

export default ChatInput;
