import React, {FC, useEffect, useRef, useState} from "react";
import {System as SystemLayout} from "../../layouts";
import {useTranslation} from "react-i18next";
import "leaflet/dist/leaflet.css";
import {Button, Flex, FloatButton, Image, Input, Layout, List, Modal, Select, Tour} from "antd";
import {constants} from "../../styles/constants";
import {MapItem} from "./components/MapItem";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import {AimOutlined} from "@ant-design/icons";
//@ts-ignore
import L from "leaflet";
import Sider from "antd/es/layout/Sider";
import Search from "antd/es/input/Search";
import {usePanel} from "../../hooks/usePanel";
import {PLACES} from "../../graphql/places";
import {useLazyQuery} from "@apollo/client";
import {NODE_BY_ID} from "../../graphql/nodeByID";
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
  id: string,
  name: string,
  airQualityCategory: string,
  lat: number,
  lng: number
  tags: any[]
}

export const Home: FC<IProps> = (): JSX.Element => {
  const { t } = useTranslation();
  const [ hasBreakPoint, setBreakPoint ] = useState(false);

  const { opened, setOpened } = usePanel();

  const [selectedTag, setSelectedTag] = useState<string | null>();

  const [response, setResponse] = useState()
  const [ total, setTotal ] = useState<number>(0);
  const [ search, setSearch ] = useState<string>("");
  const [ executeSearch, { data, loading } ] = useLazyQuery(PLACES);
  const [ executeSearchWithFilters, { dataFilter, loadingFiltered } ] = useLazyQuery(PLACES_FILTERS);
  const [ userLatlon, setUserLatlon ] = useState(null);
  const [ end, setEnd ] = useState(null);
  const panelWidth = hasBreakPoint && !opened ? "100%" : "35%";

  const [ showLocation, setShowLocation ] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ tour, setTour ] = useState(false);

  const ref1 = useRef<any>(null);
  const ref2 = useRef<HTMLButtonElement | null>(null);
  const ref3 = useRef<HTMLDivElement | null>(null);

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
      setEnd({
        lng: node.location.coordinates[0],
        lat: node.location.coordinates[1],
      } as any);
      setSelectedMapItem({
        id: node.id,
        name: name.value,
        airQualityCategory,
        lng: node.location.coordinates[0],
        lat: node.location.coordinates[1],
        tags: node.tags
      });
      if (hasBreakPoint) {
        //@ts-ignore
        setOpened((prev: any) => !prev);
      }
    });

  };

  useEffect(() => {
    const tourState = localStorage.getItem("tourDone");

    if (!tourState) {
      setTour(true);
    }
  }, []);

  useEffect(() => {
    if (!userLatlon) {
      getLocation();
    }
  }, [ userLatlon ]);

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
  function getLocation() {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then(permissionStatus => {
        if (permissionStatus.state === "denied") {
          setIsModalOpen(true);
        } else {
          navigator.geolocation.getCurrentPosition((position) => setUserLatlon({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          } as any), () => "");
        }
      });
    } else {
      alert("Geolocation is not supported in your browser.");
    }
  }

  const steps: any = [
    {
      title: "Welcome to MAP",
      description: "Let's have a quick look around.",
    },
    {
      title: "Map",
      description: "Here you can see routes and places on the map",
      target: () => ref1.current,
    },
    {
      title: "Current location",
      description: "Click here to get your current location",
      target: () => ref2.current,
    },
    {
      title: "Sidebar",
      placement: "right",
      description: "Here you can find a specific place.",
      target: () => ref3.current,
    },
  ];

  const handleSearch = (v: string) => {
    setSearch(v);
    setParams({ ...params, pagination: { pageSize: 10, offset: null } });
  };

  const handleOk = () => {
    if (userLatlon) {
      setIsModalOpen(false);
    }
  };

  const closeTour = () => {
    setTour(false);
    localStorage.setItem("tourDone", "true");
  };

  return (
    <SystemLayout>
      <Tour open={tour} onClose={closeTour} steps={steps} />
      <Modal title="Please allow location" open={isModalOpen} onOk={handleOk} onCancel={handleOk}>
        <Image
          width="100%"
          src="./location.jpg"
        />
        <p>Allow location for full experience</p>
      </Modal>
      <Sider
        ref={ref3}
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
          <Input
              placeholder="large size"
              style={{ marginTop: 24 }}
              prefix={<AimOutlined />}
              disabled={true}
              value={"Your location"}
          />
          <Search
            placeholder={t("home.search.placeholder")}
            allowClear
            enterButton={t("home.search.button")}
            onSearch={handleSearch}
            style={{ margin: "24px 0" }}
          />
          <span>Results: {total}</span>
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
              response?.pagedNodes?.nodes?.map((node: any) =>
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
              onChange={(value) => {
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
        <div
          style={{ width: "100%", height: "calc(100vh - 64px)", overflowY: "auto", background: constants.light }}
          ref={ref1}
        >
          <MapContainer
            //@ts-ignore
            center={[ 50.45, 30.52 ]}
            // maxBounds={[ [ 50.156534, 31.138470 ], [ 50.959162, 29.471295 ] ]}
            minZoom={10}
            maxZoom={18}
            zoom={16}
          >
            <TileLayer
              //@ts-ignore
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              //@ts-ignore
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLatlon && end && <Routing start={userLatlon} end={end} />}
            {selectedMapItem && !nodeIsLoading && <PlaceMarker
              name={selectedMapItem.name}
              air={selectedMapItem.airQualityCategory}
              tags={selectedMapItem.tags}
              latlng={{ lng: selectedMapItem.lng, lat: selectedMapItem.lat }}
            />}
            <LocationMarker trigger={showLocation} setShowLocation={setShowLocation} setUserLatlon={setUserLatlon} />
          </MapContainer>
          <FloatButton
            ref={ref2}
            icon={<AimOutlined />}
            type={showLocation ? "primary" : "default"}
            style={{ zIndex: 10 }}
            onClick={() => setShowLocation(true)}
          />
        </div>
      </Layout>
    </SystemLayout>
  );
};

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

const Routing = ({ start, end }: any) => {
  const map = useMap();

  useEffect(() => {
    if (!map) {
      return;
    }

    const routingControl = L.Routing.control({
      waypoints: [ start, end ],
      routeWhileDragging: false,
      geocoder: L.Control.Geocoder.nominatim(),
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [ map, start, end ]);

  return null;
};

function LocationMarker({ trigger, setUserLatlon }: any) {
  const [ position, setPosition ] = useState(null);

  const map = useMap();

  useEffect(() => {
    if (trigger) {
      map.locate().on("locationfound", function(e: any) {
        setUserLatlon(e.latlng);
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
      }).on("locationerror", function() {
        alert("Location access denied.");
      });
    }
  }, [ trigger ]);

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

function PlaceMarker({ latlng, name, air, tags }: { latlng: ILatlng, name: string, air: string, tags: any[] }) {
  const [ position, setPosition ] = useState<ILatlng>();

  const map = useMap();


  useEffect(() => {
    map.locate().on("locationfound", function() {
      setPosition(latlng);
      map.flyTo(latlng, map.getZoom());
    });
  }, []);

  return !position ? null : (
    <Marker position={position}>
      <Popup>
        <Title level={4}>{name}</Title>
        <Flex vertical gap={10} style={{marginTop: 12}}>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <span style={{textTransform: "capitalize"}}>Air</span>
            <span style={{textTransform: "capitalize"}} >{air}</span>
          </div>
          {tags.filter((tag) => !tag.name.includes("name")).map((tag) => {
              return (
                  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr" }} key={tag.name}>
                    <span style={{textTransform: "capitalize"}}>{tag.name.split("_").join(" ")}</span>
                    <span style={{overflow:"hidden", textOverflow: "ellipsis"}} >{tag.value}</span>
                  </div>
              )
            })
          }
        </Flex>

      </Popup>
    </Marker>
  );
}