import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./index.css"
import { configureUserManager, userManager } from './UserManagement';
import { AuthProvider } from "react-oidc-context";
import { BrowserRouter } from 'react-router-dom';

const onSigninCallback = (_user: any | void): void => {
  window.history.replaceState(
    {},
    document.title,
    window.location.pathname
  );
  window.location.replace(`${window.location.origin}/user`);
};

configureUserManager();
const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode >
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
