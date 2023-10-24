import * as pmtiles from "pmtiles";
import * as maplibregl from "maplibre-gl";
import layers from "protomaps-themes-base";

const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const myMap = new maplibregl.Map({
  container: "map", // container id
  style: {
    version: 8,
    glyphs: "https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf",
    sources: {
      protomaps: {
        type: "vector",
        // url: `pmtiles://${mapUrl}`,
        url: `pmtiles://${location.protocol}//${location.host}${location.pathname}hmb.pmtiles`,
        attribution:
          '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
      },
    },
    layers: layers("protomaps", "light"),
  },
});
myMap.on("load", () => {
  const myBounds = myMap.getSource("protomaps").bounds;
  myMap.setMaxBounds(myBounds);
});
