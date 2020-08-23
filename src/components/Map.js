import React from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/lower-quality-20m/20m-US-counties.json";

const Map = () => {
  return (
    <div>
      <ComposableMap>
        <ZoomableGroup center={[0,0]} zoom={2}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default Map;
