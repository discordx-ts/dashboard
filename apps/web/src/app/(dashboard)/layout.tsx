import { ProtectedProvider } from "@/components/contexts/protected";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedProvider>
      <>{children}</>
    </ProtectedProvider>
  );
}
