import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "68e82f19-f375-4202-a957-eb2fd24966ee",
    authority:
      "https://login.microsoftonline.com/2ebbe8cb-2a6a-4ab7-8602-08bc22914174",
    redirectUri: "http://localhost:3000",
    //Indicates the page to navigate after logout
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    //Set it true if you are having issues onn IE11 o edge
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, conteinsPii) => {
        if (conteinsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["user.read"],
};
