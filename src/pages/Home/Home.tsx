import React, { FC, useEffect, useState } from "react";
import { System as SystemLayout } from "../../layouts";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";
import {Button, Checkbox, Flex, Layout, List, Select} from "antd";
import { constants } from "../../styles/constants";
import { MapItem } from "./components/MapItem";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
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
import CheckableTag from "antd/es/tag/CheckableTag";
import Title from "antd/es/typography/Title";
import {PLACES_FILTERS} from "../../graphql/places_filters";

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

  const [selectedTag, setSelectedTag] = useState<string>();

  const [response, setResponse] = useState()
  const [ total, setTotal ] = useState<number>();
  const [ search, setSearch ] = useState<string>("");
  const [ executeSearch, { data, loading } ] = useLazyQuery(PLACES);
  const [ executeSearchWithFilters, { dataFilter, loadingFiltered } ] = useLazyQuery(PLACES_FILTERS);
  const [ params, setParams ] = useState<any>({
    pagination: {
      pageSize: 10,
      offset: null,
    },
  });

  const [ selectedMapItem, setSelectedMapItem ] = useState<INode>();
  const [ executeNodeData, { loading: nodeIsLoading } ] = useLazyQuery(NODE_BY_ID);

  const handleNodeClick = (node: INode) => {
    executeNodeData({ variables: { id: node.id } }).then(r => {
      const airQualityCategory = r.data.nodeById.airQualityCategory;
      const name = node.tags.find(tag => tag.name === "name" || tag.name === "name:uk");
      setSelectedMapItem({
        name: name.value,
        airQualityCategory,
        lng: node.location.coordinates[0],
        lat: node.location.coordinates[1],
      });
      if (hasBreakPoint) {
        setOpened(prev => !prev);
      }
    });

  };

  const tags = [
    {label: "wheelchair", value: "yes"},
    {label: "toilets", value: "yes"},
    {label: "toilets:wheelchair", value: "yes"},
    {label: "lit", value: "yes"},
    {label: "public_transport", value: "yes"},
    {label: "amenity", value: "yes"},
    {label: "tactile_paving", value: "yes"},
    {label: "operator", value: "yes"},
  ]

  useEffect(() => {
    const variables = {
      search,
      pageSize: params.pagination.pageSize,
      offset: params.pagination.offset,
    };

    const variablesWithFilters = {
      ...variables,
      filter: selectedTag,
      filterValue: tags.find(tag => tag.label === selectedTag)?.value
    };
    console.log(variablesWithFilters)
    if(selectedTag){
      executeSearchWithFilters({ variables: variablesWithFilters }).then((res) => {
        setTotal(res.data.pagedNodes.totalCount);
        setResponse(undefined)
        setResponse(res.data)
      });
    } else {
      executeSearch({ variables }).then((res) => {
        setTotal(res.data.pagedNodes.totalCount);
        setResponse(undefined)
        setResponse(res.data)
      });
    }


  }, [ params, search, selectedTag]);

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
          <Title level={2} style={{marginBottom: 0}}>Пошук</Title>
          <Search
            placeholder={t("home.search.placeholder")}
            allowClear
            enterButton={t("home.search.button")}
            onSearch={handleSearch}
            style={{
              marginTop: 24,
            }}
          />
          <Title
              style={{
            marginTop: 10,
          }} level={5}>Фільтри</Title>
          <Flex gap={5} wrap={"wrap"} styles={{width: "100%"}}>
            {tags.map((tag) => (
                <CheckableTag
                    style={{border: "1px solid black", fontSize: 14}}
                    key={tag.label}
                    checked={selectedTag === tag.label}
                    onClick={() => selectedTag === tag.label ? setSelectedTag(undefined) : setSelectedTag(tag.label)}
                >
                  {t(`accessible.${tag.label}`)}
                </CheckableTag>
            ))}
          </Flex>

          <List>
            {!loading && data &&
              response?.pagedNodes?.nodes?.map(node =>
                <List.Item
                  onClick={() => handleNodeClick(node)}
                  style={{ width: "100%" }} key={node.id}
                >
                  <MapItem item={node} />
                </List.Item>,
              )
            }
          </List>
          {!loading && data && <div style={{paddingBottom: 20 }}>
            <Button
              onClick={() => {
                setParams({
                  ...params,
                  pagination: { ...params.pagination, offset: data?.pagedNodes?.pageInfo?.startCursor },
                });
              }} disabled={!data?.pagedNodes?.pageInfo?.hasPreviousPage}
            >{t('pagination.previous')}</Button>
            <Button
              onClick={() => {
                setParams({
                  ...params,
                  pagination: { ...params.pagination, offset: data?.pagedNodes?.pageInfo?.endCursor },
                });
              }} disabled={!data?.pagedNodes?.pageInfo?.hasNextPage}
            >{t('pagination.next')}</Button>
            <Select
              style={{ width: 150 }}
              onChange={(value, option) => {
                setParams({ ...params, pagination: { pageSize: +value, offset: null } });
              }}
              value={params.pagination.pageSize}
              options={[
                { value: "10", label: `10 / ${t("pagination.label")}` },
                { value: "20", label: `20 / ${t("pagination.label")}` },
                { value: "50", label: `50 / ${t("pagination.label")}` },
                { value: "100", label: `100 / ${t("pagination.label")}` },
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

function LocationMarker({ latlng, name, air }: { latlng: ILatlng, name: string, air: string }) {
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