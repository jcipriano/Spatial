Spatial.SpatialCubeGeometry = function(width, height, depth, widthSegments, heightSegments, depthSegments) {
  //console.log('Spatial.SpatialCubeGeometry');

  THREE.CubeGeometry.call(this, width, height, depth, widthSegments, heightSegments, depthSegments);
};

Spatial.SpatialCubeGeometry.prototype = new THREE.CubeGeometry();
Spatial.SpatialCubeGeometry.prototype.constructor = THREE.MyCubeGeometry;
Spatial.SpatialCubeGeometry.prototype.supr = THREE.Object3D.prototype;