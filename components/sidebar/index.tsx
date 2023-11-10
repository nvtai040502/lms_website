"use client"; 

import Sidebar from "./sidebar";
import ModeMobile from "../mode-mobile";

const DynamicSidebar = () => {
  
  return (
    <div>
      
      <div className="hidden absolute w-72 h-screen md:flex flex-col border-r-2">
        <Sidebar></Sidebar>
      </div>
      
      <div className="md:hidden absolute">
        <ModeMobile></ModeMobile>
      </div>
      
    </div>
    
  )
}
export default DynamicSidebar