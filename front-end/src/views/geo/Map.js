import React, { useState, useEffect } from 'react';
import { Icon } from 'leaflet';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  // TextField,
} from '@material-ui/core';
import {
  MapContainer, TileLayer, Marker, Popup, Polygon, Polyline, LayersControl, LayerGroup,
} from 'react-leaflet';
// import useSWR from 'swr';
import {
  // useForm,
  Form
} from 'src/components/useForm';

import Controls from 'src/components/controls';
import axios from 'axios';
import GeoAxios from 'src/services/geo';
import GroupedAutocomplete from './GroupedAutocomplete';

const {
  getAllConstructionObjects,
  getAllQuarries,
  getAllCementFactories,
  getAllConstructionZones,
  getAllRoadLines,
} = new GeoAxios();

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '93%',
  },
}));

const quarryIcon = new Icon({
  iconUrl: '/static/images/leaflet/quarry.png',
  shadowUrl: '/static/images/leaflet/leaf-shadow.png',
  iconSize: [35, 35],
  shadowSize: [45, 64],
  // iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  // popupAnchor: [-3, -76],
});

const cementIcon = new Icon({
  iconUrl: '/static/images/leaflet/cement.png',
  shadowUrl: '/static/images/leaflet/leaf-shadow.png',
  iconSize: [45, 45],
  shadowSize: [45, 64],
  // iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  // popupAnchor: [-3, -76],
});

