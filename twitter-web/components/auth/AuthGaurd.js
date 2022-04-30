import { useAuth } from "./AuthProvider";
import { useRouter } from "next/router";
import React, { useEffect, createElement } from "react";

export function AuthGuard({ children }) {
    const { user, initializing, setRedirect } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
        if (!initializing) {
            //auth is initialized and there is no user
            if (!user) {
                console.log("AuthGaurd - Page Access Denited...")
                // remember the page that user tried to access
                setRedirect(router.route);
                router.push("/");
            }
        }
    }, [initializing, router, user, setRedirect]);
    /* show loading indicator while the auth provider is still initializing */
    if (initializing) {
        console.log("AuthGaurd - Application Loading...")
        return createElement("h1", null, "Application Loading");
    }
    // if auth initialized with a valid user show protected page
    if (!initializing && user) {
        console.log("AuthGaurd - Page Allowed")
        return createElement(React.Fragment, null, children);
    }
    /* otherwise don't return anything, will do a redirect from useEffect */
    return null;
}
