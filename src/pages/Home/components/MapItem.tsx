import { FC } from "react";
import { Card, Space, Tag } from "antd";
import Title from "antd/es/typography/Title";
import AccessibleIcon from "@mui/icons-material/Accessible";
import PlaceIcon from "@mui/icons-material/Place";

interface IProps {
  item: any;
}

export const MapItem: FC<IProps> = ({ item }: any): JSX.Element => {
  const tags = Object.keys(item.tags);

  const wheelchairFriendly = item?.barrierFree === null && <AccessibleIcon />;

  const name = item.tags.find((tag: any) => tag.name === "name" || tag.name === "name:uk");

  return (
    <Card
      tabIndex={item.id}
      actions={[
        <PlaceIcon />,
      ]}
      onClick={() => console.log(`navigate to ${item.lon}, ${item.lat}`)}
      style={{ cursor: "pointer", width: "100%" }}
    >
      <Title style={{ marginTop: 0 }} level={5}>
        {wheelchairFriendly}
        {name.value}</Title>
      <Space size={[ 0, 8 ]} wrap>
        {tags.map(tag => <Tag>{tag}</Tag>)}
      </Space>
    </Card>
  );
};