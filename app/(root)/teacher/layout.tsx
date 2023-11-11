import React from "react";

const TeacherPageLayout = ({children}: {children: React.ReactNode}) => {
  return ( 
    <div className="md:pl-72">
      {children}
    </div>
   );
}
 
export default TeacherPageLayout;