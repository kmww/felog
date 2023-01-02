import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { CoProvider } from "@co-design/core";
import type { AppProps } from "next/app";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CoProvider withNormalizeCSS withGlobalStyles>
        <Component {...pageProps} />
      </CoProvider>
    </ApolloProvider>
  );
}
