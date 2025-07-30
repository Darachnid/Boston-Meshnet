const viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: new Cesium.IonImageryProvider({ assetId: 3 }),
  baseLayerPicker: false
});

const socket = io();
const overlay = document.getElementById('overlay');

// Example: update overlay from server events
socket.on('propagationUpdate', data => {
  overlay.textContent = `Last update: ${new Date().toLocaleTimeString()}`;
});
