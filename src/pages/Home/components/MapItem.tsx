import { FC } from "react";
import { Card, Flex, Tag } from "antd";
import Title from "antd/es/typography/Title";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PlaceIcon from "@mui/icons-material/Place";
import {FieldTimeOutlined} from "@ant-design/icons";

interface IProps {
  item: any;
}

export const MapItem: FC<IProps> = ({item}: any): JSX.Element => {

    const name = item.tags.find(tag => tag.name === "name" || tag.name === "name:uk" || tag.name === "name:en")
    const tagsForShow = item.tags.filter(tag =>
        tag.name !== "name"
        && tag.name !== "name:uk"
        && tag.name !== "name:en"
        && tag.name !== "name:ru"
        && tag.name !== "opening_hours"
        && tag.name !== "wheelchair"
    )
    const time = item.tags.find(tag => tag.name === "opening_hours")
    const accessible = item.tags.find(tag => tag.name === "wheelchair")?.value === "yes"

    const wheelchairFriendly = accessible && <AccessibleIcon/>

  return (
    <Card
      tabIndex={item.id}
      actions={[
        <PlaceIcon />,
      ]}
      onClick={() => console.log(`navigate to ${item.lon}, ${item.lat}`)}
      style={{ cursor: "pointer", width: "100%" }}
    >
      <Title style={{ margin: 0 }} level={3}>{wheelchairFriendly} {name.value}</Title>
            <Title level={5} style={{marginTop: 4, fontWeight: "normal"}}>
        {time && <><FieldTimeOutlined /> {time.value}</>  }

            </Title>

            <Flex gap={5} wrap={"wrap"}>
        {tagsForShow.map(tag => <Tag >{tag.value}</Tag>)}
      </Flex>
    </Card>
  );
};