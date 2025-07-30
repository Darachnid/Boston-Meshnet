const viewer = new Cesium.Viewer('cesiumContainer', {
  sceneMode: Cesium.SceneMode.SCENE2D,
  imageryProvider: new Cesium.UrlTemplateImageryProvider({
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    credit: ''
  }),
  baseLayerPicker: false,
  animation: false,
  timeline: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false
});

let countryLayer = null;

const baseLayers = {
  osm: new Cesium.UrlTemplateImageryProvider({
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    credit: ''
  }),
  satellite: new Cesium.UrlTemplateImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    credit: ''
  }),
  hillshade: new Cesium.UrlTemplateImageryProvider({
    url: 'https://tile.opentopomap.org/{z}/{x}/{y}.png',
    credit: ''
  })
};

function setBaseLayer(name) {
  viewer.imageryLayers.removeAll();
  viewer.imageryLayers.addImageryProvider(baseLayers[name]);
}

async function addCountries(mode) {
  if (countryLayer) {
    viewer.dataSources.remove(countryLayer);
  }
  countryLayer = await Cesium.GeoJsonDataSource.load('data/countries.geojson');
  viewer.dataSources.add(countryLayer);
  const entities = countryLayer.entities.values;
  for (let i = 0; i < entities.length; i++) {
    const e = entities[i];
    let color = Cesium.Color.fromRandom({ alpha: 0.6 });
    if (mode === 'population' || mode === 'density') {
      const pop = e.properties.POP_EST ? e.properties.POP_EST.getValue() : 0;
      const dens = e.properties.POP_DEN ? e.properties.POP_DEN.getValue() : 0;
      const val = mode === 'population' ? pop : dens;
      const scale = Math.min(val / (mode === 'population' ? 1e8 : 500), 1.0);
      color = Cesium.Color.fromHsl(0.6 - scale * 0.6, 0.6, 0.5, 0.6);
    }
    e.polygon.material = color;
    e.polygon.outline = false;
  }
}

document.getElementById('basemapSelect').addEventListener('change', e => {
  const val = e.target.value;
  if (val.startsWith('countries')) {
    const mode = val.split('-')[1];
    setBaseLayer('osm');
    addCountries(mode);
  } else {
    if (countryLayer) {
      viewer.dataSources.remove(countryLayer);
      countryLayer = null;
    }
    setBaseLayer(val);
  }
});

const socket = io();
const overlay = document.getElementById('overlay');

// Example: update overlay from server events
socket.on('propagationUpdate', data => {
  overlay.textContent = `Last update: ${new Date().toLocaleTimeString()}`;
});
