"use client"

import { formatPrice } from "@/lib/format-price";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import { Course } from "@prisma/client";

const CourseEnrollButton = ({price, courseId}: {price: number, courseId: string}) => {
  const [isLoading, setIsLoading] = useState(false)
  const onClick = async () => {
    try {
      setIsLoading(true);
  
      const response = await axios.post(`/api/courses/${courseId}/checkout`)
  
      window.location.assign(response.data.url);
    } catch {
      
    } finally {
      setIsLoading(false);
    }
  }
  return ( 
    <Button 
      variant="outline" 
      disabled={isLoading} 
      onClick={onClick} 
      size="sm"
    > 
      Enroll for {formatPrice(price)}
    </Button>
   );
}
 
export default CourseEnrollButton;

