'use client'

import { useWidget }  from "../model/useWidget"
import React , { useMemo } from 'react'
import { formatLastSeen } from '@/shared/lib/utils/formatLastSeen'
import { ICopyContext } from "../model/types";
import { createContext } from "react";

type CopyContextType = ICopyContext 

export const Context = createContext<Partial<CopyContextType> | ICopyContext |null>(null)

export  function Provider({ children } : { children: React.ReactNode }) {

  const {
    user , status
    
  } : ReturnType<typeof useWidget> = useWidget()

  

  const value : CopyContextType = useMemo(() => {
    const data : ICopyContext
     = { 
        subname: 'levi_v_',

        src: user?.avatar as string || '',

        id: '1337',

        name: (user?.globalName || user?.username || '') as string,

        href: (user?.id && `https://discord.com/users/${user.id}`) as string,

        time: formatLastSeen(user?.lastSeen),
        activities : user?.activities  , 

        status,
     }
    return data 
  } , [

        status,
        
  ])

  return (
    <Context.Provider
      value={value as CopyContextType}
    >
      {children}
    </Context.Provider>
  )
}