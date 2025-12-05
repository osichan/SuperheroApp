import { createContext, useState, ReactNode } from "react";
import Snackbar, { SnackbarType } from "@components/Snackbar";
import { useBoolean } from "@hooks/useBoolean";

interface SnackbarContextType {
  showError(message: string): void;
  showWarning(message: string): void;
  showInfo(message: string): void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const visible = useBoolean();
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackbarType>("info");

  const showError = (msg: string) => {
    setMessage(msg);
    setType("error");
    visible.setTrue();
  };

  const showWarning = (msg: string) => {
    setMessage(msg);
    setType("warning");
    visible.setTrue();
  };

  const showInfo = (msg: string) => {
    setMessage(msg);
    setType("info");
    visible.setTrue();
  };

  const handleDismiss = () => {
    visible.setFalse();
  };

  return (
    <SnackbarContext.Provider value={{ showError, showWarning, showInfo }}>
      {children}
      <Snackbar
        visible={visible.value}
        message={message}
        type={type}
        onDismiss={handleDismiss}
      />
    </SnackbarContext.Provider>
  );
};
