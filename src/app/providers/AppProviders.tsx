import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/lib/graphql/client";
import { RouterProvider as RRProvider } from "react-router-dom";
import { router } from "@/app/router";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/app/store";

export function AppProviders() {
  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <RRProvider router={router} />
      </ApolloProvider>
    </ReduxProvider>
  );
}
