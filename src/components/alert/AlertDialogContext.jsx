// AlertDialogContext.js
import { createContext, useContext, useState, useCallback } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AlertDialogContext = createContext();

export const useAlertDialog = () => useContext(AlertDialogContext);

const AlertDialogService = ({ message, onConfirm, onClose }) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={true} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmação</AlertDialogTitle>
          <AlertDialogDescription>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const AlertDialogProvider = ({ children }) => {
  const [alert, setAlert] = useState({ isOpen: false, message: '', onConfirm: null });

  const showAlert = useCallback((message, onConfirm) => {
    setAlert({ isOpen: true, message, onConfirm });
  }, []);

  const closeAlert = useCallback(() => {
    setAlert({ isOpen: false, message: '', onConfirm: null });
  }, []);

  return (
    <AlertDialogContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      {alert.isOpen && <AlertDialogService message={alert.message} onConfirm={alert.onConfirm} onClose={closeAlert} />}
    </AlertDialogContext.Provider>
  );
};
