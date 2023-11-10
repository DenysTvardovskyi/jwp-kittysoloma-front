import React, { FC, useState } from 'react'
import { System as SystemLayout } from "../../layouts";
import { useTranslation } from "react-i18next";
import {mock} from "./mock"
import { Col, Divider, Row } from 'antd'
import { constants } from '../../styles/constants'
import { MapItem } from './components/MapItem'
import { MapContainer, TileLayer } from 'react-leaflet'
import Title from 'antd/es/typography/Title'
import { RestOutlined } from '@ant-design/icons'
interface IProps {}

export const Home: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();

  const groups = [{amenity: "something", items: [mock[0], mock[1], mock[2], mock[3], mock[4], mock[5]]},
      {amenity: "something-else", items: [mock[6], mock[7], mock[8], mock[9], mock[10], mock[11]]}]

  return (
    <SystemLayout>

      <Row>
          <Col span={10}>
              <div style={{ padding: "0 16px", height: "100vh", overflowY: "auto", background: constants.light }}>
                  {groups.map(group =>
                      <>
                          <Title level={4}>
                              <RestOutlined style={{fontSize: 20, marginRight: 8}} />
                              {group.amenity}
                          </Title>
                          <Row gutter={[16, 16]} tabIndex="map-items-list">
                              {group.items.map(item => (
                                  <Col key={item.id} span={12} tabIndex="map-items-list">
                                      <MapItem item={item}/>
                                  </Col>
                              ))
                              }
                          </Row>
                          <Divider/>
                  </>
                  )}
              </div>
          </Col>
          <Col span={14} tabIndex="map">
              <div style={{ height: "100vh", overflowY: "auto", background: constants.light }}>
                  <MapContainer>
                      <TileLayer
                          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      /></MapContainer>
              </div>
          </Col>
      </Row>
    </SystemLayout>
  );
};