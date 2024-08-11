'use client'

import React from 'react'
import { useEffect } from 'react';
import { usePathname, useSearchParams,  } from 'next/navigation';

const Search = ({isAdmin, setIsAdmin}:any) => {
    const pathname=usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensures this runs only on the client
          const admin = searchParams.get('admin')  == "true";
          setIsAdmin(admin);
          console.log("pathname", pathname)
          console.log("searchParams?.admin",searchParams.get('admin') )
          console.log(" loogeing in window", admin)
        }
        else{
          console.log("nopt loogeing in window")
        }
      }, [ pathname, searchParams]);

  return (
    <>
    </>
  )
}

export default Search
