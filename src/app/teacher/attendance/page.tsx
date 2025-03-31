"use client";
import CheckInCard from "@/components/CheckInCard";
import CheckOutCard from "@/components/CheckOutCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default  function TeacgerAttendancePage() {
  return (
    <Tabs defaultValue="checkIn" className="">
      <TabsList>
        <TabsTrigger value="checkIn">出席</TabsTrigger>
        <TabsTrigger value="checkOut">退勤</TabsTrigger>
      </TabsList>
      <TabsContent value="checkIn">
        <CheckInCard />
      </TabsContent>
      <TabsContent value="checkOut">
         <CheckOutCard />
      </TabsContent>
    </Tabs>
  );
}
