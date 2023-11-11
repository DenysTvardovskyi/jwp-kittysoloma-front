import { useMemo } from "react";
import { useHTTP } from "./useHTTP";
import { useAuthorization } from "./useAuthorization";
import { AxiosRequestHeaders } from "axios";
import { IUser } from "../models";

const API_URL: string = import.meta.env.VITE_BASE_URL!;

interface IApiConfig {
  loader?: boolean | string;
  debug?: boolean;
}

interface IApiAuthorizationSignUpConfig extends IApiConfig {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface IApiAuthorizationSignInConfig extends IApiConfig {
  email: string;
  password: string;
}

interface IApiAuthorizationSignOutConfig extends IApiConfig {}

interface IApiAccountGetConfig extends IApiConfig {}

export interface IUseApi {
  authorization: {
    signUp: (config: IApiAuthorizationSignUpConfig) => Promise<void>;
    signIn: (config: IApiAuthorizationSignInConfig) => Promise<{ accessToken: string, user: IUser }>;
    signOut: (config: IApiAuthorizationSignOutConfig) => Promise<void>;
  };
  account: {
    get: (config: IApiAccountGetConfig) => Promise<IUser>;
  };
}

type TUseApi = () => IUseApi;

export const useApi: TUseApi = (): IUseApi => {
  const http = useHTTP();
  const { isAuthorized, accessToken } = useAuthorization();

  const headers: AxiosRequestHeaders = useMemo<AxiosRequestHeaders>(() => {
    const _headers: any = {};

    if (isAuthorized) {
      _headers["Authorization"] = `Bearer ${accessToken}`;
    }

    _headers["Access-Control-Allow-Origin"] = "*";
    _headers["Content-Type"] = "application/json";

    return _headers;
  }, [ isAuthorized, accessToken ]);

  return {
    authorization: {
      signUp: ({ email, lastName, firstName, debug, password, loader }) => {
        const body = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
        };
        return http.request<void>({
          method: "POST",
          url: `${API_URL}/users/register`,
          headers,
          data: body,
          debug,
          loader: !!loader ? loader : "Processing sign up...",
        });
      },

      signIn: ({ loader, password, email }) => {
        return http.request<{ accessToken: string, user: IUser }>({
          method: "POST",
          url: `${API_URL}/users/login`,
          headers,
          data: {
            password,
            email,
          },
          loader: !!loader ? loader : false,
        })
      },
      signOut: ({ loader }) => {
        return http.request<void>({
          method: "POST",
          url: `${API_URL}/account/logout`,
          headers,
          loader: !!loader ? loader : "Processing sign out...",
        });

      },
    },
    account: {
      get: ({ loader }) => {
        return http.request<IUser>({
          method: "GET",
          url: `${API_URL}/account`,
          headers,
          loader: !!loader ? loader : "Loading users...",
        });
      },
    },
  };
};
