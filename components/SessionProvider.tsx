'use client'

import { Session } from "next-auth"
import {SessionProvider as Provider} from "next-auth/react"
import React from "react"

type TProps =  {
    children: React.ReactNode;
    session: Session | null;
}

const SessionProvider = ({children,session}:TProps) => {
    return (
        <Provider>
            {children}
        </Provider>
    )
}

export default SessionProvider