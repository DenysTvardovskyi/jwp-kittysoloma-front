import {IPanelContext, PanelContext} from "../components/Panel/Panel.context";
import {useContext} from "react";

export const usePanel = (): IPanelContext => {
    const { opened, setOpened } = useContext<IPanelContext>(PanelContext);

    return { opened, setOpened };
};