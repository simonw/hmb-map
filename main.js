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
  // Now load the places.json
  fetch("places.json").then((response) => {
    response.json().then((data) => {
      data.rows.forEach((row) => {
        const categories = JSON.parse(row.categories);
        const catlist = [categories.main, ...(categories.alternate || [])].join(
          ", ",
        );
        const name = JSON.parse(row.names).value[0][0].value[0];
        const marker = new maplibregl.Marker({ scale: 0.5, color: "#000080" });
        marker
          .setLngLat([row.longitude, row.latitude])
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<strong>${name}</strong><br>${catlist}`,
            ),
          );
        marker.addTo(myMap);
      });
    });
  });
});
