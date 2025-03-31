"use client";

import dynamic from "next/dynamic";
import { CardHeader, Card, CardContent, CardTitle } from "./ui/card";
import { useFormState } from "react-dom";
import { Button } from "./ui/button";
import { checkOutAction } from "@/actions/workReacord/checkOutActio";
import { Textarea } from "./ui/textarea";
import { format } from "date-fns";
import { formatMinutesToHourMinutes } from "@/domains/formatMinutesToHourMinutes";
import { useState } from "react";
import { stat } from "fs";
import { redirect, useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Input } from "./ui/input";

export default function CheckOutCard() {
  const router = useRouter();
  const Timer = dynamic(() => import("./Timer"), { ssr: false });

  const [state, formAction] = useFormState(checkOutAction, { message: null });
  const [reasons, setReasons] = useState<string[]>(state.officeTime?.map(() => "") ?? []);

  const handleReasonChange = (index: number, value: string) => {
    const updates = [...reasons];
    updates[index] = value;
    setReasons(updates);
  }

  const handleSubmit = async() => {
    if(!state.officeTime){
        alert("事務時間が取得できていません");
        return;
    }

    const payload = {
        teacherId: state.teacherId,
        attendanceId: state.attendanceId,
        officeTime: state.officeTime.map((range, i) => ({
            ...range,
            reason: reasons[i] ?? "",
        }))
    }

    const res = await fetch("/api/office-time",{
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
        }
    });

    if(res.ok){
       alert("事務時間を登録しました");
       window.location.href = "/teacher/attendance";
    }else{
        alert("事務時間の登録に失敗しました");
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>退勤入力画面</CardTitle>
      </CardHeader>
      <CardContent>
        {state.officeTime ? (
          <div className="flex flex-col gap-6">
            <h2>事務時間の入力</h2>
            {state.officeTime.map((range, i) => (
              <div key={i} className="space-y-2 border-rounded-xl p-4 ">
                <div className="font-bold flex text-lg gap-3 items-center">
                  <p className="text-lg">{i+1}.</p>
                  <span>
                    {format(new Date(range.start), "HH:mm")} ~{" "}
                    {format(new Date(range.end), "HH:mm")}
                  </span>
                  <span>{formatMinutesToHourMinutes(range.minutes)}</span>
                </div>
                <Textarea 
                 placeholder="例: 授業準備、報告書作成など"
                 value={reasons[i]}
                 onChange={(e) => handleReasonChange(i, e.target.value)}
                />
              </div>
            ))}
            <Button onClick={handleSubmit}>事務時間を登録する</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-center items-center text-2xl font-bold"> 
            <Timer />
            </div>
            <form action={formAction} className="flex flex-col">
              <label>講師ID</label>
              <Input name="teacherId" id="teacherId" type="text" placeholder="講師IDを入力してください"required />
              <p className="text-red-500">{state.message}</p>
              <Button className="mt-2">退勤する</Button>
            </form>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
