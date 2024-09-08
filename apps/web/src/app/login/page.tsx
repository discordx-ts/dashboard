"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { useAuth } from "@/components/contexts/auth";
import Loader from "@/components/molecules/loader";

function View() {
  const params = useSearchParams();
  const router = useRouter();

  const { login } = useAuth();

  React.useEffect(() => {
    const token = params.get("token");
    if (token) {
      login(token);
      router.replace("/manage");
    } else {
      router.replace("/");
    }
  }, []);

  return <Loader />;
}

export default function Page() {
  return (
    <React.Suspense>
      <View />
    </React.Suspense>
  );
}
