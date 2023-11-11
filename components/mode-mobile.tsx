"use client"
import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import Sidebar from "./sidebar";


const ModeMobile = () => {
  return ( 
    <div className="flex items-center ">
      <Sheet>
        <SheetTrigger>
            <AlignJustify size={30} />
        </SheetTrigger>
        <SheetContent side="left">
          <Sidebar />          
        </SheetContent>
      </Sheet>
    </div>
   );
}
 
export default ModeMobile;