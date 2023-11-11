import React, {createContext, FC, useContext, useState} from "react";
import {Flex, Layout} from "antd";
import {constants} from "../../styles/constants";
import {Header} from "antd/es/layout/layout";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {LanguageChange} from "../../components/LanguageChange";

interface IProps {
    children?: React.ReactNode | React.ReactNode[];
}

export const AuthLayout: FC<IProps> = ({children}: IProps): JSX.Element => {
    const {t} = useTranslation();

    return (

        <Layout>
            <Header style={{background: constants.black}} tabIndex="1">
                <Flex justify={"space-between"} align={"center"}>
                    <Link tabIndex="2" to="/" style={{color: constants.white}}>{t("header.navigation.backHome")}</Link>
                    <LanguageChange/>
                </Flex>
            </Header>
            <Layout style={{height: "100vh", backgroundColor: constants.light}}>
                {children}
            </Layout>
        </Layout>
    );
};
