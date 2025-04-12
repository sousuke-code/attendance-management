"use client";

import { CardHeader, Card, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card>
      <CardHeader className="flex justify-center items-center">
        <CardTitle>エラーが発生しました</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <h2 className="text-l text-red-500 font-bold">{error.message}</h2>
        </div>
          <Button onClick={() => reset()}>戻る</Button>
      </CardContent>
    </Card>
  );
}
