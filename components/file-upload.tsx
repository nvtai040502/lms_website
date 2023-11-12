import { UploadDropzone, UploadButton } from "@/lib/uploadthing"
import Image from "next/image"
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface FileUploadProps {
  endpoint: "courseImage"
  value: string
  onChange: (url?: string) => void
}
export const FileUpload = ({
  endpoint,
  value,
  onChange,
}: FileUploadProps) => {
  
  const fileType = value?.split(".").pop()
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-40 w-60 object-cover  ">
      <Image
        fill
        src={value}
        
        alt="Upload"
      />
      <Button
          onClick={() => onChange("")}
          className=" rounded-none absolute top-0 right-0 "
          variant="destructive"
          size="sm"
        >
          <X className="h-4 w-4" />
      </Button>
    </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  )
}
