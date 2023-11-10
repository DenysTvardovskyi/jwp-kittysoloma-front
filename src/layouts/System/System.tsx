import React, { FC, useEffect, useState } from "react";
// import { Header } from "../../components";
import { useMap } from "react-leaflet";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthorization } from "../../hooks";
import { Avatar, Button, Col, Flex, Layout, Menu, MenuProps, Row, Select } from "antd";
import { constants } from "../../styles/constants";
import { Content, Header } from "antd/es/layout/layout";
import i18n from "i18next";
import { getInitials } from "../../utils/utils";
import { IUser } from "../../models";
import Search from "antd/es/input/Search";


interface IProps {
  children?: React.ReactNode | React.ReactNode[];
  main?: {
    className?: string;
  };
}

const LANGUAGES: any = {
  en: { nativeName: "En" },
  ua: { nativeName: "Ua" },
};

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const System: FC<IProps> = ({ children }: IProps): JSX.Element => {
  const { resetAuthorization } = useAuthorization();
  const [ collapsed, setCollapsed ] = useState(false);
  const [ hasBreakPoint, setBreakPoint ] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const user: IUser = {
    id: 1,
    email: "example@example.com",
    createdAt: "2023-11-10T08:00:00",
    updatedAt: "2023-11-10T08:30:00",
    name: "John",
    lastName: "Doe",
    region: {
      name: "North",
    },
    role: "Admin",
  };

  // const langOptions: { value: string, label: string }[] = Object.keys(LANGUAGES)
  //     .map((lng) => ({ value: lng, label: LANGUAGES[lng].nativeName }));

  // const handleChange = (value: string) => {
  //   i18n.changeLanguage(value);
  // };

  return (
    <Layout>
      <Header
        style={{
          padding: "0 16px",
          background: constants.black,
        }}
      >
        <Row gutter={[ 16, 16 ]}>
          <Col span={4}>
            <Flex align="center">
              <Link to="/">
                соломʼянські
                котики
              </Link>
            </Flex>
          </Col>
          <Col span={16}>
            <Flex align="center" style={{ height: "100%" }}>
              <Search
                styles={{ height: "100%" }}
                placeholder="input search text"
                allowClear
                enterButton="Search"
                // onSearch={onSearch}
              />
            </Flex>
          </Col>
          <Col span={4}>
            <Flex align="center" gap={16} justify={"flex-end"} style={{ height: "100%" }}>
              <Select
                defaultValue={i18n.resolvedLanguage}
                style={{ width: 60 }}
                // onChange={handleChange}
                // options={langOptions}
              />
              <Avatar
                size={32}
                style={{ cursor: "pointer", fontSize: 16 }}
                onClick={() => navigate("/profile")}
              >{getInitials(user)}</Avatar>
            </Flex>
          </Col>
        </Row>
      </Header>
      <Layout style={{ maxHeight: "100vh" }}>
        {children}
      </Layout>
    </Layout>
  );
};
