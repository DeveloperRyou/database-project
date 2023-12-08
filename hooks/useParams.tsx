import { getTimer } from "@/lib/api/timer";
import data from "@/parameters.json" assert { type: "json" };
import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ParamsType {
  decayPeriod: number;
  decayRate: number;
  threshold: number;
  viewsWeight: number;
  clicksWeight: number;
}

const paramsData: ParamsType = {
  decayPeriod: parseFloat(data.decayPeriod),
  decayRate: parseFloat(data.decayRate),
  threshold: parseFloat(data.threshold),
  viewsWeight: parseFloat(data.viewsWeight),
  clicksWeight: parseFloat(data.clicksWeight),
};

const paramsAtom = atom<ParamsType>(paramsData);
const remainingTimeAtom = atom<number>(0);

interface UseParamsType {
  params: ParamsType;
  remainingTime: number;
}

function useParams(): UseParamsType {
  const [params] = useAtom(paramsAtom);
  const [remainingTime, setRemainingTime] = useAtom(remainingTimeAtom);
  useEffect(() => {
    const timer = setInterval(() => {
      getTimer()
        .then((res) => {
          if (res.timer <= 0) {
            toast.info("감쇄가 진행되었습니다.");
          }
          setRemainingTime(res.timer);
        })
        .catch((err) => {});
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return { params, remainingTime };
}

export { useParams };
