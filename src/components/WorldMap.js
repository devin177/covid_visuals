import React, { useState, useEffect } from "react"
import { geoPath, geoAlbers } from "d3-geo"
import { feature } from "topojson-client"

const projection = geoAlbers()
  .scale(3000)
  .center([-25, 38])

const num = projection.center();
console.log(num);

const WorldMap = () => {
  // state array will hold our county objects
  const [geographies, setGeographies] = useState([])

  // fetch the json data from our public directory
  useEffect(() => {
    fetch("/caCountiesTopo.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        // Populate the state array using topojson's feature fx
        response.json().then(worlddata => {
          setGeographies(feature(worlddata, worlddata.objects.subunits).features);
        })
      })
  }, [])

  // click handler
  const handleCountryClick = countryIndex => {
    console.log("Clicked on country: ", geographies[countryIndex])
  }

  // const handleMarkerClick = i => {
  //   console.log("Marker: ", cities[i])
  // }

  return (
    <svg width={ 1000 } height={ 650 } viewBox="0 0 1000 650">
      <g className="counties">
        {/*Fills in counties with white*/}
        {/*Creates black outline*/}
        {geographies.map((d,i) => (
            <path
              key={ `path-${ i }` }
              d={ geoPath().projection(projection)(d) }
              className="county"
              fill={ `rgba(255,255,255)` }
              stroke="#000000"
              strokeWidth={ 1 }
              onClick={ () => handleCountryClick(i) }
            />
          ))
        }
      </g>
      {/* <g className="markers">
        {
          cities.map((city, i) => (
            <circle
              key={ `marker-${i}` }
              cx={ projection(city.coordinates)[0] }
              cy={ projection(city.coordinates)[1] }
              r={ city.population / 3000000 }
              fill="#E91E63"
              stroke="#FFFFFF"
              className="marker"
              onClick={ () => handleMarkerClick(i) }
            />
          ))
        }
      </g> */}
    </svg>
  )
}

export default WorldMap
