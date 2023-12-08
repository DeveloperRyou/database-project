import { getTimer } from "@/lib/api/timer";
import paramsData from "@/lib/params";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ParamsType {
  decayPeriod: number;
  decayRate: number;
  threshold: number;
  viewsWeight: number;
  clicksWeight: number;
}

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
