import React, { PureComponent, createRef, RefObject } from "react";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapContainer.css";

// normalized color values
// all properties in [0, 1]
export interface Color {
  h: number;
  s: number;
  l: number;
}

export interface Props {
  accessToken: string;
  //
  buildingPalette: [Color, Color];
  landPalette: [Color, Color];
  waterPalette: [Color, Color];
  palettePosition: number; // [0, 1]
}
export interface State {
  map?: mapboxgl.Map;
}

export class MapContainer extends PureComponent<Props, State> {
  mapContainer: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);
    (mapboxgl as any).accessToken = props.accessToken;
    this.mapContainer = createRef();
  }

  componentDidMount() {
    this.initializeMap();
  }

  componentDidUpdate() {
    this.updateMap();
  }

  initializeMap() {
    const container = this.mapContainer.current;
    if (container !== null) {
      const map = new mapboxgl.Map({
        container,
        style: "mapbox://styles/david-wicks/cjy4jrx2p3os71cmr0yx3eia4",
        hash: true,
        zoom: 15.84,
        center: [-122.40802, 37.807816]
      });

      map.on("style.load", () => {
        this.setState({
          map
        });
      });
    }
  }

  updateMap() {
    const { buildingPalette, landPalette, waterPalette, palettePosition } = this.props;
    const buildings = colorToString(mixPalette(buildingPalette, palettePosition));
    const water = colorToString(mixPalette(waterPalette, palettePosition));
    const waterway = colorToString(mixPalette(waterPalette, clamp(palettePosition - 0.1)));
    const waterShadow = colorToString(mixPalette(waterPalette, clamp(palettePosition + 0.1)));

    console.log(buildingPalette, waterPalette);
    console.log(buildings, water, waterway);

    const { map } = this.state;
    if (map) {
      map.setPaintProperty("building", "fill-color", buildings);
      map.setPaintProperty("water", "fill-color", water);
      map.setPaintProperty("waterway", "line-color", waterway);
      map.setPaintProperty("water-shadow", "fill-color", waterShadow);

      map.setPaintProperty("land", "background-color", colorToString(mixPalette(landPalette, palettePosition)));
    }
  }

  render() {
    return <div className="map-container fullscreen" ref={this.mapContainer} />;
  }
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mixPalette(p: [Color, Color], t: number) {
  return {
    h: mix(p[0].h, p[1].h, t),
    s: mix(p[0].s, p[1].s, t),
    l: mix(p[0].l, p[1].l, t)
  };
}

function colorToString(c: Color) {
  return `hsl(${c.h * 360}, ${c.s}, ${c.l})`;
}

function clamp(a: number) {
  return Math.min(1.0, Math.max(a, 0.0));
}
