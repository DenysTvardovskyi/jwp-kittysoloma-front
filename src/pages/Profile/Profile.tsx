import React, {FC, useEffect} from "react";
import {Landing as LandingLayout} from "../../layouts";
import {useAuthorization} from "../../hooks";
import {Link, useNavigate} from "react-router-dom";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {Button, Card, Checkbox, Col, Divider, Flex, Form, Input, Row, Upload, UploadProps} from "antd";
import {LockOutlined, MailOutlined, RestOutlined} from "@ant-design/icons";
import {constants} from "../../styles/constants";
import {useTranslation} from "react-i18next";
import {UserAvatar} from "../../components/UserAvatar";
import {UploadOutlined} from "@mui/icons-material";
import {mock} from "../Home/mock";
import {MapItem} from "../Home/components/MapItem";

interface IProps {
}

const props: UploadProps = {
    name: 'file',
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const groups = [
    { amenity: "something", items: [ mock[0], mock[1], mock[2], mock[3], mock[4], mock[5] ] },
    { amenity: "something-else", items: [ mock[6], mock[7], mock[8], mock[9], mock[10], mock[11] ] },
];

export const Profile: FC<IProps> = (): JSX.Element => {
    const {user, isAuthorized} = useAuthorization()
    const {t} = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthorized) {
            navigate("/signIn")
        }
    }, [isAuthorized])

    return (
        <LandingLayout>
            <Row style={{width: "100%"}}>
                <Col span={12}>
                    <Flex vertical justify={"center"} align={"center"} style={{width: "100%", height: "100%"}}>
                        <Form
                            style={{width: "60%"}}
                            initialValues={user}
                        >
                            <div>
                                <Title style={{marginBottom: 0}}>{t("account.title")}</Title>
                                <Text>{t("account.description")}</Text>
                            </div>
                            <Card style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", margin: "10px 0"}} >
                                <Upload {...props}>
                                    <Button style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                                            icon={<UploadOutlined />}>
                                        Click to upload new avatar
                                    </Button>
                                </Upload>
                            </Card>
                            <Form.Item name="name">
                                <Input placeholder={t("account.firstName")}/>
                            </Form.Item>
                            <Form.Item name="lastName">
                                <Input placeholder={t("account.lastName")}/>
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {type: "email", message: t("signIn.email.validation.email")},
                                    {required: true, message: t("signIn.email.validation.required")},
                                ]}
                            >
                                <Input placeholder={t("signIn.email.title")}/>
                            </Form.Item>

                            <Form.Item>
                                <Flex gap="small" align="center" style={{width: "100%"}}>
                                    <Button style={{background: constants.black, width: "100%"}} type="primary" htmlType="submit"
                                            className="login-form-button">
                                        {t("account.save")}
                                    </Button>
                                </Flex>
                            </Form.Item>
                        </Form>
                    </Flex>
                </Col>

                <Col span={12}>
                    <div style={{ padding: "0 16px", maxHeight: 'calc(100vh - 64px)', overflowY: "auto", background: constants.light }}>
                        {groups.map(group =>
                            <>
                                <Title level={4}>
                                    <RestOutlined style={{ fontSize: 20, marginRight: 8 }} />
                                    {group.amenity}
                                </Title>
                                <Row gutter={[ 16, 16 ]} tabIndex="map-items-list">
                                    {group.items.map(item => (
                                        <Col key={item.id} span={12} tabIndex="map-items-list">
                                            <MapItem item={item} />
                                        </Col>
                                    ))
                                    }
                                </Row>
                                <Divider />
                            </>,
                        )}
                    </div>
                </Col>
            </Row>

        </LandingLayout>
    );
};
