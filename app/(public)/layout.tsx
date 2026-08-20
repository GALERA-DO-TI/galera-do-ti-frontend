import React from "react";

export default function PublicLayout({ children }: React.PropsWithChildren) {
  return <div className="flex min-h-screen w-full flex-col">{children}</div>;
}
