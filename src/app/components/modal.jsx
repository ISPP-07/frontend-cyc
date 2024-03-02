'use client'

import { useEffect } from "react";

export default function Modal ({isVisible, onClose, children}) {
    if(!isVisible) return null
    useEffect(() => {
        const disableTabNavigation = (x) => {
          if (isVisible ) {
            x.preventDefault();
          }
        };

        document.addEventListener('keydown', disableTabNavigation);

        return () => {
          document.removeEventListener('keydown', disableTabNavigation);
        };
      }, [isVisible, onClose]);

    const toClose=(x)=>{
        if(x.target.id==="close") {
            onClose()

        }
    }
    return (
        <div className= {`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ${isVisible ? 'z-30' : 'z-0'} `} id="close" onClick={toClose}>
        <div className="w-[600px] h-[200px] ">
            <button className="text-gray-500 text-xl" onClick={onClose}>X</button>
            <div className="bg-white p-2 rounded-3xl text-black font-Varela"> {children} </div>
        </div>

        </div>
    )
}