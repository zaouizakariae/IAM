import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "9f1c28ea-b8d5-41d5-aed7-87db4ccc8c6f", // Replace with your Azure AD app's client ID
    authority: "https://login.microsoftonline.com/1cd5c8a8-ac3d-4882-ae79-e0dc15e8c552", // Replace with your Azure AD tenant ID
    redirectUri: "https://ambitious-sea-01b5b2a03.4.azurestaticapps.net/", // Replace with your app's redirect URI
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginAndGetToken = async () => {
  try {
    const loginResponse = await msalInstance.loginPopup({
      scopes: ["User.ReadWrite"], // Request delegated permissions
    });
    return loginResponse.accessToken;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
