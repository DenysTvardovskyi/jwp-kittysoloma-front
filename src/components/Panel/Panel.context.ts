import React from "react";

export interface IPanelContext {
    opened: boolean;
    setOpened: (value: boolean) => void
}

export const PanelContext = React.createContext<IPanelContext>({
    opened: false,
    setOpened: () => {}
});
