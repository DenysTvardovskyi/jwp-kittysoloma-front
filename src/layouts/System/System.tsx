import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAuthorization } from "../../hooks";
import { Col, Flex, Layout, Row } from "antd";
import { constants } from "../../styles/constants";
import { Header } from "antd/es/layout/layout";
import Text from "antd/es/typography/Text";
import { Logo } from "../../components/Logo";
import { UserAvatar } from "../../components/UserAvatar";
import { LanguageChange } from "../../components/LanguageChange";
import { LoginOutlined, MenuOutlined } from "@mui/icons-material";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import { usePanel } from "../../hooks/usePanel";

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
  main?: {
    className?: string;
  };
}

export const System: FC<IProps> = ({ children }: IProps): JSX.Element => {
  const { setOpened } = usePanel();

  const hasBreakpoint = useBreakpoint().lg;
  const { user, isAuthorized } = useAuthorization();

  return (
    <Layout>
      <Header
        style={{
          padding: "0 16px",
          background: constants.black,
          position: "sticky",
          top: 0,
          zIndex: 2,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Row gutter={[ 16, 16 ]} style={{ width: "100%" }}>
          <Col span={12}>
            <Flex align="center">
              {!hasBreakpoint &&
                <MenuOutlined
                  style={{ color: constants.white, marginRight: 14, fontSize: 30 }}
                  //@ts-ignore
                  onClick={() => setOpened((prev: any) => !prev)}
                />
              }
              <Link to="/">
                <Flex align="center">
                  <Logo />
                  {hasBreakpoint && <Text
                    style={{ color: constants.white, marginLeft: 4, textTransform: "uppercase" }}
                    strong
                  >
                    соломʼянські
                    котики
                  </Text>}

                </Flex>
              </Link>
            </Flex>
          </Col>
          <Col span={12}>
            <Flex align="center" gap={16} justify={"flex-end"} style={{ height: "100%" }}>
              <LanguageChange />
              {isAuthorized
                ? <UserAvatar user={user} />
                : <Link style={{ display: "flex", alignItems: "center" }} to={"sign-in"}>
                  <LoginOutlined style={{ color: constants.white }} /></Link>
              }
            </Flex>
          </Col>
        </Row>
      </Header>
      <Layout style={{ maxHeight: "100vh", overflowY: "auto", height: "100%" }}>
        {children}
      </Layout>
    </Layout>
  );
};
