import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import Expand from "@arcgis/core/widgets/Expand";

import { showPoints, defaultMessageItinerary } from "../index";

const map = new Map({
  basemap: "dark-gray-vector",
});

const view = new MapView({
  container: "viewDiv",
  map: map,
  zoom: 2,
  center: [0, 0],
});

view.popup = {
  dockEnabled: false,
  dockOptions: {
    buttonEnabled: false,
    breakpoint: false,
  },
};

const expand = new Expand({
  expandTooltip: "Ver más",
  view: view,
  content: document.getElementById("itinerary"),
  expanded: true,
});

view.ui.add(expand, "top-right");

export const goToLocations = async (option1, option2) => {
  await view.goTo(option1, option2);
};

export const createTrip = async (
  locationCity: number[],
  places: any,
  loader,
  type,
  costumerKey
) => {
  const validateLocationCity =
    !isNaN(locationCity[0]) && !isNaN(locationCity[1]);
  view.closePopup();
  view.graphics.removeAll();
  const zoom = type === "ciudad" ? 10 : 5;
  defaultMessageItinerary();
  validateLocationCity &&
    goToLocations(
      {
        target: locationCity,
        zoom,
      },
      {
        animationMode: "always",
      }
    ).then(async () => {
      await showPoints(places, view, Graphic, Point, loader, costumerKey);
    });
};
