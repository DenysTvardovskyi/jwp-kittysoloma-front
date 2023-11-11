import { FC, useEffect } from "react";
import { Landing as LandingLayout } from "../../layouts";
import { useAuthorization, useNotification } from "../../hooks";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { Button, Card, Flex, Form, Input, Upload, UploadProps } from "antd";
import { useTranslation } from "react-i18next";
import { UploadOutlined } from "@mui/icons-material";

interface IProps {
}

export const Profile: FC<IProps> = (): JSX.Element => {
  const { user, isAuthorized } = useAuthorization();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notification = useNotification();

  const props: UploadProps = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        notification.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        notification.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/sign-in");
    }
  }, [ isAuthorized, user ]);


  return (
    <LandingLayout>
      <Flex justify={"center"} align={"center"} style={{ width: "100%", minHeight: "calc(100vh - 64px)" }}>
        <Form
          style={{ width: "50%", minWidth: 300, maxWidth: 600 }}
          initialValues={user}
        >
          <div>
            <Title style={{ marginBottom: 0 }}>{t("account.title")}</Title>
            <Text>{t("account.description")}</Text>
          </div>
          <Card
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px 0",
            }}
          >
            <Upload {...props}>
              <Button
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                icon={<UploadOutlined />}
              >
                Click to upload new avatar
              </Button>
            </Upload>
          </Card>
          <Form.Item name="firstName">
            <Input disabled placeholder={t("account.firstName")} />
          </Form.Item>
          <Form.Item name="lastName">
            <Input disabled placeholder={t("account.lastName")} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: t("signIn.email.validation.email") },
              { required: true, message: t("signIn.email.validation.required") },
            ]}
          >
            <Input disabled placeholder={t("signIn.email.title")} />
          </Form.Item>
        </Form>
      </Flex>

    </LandingLayout>
  );
};
