
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "@/app/globals.css";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="fr">
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
};

export default RootLayout;
