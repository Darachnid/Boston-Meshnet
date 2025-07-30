const BASEMAPS = {
  satellite: Cesium.createWorldImagery(),
  hillshade: new Cesium.IonImageryProvider({ assetId: 3954 }) // global hillshade
};

const viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: BASEMAPS.satellite,
  sceneMode: Cesium.SceneMode.SCENE2D,
  baseLayerPicker: false,
  geocoder: false,
  timeline: false,
  animation: false,
  creditContainer: document.createElement('div') // hide default credits
});

// Optionally switch base layers
function setBasemap(name) {
  const layer = viewer.imageryLayers.get(0);
  layer.imageryProvider = BASEMAPS[name] || BASEMAPS.satellite;
}

// Color countries
function colorCountries(option = 'random') {
  Cesium.GeoJsonDataSource.load('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
    .then(ds => {
      viewer.dataSources.add(ds);
      ds.entities.values.forEach(entity => {
        let color;
        if (option === 'population') {
          const pop = entity.properties.POP_EST || 0;
          color = Cesium.Color.YELLOW.withAlpha(Math.min(pop / 1e8, 0.8) + 0.2);
        } else if (option === 'density') {
          const pop = entity.properties.POP_EST || 0;
          const area = entity.properties.AREA || 1;
          color = Cesium.Color.RED.withAlpha(Math.min(pop / area / 500, 0.8) + 0.2);
        } else {
          color = Cesium.Color.fromRandom({ alpha: 0.5 });
        }
        entity.polygon.material = color;
        entity.polygon.outline = false;
      });
    });
}

// Hide Cesium credit text if any remain
viewer.cesiumWidget.creditContainer.style.display = 'none';

const socket = io();
const overlay = document.getElementById('overlay');

// Example: update overlay from server events
socket.on('propagationUpdate', data => {
  overlay.textContent = `Last update: ${new Date().toLocaleTimeString()}`;
});
