import React, { FC } from "react";
import {Content, Header} from "antd/es/layout/layout";
import {constants} from "../../styles/constants";
import {Col, Flex, Layout, Row, Select} from "antd";
import {Link} from "react-router-dom";
import {Logo} from "../../components/Logo";
import Text from "antd/es/typography/Text";
import i18n from "i18next";
import {useAuthorization} from "../../hooks";
import {UserAvatar} from "../../components/UserAvatar";
import {LanguageChange} from "../../components/LanguageChange";

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

export const Landing: FC<IProps> = ({ children }: IProps): JSX.Element => {
    const {user} = useAuthorization()
      return (
          <Layout>
              <Header
                  style={{
                      padding: "0 16px",
                      background: constants.black,
                      position: 'sticky',
                      top: 0,
                      zIndex: 2,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                  }}
              >
                  <Row gutter={[ 16, 16 ]} style={{width: "100%"}}>
                      <Col span={12}>
                          <Flex align="center">
                              <Link to="/">
                                  <Flex align="center">
                                      <Logo/>
                                      <Text style={{color: constants.white, marginLeft: 4, textTransform: "uppercase"}} strong>
                                          соломʼянські
                                          котики
                                      </Text>
                                  </Flex>
                              </Link>
                          </Flex>
                      </Col>
                      <Col span={12}>
                          <Flex align="center" gap={16} justify={"flex-end"} style={{ height: "100%" }}>
                              <LanguageChange/>
                              <UserAvatar user={user}/>
                          </Flex>
                      </Col>
                  </Row>
              </Header>
              <Content style={{height: 'calc(100vh - 64px)'}}>
                  <Flex justify={"center"} align={"center"} style={{width: "100%", height: "100%"}}>
                      {children}
                  </Flex>
              </Content>
          </Layout>
      );
};
