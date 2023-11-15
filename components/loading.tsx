import { Loader2 } from "lucide-react";

const Loading = () => {
  return ( 
    <div className="fixed inset-0 flex items-center justify-center bg-slate-500/20 dark:bg-slate-500/40">
      <div className="absolute w-screen h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 text-sky-700 dark:text-sky-1000" />
      </div>
    </div>
   );
}
 
export default Loading;