const CustomMap = () => {
  const classes = useStyles();
  // Объекты строительства
  const [constructionObjects, setConstructionObjects] = useState(null);
  // Karyerler
  const [quarries, setQuarries] = useState(null);
  // Cement Factories
  const [cementFactories, setCementFactories] = useState(null);
  const [activeQuarry, setActiveQuarry] = useState(null);
  // ConstructionZones
  // eslint-disable-next-line no-unused-vars
  const [constructionZones, setConstructionZones] = useState(null); // Karyerler
  // const [activeConstructionZone, setConstructionZone] = useState(null);
  const [roadLines, setRoadLines] = useState(null); // Yollar
  // OPENROUTESERVICE (ORS)
  const [orsRoute, setOrsRoute] = useState(null);
  // Directions
  const [directionFrom, setDirectionFrom] = useState(null);
  const [directionTo, setDirectionTo] = useState(null);
  // Distance
  const [distance, setDistance] = useState(null);
  // const _swap = (features) => {
  //   console.log('features', features);
  //   return features.map((feature) => {
  //     const multiPolygons = feature.geometry;
  //     return multiPolygons.map((multiPolygon) => {
  //       console.log('multiPolygon', multiPolygon);
  //       return multiPolygon;
  //     });
  //   });
  // };

  const orsApiKey = '5b3ce3597851110001cf62489d8f080d11f34aee888e4c6bdbf80c63';

  useEffect(() => {
    getAllConstructionObjects()
      .then((its) => {
        return setConstructionObjects(its.data);
      })
      .catch((err) => console.log(err));
  }, [setConstructionObjects]);

  useEffect(() => {
    getAllQuarries()
      .then((its) => {
        return setQuarries(its.data);
      })
      .catch((err) => console.log(err));
  }, [setQuarries]);

  useEffect(() => {
    getAllCementFactories()
      .then((its) => {
        return setCementFactories(its.data);
      })
      .catch((err) => console.log(err));
  }, [setCementFactories]);

  useEffect(() => {
    getAllConstructionZones()
      .then((its) => {
        return setConstructionZones(its.data);
      })
      .catch((err) => console.log('err in getAllConstructionZones', err));
  }, [setConstructionZones]);

  useEffect(() => {
    getAllRoadLines()
      .then((its) => {
        return setRoadLines(its.data);
      })
      .catch((err) => console.log(err));
  }, [setRoadLines]);

  console.log(activeQuarry);

  const center = [38.8, 58.70];
  const zoom = 7;

  const _transformMultiPolygonData = (mp) => {
    return mp.map((mp2) => {
      return mp2.map((mp3) => {
        return mp3.map((mp4) => {
          return [mp4[1], mp4[0]];
        });
      });
    });
  };

  const _transformLineData = (mp) => {
    return mp.map((mp2) => {
      return [mp2[1], mp2[0]];
    });
  };

  const _transformConstructionObjectsData = (mp) => {
    return mp.map((mp2) => {
      return {
        name: mp2.properties.name,
        geometry: mp2.geometry.coordinates,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (directionFrom != null && directionTo !== null) {
      axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${orsApiKey}&start=${directionFrom.geometry}&end=${directionTo.geometry}`)
        .then((res) => {
          setDistance(res.data.features[0].properties.summary.distance);
          setOrsRoute(res.data);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={4}>
            <GroupedAutocomplete
              data={
                constructionObjects != null
                  ? _transformConstructionObjectsData(constructionObjects.features)
                  : []
              }
              label="Выберите пункт отправки (Объект стротельства)"
              setDirection={setDirectionFrom}
            />
          </Grid>
          <Grid item xs={4}>
            <GroupedAutocomplete
              data={
                cementFactories != null
                  ? _transformConstructionObjectsData(cementFactories.features)
                  : []
              }
              label="Выберите пункт отправки (Объект стротельства)"
              setDirection={setDirectionTo}
            />
          </Grid>
          <Grid item xs={4}>
            <Controls.Button
              text="Принять"
              color="default"
              type="submit"
            />
          </Grid>
          {
            distance && (
            <Grid item xs={4}>
              <Typography>
                Дистанция -
                {' '}
                {(distance / 1000).toFixed(2)}
                {' '}
                км
              </Typography>
            </Grid>
            )
          }
        </Grid>
      </Form>
      <MapContainer center={center} zoom={zoom} className={classes.root}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name="Карьеры">
            <LayerGroup>
              {quarries && quarries.features.map((quarry) => (
                <Marker
                  key={quarry.properties.name}
                  position={[quarry.geometry.coordinates[1], quarry.geometry.coordinates[0]]}
                  onClick={() => {
                    setActiveQuarry(quarry);
                  }}
                  icon={quarryIcon}
                >
                  <Popup
                    position={[quarry.geometry.coordinates[1], quarry.geometry.coordinates[0]]}
                    onClose={() => {
                      setActiveQuarry(null);
                    }}
                  >
                    <div>
                      <h6>{quarry.properties.name}</h6>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Цементные заводы">
            <LayerGroup>
              {cementFactories && cementFactories.features.map((cf) => (
                <Marker
                  key={cf.properties.name}
                  position={[cf.geometry.coordinates[1], cf.geometry.coordinates[0]]}
                  onClick={() => {
                    setActiveQuarry(cf);
                  }}
                  icon={cementIcon}
                >
                  <Popup
                    position={[cf.geometry.coordinates[1], cf.geometry.coordinates[0]]}
                    onClose={() => {
                      setActiveQuarry(null);
                    }}
                  >
                    <div>
                      <h6>{cf.properties.name}</h6>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Строительные зоны">
            <LayerGroup>
              {constructionZones && constructionZones.features.map((cz) => (
                <Polygon
                  key={cz.properties.name}
                  pathOptions={{ color: 'purple' }}
                  positions={_transformMultiPolygonData(cz.geometry.coordinates)}
                />
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Дороги">
            <LayerGroup>
              {roadLines && roadLines.features.map((rl) => {
                // console.log('rl.geometry.coordinates', rl.geometry.coordinates);
                return (
                  <Polyline
                    key={rl.properties.__str__}
                    pathOptions={{ color: 'green' }}
                    positions={_transformLineData(rl.geometry.coordinates)}
                  />
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Маршрут">
            <LayerGroup>
              {orsRoute && orsRoute.features.map((rl) => {
                // console.log('rl.geometry.coordinates', rl.geometry.coordinates);
                return (
                  <Polyline
                    key={rl.geometry.coordinates}
                    pathOptions={{ color: 'red' }}
                    positions={_transformLineData(rl.geometry.coordinates)}
                  />
                );
              })}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default CustomMap;
