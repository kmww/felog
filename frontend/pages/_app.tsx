import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { CoProvider, AppShell } from "@co-design/core";
import type { AppContext, AppProps } from "next/app";
import { Header } from "../components";
import { setContext } from "@apollo/client/link/context";
import nookies from "nookies";
import { User } from "../interfaces";

const httpLink = createHttpLink({
  uri: "http://localhost:1337/graphql",
});

const authLink = setContext((_, { nextContext, headers }) => {
  const { token } = nookies.get(nextContext);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  const header = (
    <AppShell.Header height={70}>
      <Header token={pageProps.token} />
    </AppShell.Header>
  );
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

App.getInitialProps = async (appCtx: AppContext) => {
  const { token } = nookies.get(appCtx.ctx);

  let me: User | null = null;
  if (token) {
    const QUERY = gql`
      query Me {
        me {
          id
          username
          email
        }
      }
    `;

    const { data } = await client.query<{ me: User }>({
      query: QUERY,
      context: {
        nextContext: appCtx.ctx,
      },
    });
    me = data.me;
  }
  return { pageProps: { token, me } };
};
