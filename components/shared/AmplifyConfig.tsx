"use client";

import { Amplify } from "aws-amplify";
import { amplifyConfig } from "@/aws-exports";

Amplify.configure(amplifyConfig);

export default function AmplifyConfig() {
  return null;
}
