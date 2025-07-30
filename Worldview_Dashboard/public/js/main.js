const viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: new Cesium.TileMapServiceImageryProvider({
    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
  }),
  baseLayerPicker: false,
  sceneMode: Cesium.SceneMode.SCENE2D,
  animation: false,
  timeline: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  infoBox: false
});

viewer.scene.screenSpaceCameraController.enableInputs = false;
viewer.cesiumWidget.creditContainer.style.display = 'none';

function switchBasemap(type) {
  viewer.imageryLayers.removeAll();
  let provider;
  if (type === 'satellite') {
    provider = new Cesium.IonImageryProvider({ assetId: 3 });
  } else if (type === 'hillshade') {
    provider = new Cesium.IonImageryProvider({ assetId: 3954 });
  } else {
    provider = new Cesium.TileMapServiceImageryProvider({
      url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
    });
  }
  viewer.imageryLayers.addImageryProvider(provider);
}

async function loadCountries(mode = 'random') {
  const dataSource = await Cesium.GeoJsonDataSource.load('data/countries.geojson', {
    clampToGround: true
  });
  const entities = dataSource.entities.values;
  let maxPop = 0;
  if (mode === 'population') {
    for (const e of entities) {
      const p = e.properties.POP_EST;
      if (Cesium.defined(p) && p > maxPop) maxPop = p;
    }
  }
  for (const entity of entities) {
    let color;
    if (mode === 'population') {
      const pop = entity.properties.POP_EST;
      const t = Cesium.defined(pop) ? Math.min(pop / maxPop, 1.0) : 0.0;
      color = Cesium.Color.fromHsl(0.6 - 0.6 * t, 1.0, 0.5, 0.6);
    } else {
      color = Cesium.Color.fromRandom({ alpha: 0.6 });
    }
    entity.polygon.material = color;
  }
  viewer.dataSources.add(dataSource);
}

switchBasemap('natural');
loadCountries('population');

const socket = io();
const overlay = document.getElementById('overlay');

// Example: update overlay from server events
socket.on('propagationUpdate', data => {
  overlay.textContent = `Last update: ${new Date().toLocaleTimeString()}`;
});
