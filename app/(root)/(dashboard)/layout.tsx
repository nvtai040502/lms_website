import Headbar from "@/components/headbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return ( 
    <div className="">
      
      <div className='hidden md:flex'>
        <Sidebar modeSidebar="dashboard" />
      </div>

      <div className="md:pl-72 pt-14">
        <Headbar modeHeadbar="dashboard" />
        {children}
      </div>
    
    </div>
   );
}
 
export default DashboardLayout;