import { FC } from "react";
import { System as SystemLayout } from "../../layouts";
import { useApi, useAuthorization } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Flex, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import {AuthLayout} from "../../layouts/AuthLayout";
import {Logo} from "../../components/Logo";
import Title from "antd/es/typography/Title";
import {constants} from "../../styles/constants";

interface IProps {}

export const SignIn: FC<IProps> = (): JSX.Element => {
  const api = useApi();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isAuthorized, setAuthorization } = useAuthorization();

  const onFinish = (values: any) => {
    api.authorization.signIn({ email: values.email, password: values.password, loader: t("signIn.loader.title") })
      .then(({ accessToken, user }) => {
        setAuthorization(accessToken, user);
        navigate("/");
      });
  };

  return !isAuthorized ? (
    <AuthLayout>
        <Flex vertical align={"center"} justify="center" style={{height: "100vh"}} gap={14}>
            <Logo width={200} height={200}/>
            <Title level={3}>{t("header.navigation.signIn")}</Title>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { type: "email", message: t("signIn.email.validation.email") },
                        { required: true, message: t("signIn.email.validation.required") },
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={t("signIn.email.title")} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[ { required: true, message: t("signIn.password.validation.required") } ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={t("signIn.password.title")}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>{t("signIn.remember.title")}</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Flex gap="small" align="center">
                        <Button style={{background: constants.black}} type="primary" htmlType="submit" className="login-form-button">
                            {t("signIn.navigation.logIn")}
                        </Button>
                        <Link style={{color: constants.black}} to="/sign-up">{t("signIn.navigation.register")}</Link>
                    </Flex>
                </Form.Item>
            </Form>
        </Flex>
    </AuthLayout>
  ) : (
    <SystemLayout main={{ className: "d-flex justify-content-center" }}>
      <Title>{t("signIn.authorized.title")}</Title>
      <Link to="/">{t("signIn.authorized.goHome")}</Link>
    </SystemLayout>
  );
};
