import Container from "./container";

const Alert = () => {
  return (
    <div className="border-b fixed top-0 w-full bg-neutral-200 border-neutral-300">
      <Container>
        <div className="py-2 text-center text-sm">감쇄율</div>
      </Container>
    </div>
  );
};

export default Alert;
