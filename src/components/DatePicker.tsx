"use client"

import { useState } from "react"
import DatePicker from "react-date-picker"
import "react-date-picker/dist/DatePicker.css"
import "react-calendar/dist/Calendar.css"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function DateTimePicker() {
  const [value, setValue] = useState<Date | null>(new Date())

  return (
    <div className="flex flex-col gap-2">
      <Label>日付を選択</Label>
      <div
        
      >
        <DatePicker
          onChange={(date) => setValue(date instanceof Date ? date : null)}
          value={value}
          format="y-MM-dd"
          clearIcon={null}
          calendarIcon={null}
        />
      </div>
      <input type="hidden" name="date" value={value?.toISOString()} />
    </div>
  )
}
