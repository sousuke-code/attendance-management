"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
} : {
    error: Error & { digest?: string };
    reset: () => void;
}) {

    return(
        <div>
            <h2>Error Message wrong</h2>
            <p>{error.message}</p>
            <button onClick={() => reset()}>
                Try Again
            </button>
        </div>
    )

}
