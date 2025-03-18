"use client";
import { Button } from "./ui/button"
import { toast } from "sonner"

export default function RecruitmentButton() {
    return (
      <Button className="mb-2 bg-blue-500 font-bold text-md "
      onClick={() => 
        toast("シフト募集を呼びかけました",{
        })
      }
      >
        募集を呼びかける
      </Button>
    )
}
