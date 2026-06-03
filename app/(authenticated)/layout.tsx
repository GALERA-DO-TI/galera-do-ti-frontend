"use client";

import { Amplify } from "aws-amplify";
import {
  Authenticator,
  useTheme,
  Image,
  View,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { amplifyConfig } from "@/aws-exports";
import React from "react";

Amplify.configure(amplifyConfig);

export default function AuthenticatedLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <Authenticator.Provider>
      <AuthWrapper>
        <div className="flex flex-col h-screen">
          <header></header>
          {children}
        </div>
      </AuthWrapper>
    </Authenticator.Provider>
  );
}

function AuthWrapper({ children }: React.PropsWithChildren) {
  const authenticatorComponents = {
    SignIn: {
      Header() {
        return (
          <View textAlign="center" paddingTop="pt-8">
            <Image alt="Logo" src="/next.svg" height={100} />
          </View>
        );
      },
    },
  };
  return (
    <Authenticator
      loginMechanisms={["email"]}
      variation="modal"
      components={authenticatorComponents}
    >
      {() => <main>{children}</main>}
    </Authenticator>
  );
}
