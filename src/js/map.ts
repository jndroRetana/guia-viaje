import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";

import { showPoints } from "./findSites";

const map = new Map({
  basemap: "dark-gray-vector",
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 2,
  center: [0, 0],
});

view.ui.add("itinerary", "top-right");
view.popup = {
  dockEnabled: false,
  dockOptions: {
    buttonEnabled: false,
    breakpoint: false
  }
};

export const createTrip = async (locationCity: number[], places: any, loader, type, costumerKey) => {
  const validateLocationCity = !isNaN(locationCity[0]) && !isNaN(locationCity[1]);
  view.closePopup();
  view.graphics.removeAll();
  const zoom =  type === "ciudad" ? 10 : 5

  validateLocationCity && view
    .goTo(
      {
        target: locationCity,
        zoom,
      },
      {
        animationMode: "always",
      }
    )
    .then(async() => {
      await showPoints(places, view, Graphic, Point, loader, costumerKey);
    });
};
