import { AppProps } from "next/app";
import "../styles/index.css";
import Modal from "react-modal";
import SigninModal from "@/components/modal/signin-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { checkSignin } from "@/lib/api/users";

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
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    checkSignin()
      .then((res) => {
        if (res.status === 200) {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      })
      .catch((err) => {
        setIsOpen(true);
      });
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
      <Modal isOpen={isOpen} id="modal" style={customStyles}>
        <SigninModal onClose={onClose} />
      </Modal>
    </>
  );
}
