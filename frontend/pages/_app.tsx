import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { CoProvider } from "@co-design/core";
import { AppShell } from "@co-design/core";
import type { AppProps } from "next/app";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  const header = <AppShell.Header height={70}>Header</AppShell.Header>;
  return (
    <ApolloProvider client={client}>
      <CoProvider withNormalizeCSS withGlobalStyles>
        <AppShell fixed header={header}>
          <Component {...pageProps} />
        </AppShell>
      </CoProvider>
    </ApolloProvider>
  );
}
