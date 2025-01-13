// msalConfig.js
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "9f1c28ea-b8d5-41d5-aed7-87db4ccc8c6f", // Replace with your Azure AD app's client ID
    authority: "https://login.microsoftonline.com/1cd5c8a8-ac3d-4882-ae79-e0dc15e8c552", // Replace with your Azure AD tenant ID
    redirectUri: "https://ambitious-sea-01b5b2a03.4.azurestaticapps.net/", // Replace with your app's redirect URI
  },
};

// Export the properly instantiated MSAL client
const msalInstance = new PublicClientApplication(msalConfig);
export default msalInstance;
