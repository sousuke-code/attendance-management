"use client";

import { useTime } from "./hooks/useTime";
export default function Timer() {
    const time = useTime();
    return <div>{time.toLocaleString()}</div>;
}
