"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import React from "react";

export default function PublicLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex flex-col h-screen">
      <header></header>
      {children}
    </div>
  );
}
