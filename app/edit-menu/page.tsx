'use client'
import EditMenu from '@/components/custom/EditMenu'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  const {user}=useUser();
  const isAdmin = user?.emailAddresses[0].emailAddress === process.env.NEXT_PUBLIC_isAdmin;

  return (
    <div>{isAdmin?(<EditMenu/>)
      :(
        <div>
          You are not authorized for this page
        </div>
      )
    }</div>
  )
}

export default Page