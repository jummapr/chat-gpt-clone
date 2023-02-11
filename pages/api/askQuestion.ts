// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDb } from '@/firebaseAdmin';
import query from '@/lib/queryApi';
import admin from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  answer: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const {prompt,ChatID,model,session} = req.body;

    if(!prompt) {
        res.status(400).json({answer : "Please Provide a Prompt"}); 
        return;
    }

    if(!ChatID) {
        res.status(400).json({answer : "Please provide a valid ChatID"}); 
        return;
    }

    // ChatGPT query
    const response = await query(prompt,ChatID,model);


    const message: Message = {
        text: response || "ChatGpt was unable to find an answer for that!",
        createdAt : admin.firestore.Timestamp.now(),
        user: {
            _id: "chatGPT",
            name: "ChatGPT",
            avatar: "https://links.papareact.com/89k"
        }

    }

    await adminDb.collection('users').doc(session?.user?.email).collection('charts').doc(ChatID).collection('messages').add(message)
  res.status(200).json({ answer: message.text })
}
