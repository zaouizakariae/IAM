import { Client } from "@microsoft/microsoft-graph-client";
import { PublicClientApplication } from "@azure/msal-browser";

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: "AZURE_CLIENT_ID",
    authority: "https://login.microsoftonline.com/1cd5c8a8-ac3d-4882-ae79-e0dc15e8c552",
    redirectUri: "https://ambitious-sea-01b5b2a03.4.azurestaticapps.net/", // Update with your redirect URI
  },
};

// Initialize MSAL
const msalInstance = new PublicClientApplication(msalConfig);

// Auth Provider for Graph API
const authProvider = {
  getAccessToken: async () => {
    const account = msalInstance.getAllAccounts()[0];
    if (!account) {
      await msalInstance.loginPopup({ scopes: ["Group.Read.All", "GroupMember.Read.All", "User.Read.All"] });
    }

    const response = await msalInstance.acquireTokenSilent({
      account: msalInstance.getAllAccounts()[0],
      scopes: ["Group.Read.All", "GroupMember.Read.All", "User.Read.All"],
    });

    return response.accessToken;
  },
};

// Initialize Microsoft Graph Client
const graphClient = Client.init({
  authProvider: {
    getAccessToken: authProvider.getAccessToken,
  },
});

// Fetch User Profile
async function fetchUserProfile() {
  try {
    const user = await graphClient.api("/me").get();
    console.log("User Profile:", user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
}

// Fetch User Groups
async function fetchUserGroups() {
  try {
    const groups = await graphClient.api("/me/memberOf").get();
    console.log("User Groups:", groups.value);
  } catch (error) {
    console.error("Error fetching user groups:", error);
  }
}

// Call the functions
fetchUserProfile();
fetchUserGroups();