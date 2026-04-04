/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";
import CheckoutDrawer from "@/components/CheckoutDrawer";

interface CheckoutContextValue {
  openCheckout: () => void;
  closeCheckout: () => void;
  isCheckoutOpen: boolean;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

export const useCheckout = (): CheckoutContextValue => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  return (
    <CheckoutContext.Provider value={{ openCheckout, closeCheckout, isCheckoutOpen }}>
      {children}
      <CheckoutDrawer
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
      />
    </CheckoutContext.Provider>
  );
};
