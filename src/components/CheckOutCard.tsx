"use client";

import dynamic from "next/dynamic";
import { CardHeader, Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";


export default function CheckOutCard() {
    const Timer = dynamic(() => import("./Timer"), { ssr: false});
    return (
        <Card>
            <CardHeader>
                <CardTitle>退勤入力画面</CardTitle>
            </CardHeader>
            <CardContent>
                <Timer />
                <form action="">
                    <input type="text" />
                    <Button>退勤する</Button>
                </form>
            </CardContent>
        </Card>
    )
}
