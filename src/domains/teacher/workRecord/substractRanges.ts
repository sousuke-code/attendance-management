import { isBefore, isAfter } from "date-fns";

type TimeRange = {
    start: Date;
    end: Date;
};

export function substractRanges(base: TimeRange, subs: TimeRange[]) : TimeRange[] {
    let remaining: TimeRange[] = [base];

    for(const sub of subs){
        const updated: TimeRange[] = [];

        for (const r of remaining){
            if(isBefore(sub.end, r.start) || isAfter(sub.start, r.end)){
                updated.push(r);
                continue;
            }

            if(isBefore(r.start, sub.start)){
                updated.push({ start: r.start, end: sub.start });
            }

            if(isAfter(r.end, sub.end)){
                updated.push({ start: sub.end, end: r.end });
            }
        }

        remaining = updated;
     }
     return remaining;

}
