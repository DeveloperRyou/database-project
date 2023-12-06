import { AppProps } from "next/app";
import "../styles/index.css";
import Modal from "react-modal";
import SigninModal from "@/components/modal/signin-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { AbstractUser, checkSignin } from "@/lib/api/users";
import { useAuth } from "@/hooks/useAuth";
import { jwtDecode } from "jwt-decode";

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
  const { setAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    checkSignin()
      .then((res) => {
        setIsOpen(false);
        const accessToken = localStorage.getItem("accessToken");
        const user = jwtDecode<AbstractUser>(accessToken);
        setAuth(user);
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
