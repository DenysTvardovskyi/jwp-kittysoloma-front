import React, { FC } from "react";
import { Content, Header } from "antd/es/layout/layout";
import { constants } from "../../styles/constants";
import { Button, Col, Flex, Layout, Row } from "antd";
import { Link } from "react-router-dom";
import { Logo } from "../../components/Logo";
import Text from "antd/es/typography/Text";
import { useAuthorization } from "../../hooks";
import { UserAvatar } from "../../components/UserAvatar";
import { LanguageChange } from "../../components/LanguageChange";
import { LogoutOutlined } from "@mui/icons-material";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const Landing: FC<IProps> = ({ children }: IProps): JSX.Element => {
  const { user, resetAuthorization } = useAuthorization();
  const hasBreakpoint = useBreakpoint().lg;

  return (
    <Layout style={{ background: constants.light }}>
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
          <Col span={hasBreakpoint ? 12 : 6}>
            <Flex align="center">
              <Link to="/">
                <Flex align="center">
                  <Logo />
                  {hasBreakpoint &&
                    <Text style={{ color: constants.white, marginLeft: 4, textTransform: "uppercase" }} strong>
                      соломʼянські
                      котики
                    </Text>
                  }

                </Flex>
              </Link>
            </Flex>
          </Col>
          <Col span={hasBreakpoint ? 12 : 18}>
            <Flex align="center" gap={16} justify={"flex-end"} style={{ height: "100%" }}>
              <LanguageChange />
              <UserAvatar user={user} />
              <Button onClick={() => resetAuthorization()}><LogoutOutlined /></Button>
            </Flex>
          </Col>
        </Row>
      </Header>
      <Content style={{ minHeight: hasBreakpoint ? "calc(100vh - 64px)" : "auto" }}>
        <Flex justify={"center"} align={"center"} style={{ width: "100%", height: "100%" }}>
          {children}
        </Flex>
      </Content>
    </Layout>
  );
};
