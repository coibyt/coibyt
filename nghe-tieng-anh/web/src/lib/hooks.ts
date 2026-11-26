import { useEffect, useState } from "react";
import { loadDay, loadIndex } from "./data";
import type { DayData, IndexData } from "./types";

export function useIndex() {
  const [data, setData] = useState<IndexData | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    loadIndex().then(setData, (e) => setError(String(e)));
  }, []);
  return { data, error };
}

export function useDay(date: string | undefined) {
  const [day, setDay] = useState<DayData | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setDay(null);
    if (!date) return;
    let live = true;
    loadDay(date).then((d) => live && setDay(d), (e) => live && setError(String(e)));
    return () => {
      live = false;
    };
  }, [date]);
  return { day, error };
}
