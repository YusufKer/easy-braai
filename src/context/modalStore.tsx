import { createContext, useState, useContext, useEffect } from "react";

type ModalProviderProps = {
  children: React.ReactNode;
};

type ModalContextType = {
  loginModalOpen: boolean;
  closeLoginModal: () => void;
  openLoginModal: () => void;
  signupModalOpen: boolean;
  openSignupModal: () => void;
  closeSignupModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: ModalProviderProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  function openLoginModal() {
    setLoginModalOpen(true);
  }

  function closeLoginModal() {
    setLoginModalOpen(false);
  }

  function openSignupModal() {
    setSignupModalOpen(true);
  }

  function closeSignupModal() {
    setSignupModalOpen(false);
  }

  useEffect(() => {
    console.log({
      loginModalOpen,
      openLoginModal,
      closeLoginModal,
      signupModalOpen,
      openSignupModal,
      closeSignupModal,
    });
  }, []);

  return (
    <ModalContext.Provider
      value={{
        loginModalOpen,
        openLoginModal,
        closeLoginModal,
        signupModalOpen,
        openSignupModal,
        closeSignupModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModalStore = () => useContext(ModalContext);
