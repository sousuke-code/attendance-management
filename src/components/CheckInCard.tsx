"use client";

import dynamic from "next/dynamic";
import { ReactElement, startTransition, useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "./ui/button";
import { CardHeader, Card, CardContent, CardTitle } from "./ui/card";
import { checkInAction } from "@/actions/workReacord/checkInAction";
import { Input } from "./ui/input";

export default function CheckInCard() {
  const Timer = dynamic(() => import("./Timer"), { ssr: false });

  const [state, formAction] = useFormState(checkInAction, { message: null });

  return (
    <Card>
      <CardHeader>
        <CardTitle>勤怠入力画面</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center text-2xl font-bold">
          <Timer />
        </div>
        <form action={formAction} className="flex flex-col">
          <label>講師ID</label>
          <Input
            name="teacherId"
            id="teacherId"
            type="text"
            placeholder="講師IDを入力してください"
            required
          />
          <p className="text-red-500">{state.message}</p>
          <Button className="mt-2" size="sm">
            出勤する
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
