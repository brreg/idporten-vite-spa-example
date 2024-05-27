import { UserManager } from 'oidc-client-ts';

export let userManager: UserManager;

export const configureUserManager = () => {
  userManager = new UserManager({
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_IDPORTEN_REDIRECT_URI,
    post_logout_redirect_uri: import.meta.env.VITE_IDPORTEN_LOGOUT_REDIRECT_URI,
    scope: 'openid profile',
    response_type: 'code',
    ui_locales: 'nb',
    acr_values: import.meta.env.VITE_IDPORTEN_ACR_VALUES,
    authority: import.meta.env.VITE_IDPORTEN_AUTHORITY,
    automaticSilentRenew: true,
    includeIdTokenInSilentRenew: true
  });

  userManager.events.addUserSignedOut(() => {
    userManager.signoutRedirect();
  });

  userManager.events.addSilentRenewError(() => {
    userManager.signoutRedirect();
  });
};
