import { FC } from "react";
import { Link } from "react-router-dom";
import { useApi, useAuthorization } from "../../hooks";
import { System as SystemLayout } from "../../layouts";
import {Button, Checkbox, Flex, Form, Input} from "antd";
import Title from "antd/es/typography/Title";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {AuthLayout} from "../../layouts/AuthLayout";
import {Logo} from "../../components/Logo";
import {constants} from "../../styles/constants";

interface IProps {}

export const SignUp: FC<IProps> = (): JSX.Element => {
  const api = useApi();
  const { t } = useTranslation();
  const { isAuthorized } = useAuthorization();

  const onFinish = (values: any) => {
    api.authorization.signUp({
      firstName: values.firstName,
      lastName:  values.lastName,
      password: values.password,
      email: values.email,
      loader: t("loader.loader.title"),
    }).then(() => {
      console.log("sign up");
    });
  };

  return !isAuthorized ? (
  // return isAuthorized ? (
    <AuthLayout>
      <Flex vertical align={"center"} justify="center" style={{height: "100vh"}} gap={14}>
      <Logo width={200} height={200}/>
      <Title level={3}>{t("header.navigation.signUp")}</Title>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
              name="firstName"
              rules={[ { required: true, message: t("signUp.firstName.validation.required"), whitespace: true } ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t("signUp.firstName.title")} />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[ { required: true, message: t("signUp.lastName.validation.required"), whitespace: true } ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t("signUp.lastName.title")} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: t("signUp.email.validation.email") },
              { required: true, message: t("signUp.email.validation.required") },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder={t("signUp.email.title")} />
          </Form.Item>
          <Form.Item
            name="password"
            hasFeedback
            rules={[ { required: true, message: t("signUp.password.validation.required") } ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder={t("signUp.password.title")}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={[ "password" ]}
            hasFeedback
            rules={[
              { required: true, message: t("signUp.confirm.validation.noMatch") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t("signUp.confirm.validation.noMatch")));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder={t("signUp.confirm.title")}
            />
          </Form.Item>

          <Form.Item>
            <Button style={{width: "100%", background: constants.black}} type="primary" htmlType="submit">
              {t("signUp.navigation.register")}
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </AuthLayout>
  ) : (
    <AuthLayout>
      <Flex vertical align={"center"} justify="center" style={{height: "100vh"}} gap={14}>
        <Title>{t("signUp.authorized.title")}</Title>
        <Button style={{background: constants.black, color: constants.white}}>
          <Link to="/">{t("signUp.authorized.goHome")}</Link>
        </Button>
      </Flex>
    </AuthLayout>
  );
};
