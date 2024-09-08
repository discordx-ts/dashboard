import React from "react";

import { ProtectedProvider } from "@/components/contexts/protected";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedProvider>
      <>{children}</>
    </ProtectedProvider>
  );
}
