import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar/sidebar";

const ModeMobile = () => {
  return ( 
    <div className="absolute">
      <Sheet>
        <SheetTrigger>
          <Button variant="outline">
            <AlignJustify/>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Sidebar></Sidebar>
        </SheetContent>
      </Sheet>
    </div>
   );
}
 
export default ModeMobile;