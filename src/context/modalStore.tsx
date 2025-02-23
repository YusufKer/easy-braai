import { createContext, useState, useContext, useEffect } from "react";

type ModalProviderProps = {
  children: React.ReactNode;
};

type ModalContextType = {
  loginModalOpen: boolean;
  closeLoginModal: () => void;
  openLoginModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: ModalProviderProps) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  function openLoginModal() {
    setLoginModalOpen(true);
  }

  function closeLoginModal() {
    setLoginModalOpen(false);
  }

  useEffect(() => {
    console.log({
      loginModalOpen,
      openLoginModal,
      closeLoginModal,
    });
  }, []);

  return (
    <ModalContext.Provider
      value={{
        loginModalOpen,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModalStore = () => useContext(ModalContext);
