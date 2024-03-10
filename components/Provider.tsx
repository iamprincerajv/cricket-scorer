"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "./ui/sonner";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface ProviderProps extends ThemeProviderProps {}

export function Provider({ children, ...props }: ProviderProps) {
  const theme = useTheme();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });

  const [queryClientState] = useState(() => queryClient);

  const pathName = usePathname();

  return (
    <QueryClientProvider client={queryClientState}>
      <NextThemesProvider {...props}>
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          theme={theme.theme as "light" | "dark" | "system"}
        />
      </NextThemesProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}