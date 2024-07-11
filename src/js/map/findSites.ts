import { infoPlace } from "../ai/steamTextAi";
import CIMSymbol from "@arcgis/core/symbols/CIMSymbol";

const symbol = {
  type: "CIMPointSymbol",
  symbolLayers: [
    {
      type: "CIMVectorMarker",
      enable: true,
      anchorPoint: {
        x: 0,
        y: -0.5,
      },
      anchorPointUnits: "Relative",
      dominantSizeAxis3D: "Y",
      size: 25,
      billboardMode3D: "FaceNearPlane",
      frame: {
        xmin: 0,
        ymin: 0,
        xmax: 21,
        ymax: 21,
      },
      markerGraphics: [
        {
          type: "CIMMarkerGraphic",
          geometry: {
            rings: [
              [
                [17.17, 14.33],
                [16.97, 12.96],
                [16.38, 11.37],
                [12.16, 3.98],
                [11.2, 1.94],
                [10.5, 0],
                [9.8, 1.96],
                [8.84, 4.02],
                [4.61, 11.41],
                [4.02, 12.98],
                [3.83, 14.33],
                [3.96, 15.63],
                [4.34, 16.88],
                [4.95, 18.03],
                [5.78, 19.04],
                [6.8, 19.88],
                [7.95, 20.49],
                [9.2, 20.87],
                [10.5, 21],
                [11.8, 20.87],
                [13.05, 20.5],
                [14.2, 19.88],
                [15.22, 19.05],
                [16.05, 18.03],
                [16.66, 16.88],
                [17.04, 15.63],
                [17.17, 14.33],
              ],
            ],
          },
          symbol: {
            type: "CIMPolygonSymbol",
            symbolLayers: [
              {
                type: "CIMSolidStroke",
                enable: true,
                capStyle: "Round",
                joinStyle: "Round",
                lineStyle3D: "Strip",
                miterLimit: 10,
                width: 0,
                color: [110, 110, 110, 255],
              },
              {
                type: "CIMSolidFill",
                enable: true,
                color: [0, 0, 255, 255],
              },
            ],
          },
        },
      ],
      scaleSymbolsProportionally: true,
      respectFrame: true,
      colorLocked: false,
    },
  ],
};
const symbology = new CIMSymbol({ data: { type: "CIMSymbolReference", symbol } });

export const showPoints = async (places, view, Graphic, Point, loader, costumerKey) => {
  Object.keys(places).forEach(async (place) => {
    const content = await infoPlace(place.replace(/_/g, " "), "getStoryPlaces", loader, costumerKey);
    const {longitud, latitud} = places[place];

    const locationMap = [longitud, latitud];
    view.graphics.add(
      new Graphic({
        // // Data attributes returned
        geometry: new Point(locationMap),
        symbol: symbology,

        popupTemplate: {
          title: place.replace(/_/g, " "),
          content: `<p><br>${content}</p>`,
        },
      })
    );
  });
  
  setTimeout(() => {

      loader.style.display = "none";
  }, 2000);

};
