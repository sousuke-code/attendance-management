"use client";
import { Button } from "./ui/button"
import { toast } from "sonner"

export default function RecruitmentButton() {
    return (
      <Button className="mb-2 bg-blue-500 font-bold text-md hover:bg-blue-600" size={"sm"}
      onClick={() => 
        toast("シフト募集を呼びかけました",{
        })
      }
      >
       slackで募集 
      </Button>
    )
}
