import React, { useState, useEffect } from "react"
import { geoPath, geoAlbers } from "d3-geo"
import { feature } from "topojson-client"
import styles from "../styles/WorldMap.module.css"
import * as d3 from "d3";
import axios from 'axios';
import SimpleCard from './SimpleCard.js';

const today = new Date();
const projection = geoAlbers()
  .scale(3000)
  .center([-17, 40])

// hover label
var div = d3.select("body").append("div")
  .attr("width", "50")
  .attr("class", "infoBox")
  .style("display", "none");

const tempInfo = {
  county: "Select a county!",
  newcountconfirmed: "0",
  newcountdeaths: "0",
  totalcountconfirmed: "0",
  totalcountdeaths: "0",
  date: `${today.getFullYear()}-0${today.getMonth()+1}-${today.getDate()-1}`
}

const WorldMap = () => {
  // state array will hold our county GeoJSON objects
  const [counties, setCounties] = useState([]);
  const [covidInfo, setCovidInfo] = useState(tempInfo);

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
          setCounties(feature(worlddata, worlddata.objects.subunits).features);
        })
      })
  }, [])

  // click handler
  const clickHandler = async (e, index) => {
    div.style("display", "none");

    // Make county name visible
    d3.select(".textBox")
      .style("display", "inline")

    // Search db for the info about the county
    axios.get(`${window.location.href}data/?county=${counties[index].properties.name}&date=${today.getFullYear()}-0${(today.getMonth()+1)}-${today.getDate()-1}`)
      .then(res => {
        setCovidInfo(res.data[0]);
      })

    // Make info about county visible
    d3.select(".dataBox")
      .style("display", "inline");
  }

  // Updates label based on mouse
  const hoverHandler = (index) => {
    div
      .style("display", "inline")
      .text(counties[index].properties.fullName);
  }

  // Removes labels when not on any county/moved off one county
  const mouseOutHandler = () => {
    div.style("display", "none");
    d3.select(".textBox")
      .style("display", "none");
    d3.select(".dataBox")
      .style("display", "none")
  }

  // Visual component we are returning
  return (
    <div className={styles.WorldMap}>
      <svg width={ 400 } height={ 650 } viewBox="0 0 400 650">
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
                onClick={ (e) => clickHandler(e, index) }
                onMouseOver={ () => hoverHandler(index)}
                onMouseOut={ () => mouseOutHandler() }
              />
            ))
          }
        </g>
        {/*Instructions*/}
        <text className="instructions" x="5" y="20">
          Click on a county for more information!
        </text>
      </svg>
      <SimpleCard display="inline" data={covidInfo}/>
      <SimpleCard display="inline" data={tempInfo}/>
    </div>
  )
}

export default WorldMap
