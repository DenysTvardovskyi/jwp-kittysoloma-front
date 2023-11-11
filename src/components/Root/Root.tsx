import {createContext, FC, Suspense, useState} from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../store";
import { Loader as LoaderProvider } from "../Loader";
import { Router } from "../Router";
import {Panel} from "../Panel/Panel";
import {ApolloProvider} from "@apollo/client";
import {client} from "../ApolloGraphql"

interface IProps {}

export const Root: FC<IProps> = (): JSX.Element => {

  return (
      <Suspense fallback="loading">
          <ApolloProvider client={client}>
              <Provider store={store}>
                  <PersistGate persistor={persistor} loading={null}>
                      <LoaderProvider>
                          <Panel>
                              <Router />
                          </Panel>
                      </LoaderProvider>
                  </PersistGate>
              </Provider>
          </ApolloProvider>
      </Suspense>

  );
};