import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/lib/graphql/client";
import { RouterProvider as RRProvider } from "react-router-dom";
import { router } from "@/app/router";

export function AppProviders({ children }: { children?: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <RRProvider router={router} />
    </ApolloProvider>
  );
}
