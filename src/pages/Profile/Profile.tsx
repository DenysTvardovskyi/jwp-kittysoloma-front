import React, {FC} from "react";
import {Landing as LandingLayout} from "../../layouts";
import {useAuthorization} from "../../hooks";
import {Link, useNavigate} from "react-router-dom";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {Button, Card, Checkbox, Col, Divider, Flex, Form, Input, Row, Upload, UploadProps} from "antd";
import {RestOutlined} from "@ant-design/icons";
import {constants} from "../../styles/constants";
import {useTranslation} from "react-i18next";
import {UploadOutlined} from "@mui/icons-material";
import {mock} from "../Home/mock";
import {MapItem} from "../Home/components/MapItem";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

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
    {amenity: "something", items: [mock[0], mock[1], mock[2], mock[3], mock[4], mock[5]]},
    {amenity: "something-else", items: [mock[6], mock[7], mock[8], mock[9], mock[10], mock[11]]},
];

interface IProps {
}

export const Profile: FC<IProps> = (): JSX.Element => {
    const {user, isAuthorized} = useAuthorization()
    const {t} = useTranslation()
    const navigate = useNavigate()
    const hasBreakpoint = useBreakpoint().lg

    // useEffect(() => {
    //     if (!isAuthorized) {
    //         navigate("/sign-in")
    //     }
    // }, [isAuthorized, user])

    const size = !hasBreakpoint ? 24 : 12

    return (
        <LandingLayout>
            <Flex vertical align={"center"} style={{width: "100%"}}>
                <Form
                    style={{width: "50%", minWidth: 300, maxWidth: 600}}
                    initialValues={user}
                >
                    <div>
                        <Title style={{marginBottom: 0}}>{t("account.title")}</Title>
                        <Text>{t("account.description")}</Text>
                    </div>
                    <Card style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "10px 0"
                    }}>
                        <Upload {...props}>
                            <Button style={{display: "flex", justifyContent: "center", alignItems: "center"}}
                                    icon={<UploadOutlined/>}>
                                Click to upload new avatar
                            </Button>
                        </Upload>
                    </Card>
                    <Form.Item name="firstName">
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
                            <Button style={{background: constants.black, width: "100%"}} type="primary"
                                    htmlType="submit"
                                    className="login-form-button">
                                {t("account.save")}
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
                <Title>{t("account.favorites")}</Title>
                <div style={{
                    padding: "0 16px",
                    background: constants.light
                }}>
                    {groups.map(group =>
                        <>
                            <Title level={4}>
                                <RestOutlined style={{fontSize: 20, marginRight: 8}}/>
                                {group.amenity}
                            </Title>
                            <Row gutter={[16, 16]} tabIndex="map-items-list">
                                {group.items.map(item => (
                                    <Col key={item.id} span={size} tabIndex="map-items-list">
                                        <MapItem item={item}/>
                                    </Col>
                                ))
                                }
                            </Row>
                            <Divider/>
                        </>,
                    )}
                </div>
            </Flex>

        </LandingLayout>
    );
};
