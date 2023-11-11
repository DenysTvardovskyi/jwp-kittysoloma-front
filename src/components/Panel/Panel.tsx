import React, {useState} from "react";
import {PanelContext} from "./Panel.context";

interface IProps{}

export const Panel: React.FC<IProps> = ({ children }: IProps): JSX.Element => {
    const [opened, setOpened] = useState(false)

    return (
        <PanelContext.Provider value={{opened, setOpened}}>
            {children}
        </PanelContext.Provider>
    )
}
