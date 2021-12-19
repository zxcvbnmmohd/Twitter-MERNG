import { ApolloProvider } from "@apollo/client"
import client from "../apollo-client"
import { wrapper } from "../redux/store"

import '../styles/globals.css'

function TwitterMERNG({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default wrapper.withRedux(TwitterMERNG);
