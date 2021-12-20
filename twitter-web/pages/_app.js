import { AuthProvider, AuthGuard } from "../components/auth";
import { wrapper } from "../redux/store";

import "../styles/globals.css";

function TwitterMERNG({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* if requireAuth property is present - protect the page */}
      {Component.requireAuth ? (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      ) : (
        // public page
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}

export default wrapper.withRedux(TwitterMERNG);
