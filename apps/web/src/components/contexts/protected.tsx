"use client";

import { APIUser } from "discord-api-types/v10";
import { useRouter } from "next/navigation";
import React from "react";
import { ReactNode, createContext, useContext } from "react";

import Loader from "../molecules/loader";

/*
 * ----------------------------------------------------------------------------------------------------
 * Copyright (c) Infracia Technologies Private Limited. All rights reserved.
 * Licensed under the Proprietary License. See License.txt in the project root for license information.
 * ----------------------------------------------------------------------------------------------------
 */
import { AuthContextType, useAuth } from "./auth";

export interface ProtectedContext extends AuthContextType {
  user: APIUser;
}

const ProtectedContext = createContext<ProtectedContext | undefined>(undefined);

interface ProtectedProviderProps {
  children: ReactNode;
}

const ProtectedProvider = ({ children }: ProtectedProviderProps) => {
  const auth = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (auth.user === null) {
      router.push("/");
    }
  }, [auth.user]);

  if (!auth.user) {
    return <Loader />;
  }

  return (
    <ProtectedContext.Provider value={{ ...auth, user: auth.user }}>
      {children}
    </ProtectedContext.Provider>
  );
};

const useProtected = (): ProtectedContext => {
  const context = useContext(ProtectedContext);

  if (!context) {
    throw new Error("useProtected must be used within an ProtectedProvider");
  }

  return context;
};

export { ProtectedProvider, useProtected };
