import React from "react";

import Link from "@/UI/elements/link"

export default function Navbar(){
    return(
        <>
            <nav className="bg-blue-600 w-full z-10 sticky top-0 left-0">
               <div className="container px-2 mx-auto py-4 flex items-center justify-start">
                <Link href="/" className="text-white font-bold tracking-wide capitalize font-sans hover:bg-blue-500 py-1 px-3 rounded-sm">
                        React CRUD
                    </Link>
               </div>
            </nav>
        </>
    )
}
