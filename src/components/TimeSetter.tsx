import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react"

export default function TimeSetter({ setNow }: { setNow: (dayjs: Dayjs) => void }) {

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, 1000); // 매 초마다 현재 시간을 업데이트

    return () => clearInterval(timer); // 컴포넌트가 언마운트되면 타이머를 해제
  }, [setNow]);

  return null;
}
