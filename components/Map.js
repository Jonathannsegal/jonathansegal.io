import React, { Component, PureComponent } from "react";
import MapGl, { Marker } from "react-map-gl";
import { Box } from "@chakra-ui/core";

import { locations } from "../data/lists";

class Markers extends PureComponent {
  render() {
    const { data } = this.props;

    return data.map((location) => (
      <Marker
        key={location.title}
        latitude={location.latitude}
        longitude={location.longitude}
        offsetLeft={-10}
        offsetTop={-10}
      >
        {
          {
            pin: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Pin">
                  📍
                </span>
              </Box>
            ),
            home: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Home">
                  🏠
                </span>
              </Box>
            ),
            school: (
              <Box mt="-0.5em">
                <span role="img" aria-label="School">
                  🏫
                </span>
              </Box>
            ),
            beach: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Beach">
                  🏖️
                </span>
              </Box>
            ),
            beach1: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Beach1">
                  ⛱️
                </span>
              </Box>
            ),
            mountian: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Mountian">
                  🏔️
                </span>
              </Box>
            ),
            nyc: (
              <Box mt="-0.5em">
                <span role="img" aria-label="NYC">
                  🗽
                </span>
              </Box>
            ),
            mapleleaf: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Mapleleaf">
                  🍁
                </span>
              </Box>
            ),
            car: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Car">
                  🚗
                </span>
              </Box>
            ),
            kangaroo: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Kangaroo">
                  🦘
                </span>
              </Box>
            ),
            sloth: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Sloth">
                  🦥
                </span>
              </Box>
            ),
            emptymail: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Emptymail">
                  📭
                </span>
              </Box>
            ),
            racecar: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Racecar">
                  🏎️
                </span>
              </Box>
            ),
            park: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Park">
                  🏞️
                </span>
              </Box>
            ),
            cow: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Cow">
                  🐄
                </span>
              </Box>
            ),
            running: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Running">
                  🏃‍♂️
                </span>
              </Box>
            ),
            emptyroad: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Emptyroad">
                  🛣️
                </span>
              </Box>
            ),
            birthday: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Birthday">
                  🎂
                </span>
              </Box>
            ),
            city: (
              <Box mt="-0.5em">
                <span role="img" aria-label="City">
                  🏙️
                </span>
              </Box>
            ),
            bridge: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Bridge">
                  🌉
                </span>
              </Box>
            ),
            dessert: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Dessert">
                  🏜️
                </span>
              </Box>
            ),
            ferriswheel: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Ferriswheel">
                  🎡
                </span>
              </Box>
            ),
            palmtree: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Palmtree">
                  🌴
                </span>
              </Box>
            ),
            island: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Island">
                  🏝️
                </span>
              </Box>
            ),
            cruise: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Cruise">
                  🛳️
                </span>
              </Box>
            ),
            snowboard: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Snowboar">
                  🏂
                </span>
              </Box>
            ),
            pizza: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Pizza">
                  🍕
                </span>
              </Box>
            ),
            cactus: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Cactus">
                  🌵
                </span>
              </Box>
            ),
            corn: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Corn">
                  🌽
                </span>
              </Box>
            ),
            hawk: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Hawk">
                  🦅
                </span>
              </Box>
            ),
            parrot: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Parrot">
                  🦜
                </span>
              </Box>
            ),
            redbird: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Redbird">
                  🐦
                </span>
              </Box>
            ),
            chicken: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Chicken">
                  🐓
                </span>
              </Box>
            ),
            rainbow: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Rainbow">
                  🌈
                </span>
              </Box>
            ),
            snowman: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Snowman">
                  ⛄️
                </span>
              </Box>
            ),
            wave: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Wave">
                  🌊
                </span>
              </Box>
            ),
            whale: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Whale">
                  🐳
                </span>
              </Box>
            ),
            fish: (
              <Box mt="-0.5em">
                <span role="img" aria-label="Fish">
                  🐠
                </span>
              </Box>
            ),
            new: (
              <Box mt="-0.5em">
                <span role="img" aria-label="New">
                  🌞📍
                </span>
              </Box>
            ),
          }[location.image]
        }
      </Marker>
    ));
  }
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: "100%",
        height: "280px",
        latitude: 38,
        longitude: -96,
        zoom: 1.5,
      },
    };
  }

  render() {
    return (
      <MapGl
        {...this.state.viewport}
        mapStyle={this.props.style}
        mapboxApiAccessToken={
          "pk.eyJ1Ijoiam9uYXRoYW5zZWdhbCIsImEiOiJjamxrODVuamgwazI0M3BsZHIwNW5xZjNrIn0.UTtfn21uo6LCNkh-Pn1b4A"
        }
        onViewportChange={(viewport) => this.setState({ viewport })}
      >
        <Markers data={locations} />
      </MapGl>
    );
  }
}

export default Map;
