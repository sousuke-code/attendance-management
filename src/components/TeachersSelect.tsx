"use client";

import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";


export default function TeacherSelect {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [teachers, setTeachers] = useState([]);
   useEffect(() => {
    const res = await fetch("/api/teachers"); 
    const data = await res.json();
    setTeachers(data);
   },[]);


   return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
            
        </PopoverTrigger>

    </Popover>
   )
}
