import { ReactNode, useEffect } from "react";
import { AppState } from "react-native";
import { focusManager, QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./queryClient";

type Props = {
  children: ReactNode;
};

export function ReactQueryProvider({ children }: Props) {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) => {
      focusManager.setFocused(status === "active");
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
