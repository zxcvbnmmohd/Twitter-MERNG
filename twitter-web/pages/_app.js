import { ApolloProvider } from "@apollo/client"
import client from "../apollo-client"

import '../styles/globals.css'

function TwitterMERNG({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default TwitterMERNG
