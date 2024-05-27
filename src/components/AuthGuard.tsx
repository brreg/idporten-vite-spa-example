import { FC, ReactElement, useEffect, useState } from 'react';
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';

export const AuthGuard: FC<{children: ReactElement[] | ReactElement}> = ({ children }) => {
  const auth = useAuth();

  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    if (!hasAuthParams() &&
        !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading &&
        !hasTriedSignin
    ) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth.isAuthenticated, auth.activeNavigator, auth.isLoading, auth.signinRedirect, hasTriedSignin]);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.isLoading && !auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
