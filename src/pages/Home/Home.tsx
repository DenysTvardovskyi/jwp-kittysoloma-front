import React, { FC, useEffect, useState } from "react";
import { System as SystemLayout } from "../../layouts";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";
import { mock } from "./mock";
import { Col, Divider, Row } from "antd";
import { constants } from "../../styles/constants";
import { MapItem } from "./components/MapItem";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Title from "antd/es/typography/Title";
import { RestOutlined } from "@ant-design/icons";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import L from "leaflet";

interface IProps {}

export const Home: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();

  const groups = [
    { amenity: "something", items: [ mock[0], mock[1], mock[2], mock[3], mock[4], mock[5] ] },
    { amenity: "something-else", items: [ mock[6], mock[7], mock[8], mock[9], mock[10], mock[11] ] },
  ];

  return (
    <SystemLayout>
      <Row>
        <Col span={6}>
          <div style={{ padding: "0 16px", maxHeight: 'calc(100vh - 64px)', overflowY: "auto", background: constants.light }}>
            {groups.map(group =>
              <>
                <Title level={4}>
                  <RestOutlined style={{ fontSize: 20, marginRight: 8 }} />
                  {group.amenity}
                </Title>
                <Row gutter={[ 16, 16 ]} tabIndex="map-items-list">
                  {group.items.map(item => (
                    <Col key={item.id} span={24} tabIndex="map-items-list">
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
        <Col span={18} tabIndex="map">
          <div style={{ height: 'calc(100vh - 64px)', overflowY: "auto", background: constants.light }}>
            <MapContainer
              center={[ 50.45, 30.52 ]}
              // maxBounds={[ [ 50.156534, 31.138470 ], [ 50.959162, 29.471295 ] ]}
              minZoom={12}
              maxZoom={18}
              zoom={16}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Routing/>
              <LocationMarker />
            </MapContainer>
          </div>
        </Col>
      </Row>
    </SystemLayout>
  );
};

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

const Routing = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }

    const routingControl = L.Routing.control({
      waypoints: [ L.latLng(50.452044, 30.515650), L.latLng(50.467651, 30.609239) ],
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim()
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [ map ]);

  return null;
};

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        You are here. <br />
        Map bbox: <br />
        <b>Southwest lng</b>: {bbox[0]} <br />
        <b>Southwest lat</b>: {bbox[1]} <br />
        <b>Northeast lng</b>: {bbox[2]} <br />
        <b>Northeast lat</b>: {bbox[3]}
      </Popup>
    </Marker>
  );
}