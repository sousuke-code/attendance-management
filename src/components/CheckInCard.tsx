"use client";

import dynamic from 'next/dynamic';
import { Button } from './ui/button';
import { CardHeader,Card, CardContent, CardTitle } from './ui/card';


export default function CheckInCard() {
    const Timer = dynamic(() => import('./Timer'),{ssr:false});
    return(
        <Card>
            <CardHeader>
                <CardTitle>勤怠入力画面</CardTitle>
            </CardHeader>
            <CardContent>
                <Timer />
                <form action="">
                   <input type="text" />
                   <Button>出勤する</Button>
                </form>
            </CardContent>
        </Card>

    )
}
