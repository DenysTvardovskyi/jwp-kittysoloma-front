import {createContext, FC, Suspense, useState} from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../../store";
import { Loader as LoaderProvider } from "../Loader";
import { Router } from "../Router";
import {Panel} from "../Panel/Panel";

interface IProps {}
export const SystemLayoutContext = createContext({});

export const Root: FC<IProps> = (): JSX.Element => {
    const [menuCollapsed, setMenuCollapsed] = useState(false)

  return (
    <Suspense fallback="loading">
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <LoaderProvider>
              <Panel>
                  <Router />
              </Panel>
          </LoaderProvider>
        </PersistGate>
      </Provider>
    </Suspense>
  );
};