import Headbar from "@/components/headbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return ( 
    <div className="">
      <div className='hidden md:flex '>
        <Sidebar />
      </div>
      <div className="md:pl-72">
        <Headbar />
        {children}
      </div>
    </div>
   );
}
 
export default DashboardLayout;