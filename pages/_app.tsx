import { AppProps } from "next/app";
import "../styles/index.css";
import Modal from "react-modal";
import SigninModal from "@/components/modal/signin-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    minWidth: "300px",
    minHeight: "300px",
    width: "50%",
    height: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Modal isOpen={true} id="modal" style={customStyles}>
        <SigninModal />
      </Modal>
    </>
  );
}
