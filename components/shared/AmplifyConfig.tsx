"use client";

import { Amplify } from "aws-amplify";
import { amplifyConfig } from "@/aws-exports";
import { PropsWithChildren } from "react";

Amplify.configure(amplifyConfig);

export default function AmplifyConfig({ children }: PropsWithChildren) {
  return <>{children}</>;
}
