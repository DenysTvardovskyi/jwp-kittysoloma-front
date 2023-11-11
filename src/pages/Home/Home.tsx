import React, { FC, useContext, useEffect, useState } from "react";
import { System as SystemLayout } from "../../layouts";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";
import { mock } from "./mock";
import { Button, Col, Divider, Flex, Layout, List, Row, Select } from "antd";
import { constants } from "../../styles/constants";
import { MapItem } from "./components/MapItem";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Title from "antd/es/typography/Title";
import { LoadingOutlined } from "@ant-design/icons";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import L from "leaflet";
import Sider from "antd/es/layout/Sider";
import Search from "antd/es/input/Search";
import { usePanel } from "../../hooks/usePanel";
import { PLACES } from "../../graphql/places";
import { useLazyQuery } from "@apollo/client";
import { NODE_BY_ID } from "../../graphql/nodeByID";

interface IProps {
}

interface ILatlng {
  lat: number,
  lng: number
}

interface INode {
  name: string,
  airQualityCategory: string,
  lat: number,
  lng: number
}

export const Home: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const [ hasBreakPoint, setBreakPoint ] = useState(false);

  const { opened, setOpened } = usePanel();

  const [ total, setTotal ] = useState<number>();
  const [ search, setSearch ] = useState<string>("");
  const [ executeSearch, { data, loading } ] = useLazyQuery(PLACES);
  const [ params, setParams ] = useState<any>({
    pagination: {
      pageSize: 10,
      offset: null,
    },
  });

  const [ selectedMapItem, setSelectedMapItem ] = useState<INode>();
  const [ executeNodeData, { loading: nodeIsLoading } ] = useLazyQuery(NODE_BY_ID);

  const handleNodeClick = (id: number) => {
    executeNodeData({ variables: { id } }).then(r => {
      const node = r.data.nodeById;
      const name = node.tags.find(tag => tag.name === "name" || tag.name === "name:uk");
      setSelectedMapItem({
        name: name.value,
        airQualityCategory: node.airQualityCategory,
        lng: node.location.coordinates[0],
        lat: node.location.coordinates[1],
      });
      if (hasBreakPoint) {
        setOpened(prev => !prev);
      }
    });

  };

  useEffect(() => {
    const variables = {
      search,
      pageSize: params.pagination.pageSize,
      offset: params.pagination.offset,
    };

    executeSearch({ variables }).then((res) => {
      setTotal(res.data.pagedNodes.totalCount);
    });
  }, [ params, search ]);

  const handleSearch = (v: string) => {
    setSearch(v);
    setParams({ ...params, pagination: { pageSize: 10, offset: null } });
  };

  const panelWidth = hasBreakPoint && !opened ? "100%" : "35%";

  return (
    <SystemLayout>
      <Sider
        trigger={null}
        collapsedWidth={hasBreakPoint ? "0" : "80"}
        collapsible
        collapsed={opened}
        breakpoint="lg"
        width={panelWidth}
        onBreakpoint={(broken) => {
          setOpened(broken);
          setBreakPoint(broken);
        }}
        style={{
          maxHeight: "calc(100vh - 64px)",
          overflowY: "auto",
          backgroundColor: constants.light,
        }}
      >
        <div
          style={{
            padding: "0 16px",
            boxSizing: "border-box",
          }}
        >
          <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            onSearch={handleSearch}
            style={{
              marginTop: 24,
              marginBottom: 24,
            }}
          />
          <List>
            {!loading && data &&
              data?.pagedNodes?.nodes?.map(node =>
                <List.Item
                  onClick={() => handleNodeClick(node.id)}
                  style={{ width: "100%" }} key={node.id}
                >
                  <MapItem item={node} />
                </List.Item>,
              )
            }
          </List>
          {!loading && data && <div>
            <Button
              onClick={() => {
                setParams({
                  ...params,
                  pagination: { ...params.pagination, offset: data?.pagedNodes?.pageInfo?.startCursor },
                });
              }} disabled={!data?.pagedNodes?.pageInfo?.hasPreviousPage}
            >Previous</Button>
            <Button
              onClick={() => {
                setParams({
                  ...params,
                  pagination: { ...params.pagination, offset: data?.pagedNodes?.pageInfo?.endCursor },
                });
              }} disabled={!data?.pagedNodes?.pageInfo?.hasNextPage}
            >Next</Button>
            <Select
              style={{ width: 120 }}
              onChange={(value, option) => {
                setParams({ ...params, pagination: { pageSize: +value, offset: null } });
              }}
              value={params.pagination.pageSize}
              options={[
                { value: "10", label: "10 / page" },
                { value: "20", label: "20 / page" },
                { value: "50", label: "50 / page" },
                { value: "100", label: "100 / page" },
              ] as any}
            />
          </div>}
        </div>
      </Sider>
      <Layout>
        <div style={{ width: "100%", height: "calc(100vh - 64px)", overflowY: "auto", background: constants.light }}>
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
            {/*<Routing/>*/}
            {selectedMapItem && !nodeIsLoading && <LocationMarker
              name={selectedMapItem.name}
              air={selectedMapItem.airQualityCategory}
              latlng={{ lng: selectedMapItem.lng, lat: selectedMapItem.lat }}
            />}
          </MapContainer>
        </div>
      </Layout>
    </SystemLayout>
  );
};

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
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
      geocoder: L.Control.Geocoder.nominatim(),
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [ map ]);

  return null;
};

interface IMarkerProps {
  name: string,
  air: string
  latlng: ILatlng,
}

function LocationMarker({ latlng, name, air }: { latlng: ILatlng, name: string, air: number }) {
  console.log(latlng);
  const [ position, setPosition ] = useState<ILatlng>();
  const [ bbox, setBbox ] = useState([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function(e) {
      setPosition(latlng);
      map.flyTo(latlng, map.getZoom());
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [ map, latlng ]);

  return !position ? null : (
    <Marker position={position}>
      <Popup>
        <strong>{name}</strong>
        <br />
        Air: {air}
        <br />
      </Popup>
    </Marker>
  );
}