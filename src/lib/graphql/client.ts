import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_BFF_GRAPHQL_URL || "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // si el Console ya maneja auth, puede no ser necesario.
  const token = localStorage.getItem("token");
  return { headers: { ...headers, authorization: token ? `Bearer ${token}` : "" } };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
