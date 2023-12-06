import { useAuth } from "@/hooks/useAuth";
import Container from "./container";

const Alert = () => {
  const { auth } = useAuth();
  return (
    <div className="border-b fixed top-0 w-full bg-neutral-200 border-neutral-300 z-[9999]">
      <Container>
        <div className="flex justify-between">
          <div className="py-2 text-center text-sm">{auth?.name}</div>
          <div className="py-2 text-center text-sm">감쇄율</div>
        </div>
      </Container>
    </div>
  );
};

export default Alert;
