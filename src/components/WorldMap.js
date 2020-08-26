import React, { useState, useEffect } from "react"
import { geoPath, geoAlbers } from "d3-geo"
import { feature } from "topojson-client"
import styles from "../styles/WorldMap.module.css"
import * as d3 from "d3";

const projection = geoAlbers()
  .scale(3000)
  .center([-25, 38])

 var div = d3.select("body").append("div")
  .attr("width", "50")
  .attr("class", "infoBox")
  .style("display", "none");

const WorldMap = () => {
  // state array will hold our county GeoJSON objects
  const [counties, setCounties] = useState([]);

  // fetch the json data from our public directory
  useEffect(() => {
    fetch("/caCountiesTopo.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        // Populate the state array using topojson's feature fx
        // wd is a topology, sub is an object
        response.json().then(worlddata => {
          setCounties(feature(worlddata, worlddata.objects.subunits).features);
        })
      })
  }, [])
  
  // click handler
  const clickHandler = index => {
    console.log("Clicked on county: ", counties[index].properties.fullName)
  }

  // Mouse over handler
  const hoverHandler = (e, index) => {
    div
      .style("display", "inline")
      .text(counties[index].properties.fullName)
      .style("left", `${e.screenX}`)
      .style("top", `${e.screenY}`)
  }

  const mouseOutHandler = () => {
    div.style("display", "none");
  }

  return (
    <svg width={ 1000 } height={ 650 } viewBox="0 0 1000 650">
      <g className="counties">
        {/*Fills in counties with white*/}
        {/*Creates black outline*/}
        {counties.map((section, index) => (
            <path
              key={ `path-${ index }` }
              d={ geoPath().projection(projection)(section) }
              className={styles.county}
              fill={ `rgba(255,255,255)` }
              stroke="#000000"
              strokeWidth={ 0.5 }
              onClick={ () => clickHandler(index) }
              onMouseOver={ (e) => hoverHandler(e, index)}
              onMouseOut={ () => mouseOutHandler() }
            />
          ))
        }
        <text x="50" y="100" display="inline">Hello</text>
      </g>
    </svg>
  )
}

export default WorldMap
