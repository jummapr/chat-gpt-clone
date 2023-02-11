import { db } from "@/firbase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type TProps = {
  id: string;
};
const ChatRow = ({ id }: TProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [message] = useCollection(
    collection(db, "users", session?.user?.email!, "charts", id, "messages")
  );
  useEffect(() => {
    if (!pathName) return;

    setActive(pathName.includes(id));
  }, [pathName]);

  const removeChat = async () => {
    await deleteDoc(doc(db,'users',session?.user?.email!,'charts',id));
    router.replace('/')
  }
  return (
    <Link
      href={`/chat/${id}`}
      className={`ChatRow justify-center ${active && "bg-[#353740]"}`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {message?.docs[message?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <TrashIcon onClick={removeChat} className="h-5 w-5 text-gray-700 hover:text-red-700" />
    </Link>
  );
};

export default ChatRow;
