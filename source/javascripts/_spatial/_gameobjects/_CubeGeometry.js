Spatial.CubeGeometry = function(width, height, depth, widthSegments, heightSegments, depthSegments) {

  THREE.CubeGeometry.call(this, width, height, depth, widthSegments, heightSegments, depthSegments);
};

Spatial.CubeGeometry.prototype = new THREE.CubeGeometry();
Spatial.CubeGeometry.prototype.constructor = Spatial.CubeGeometry;
Spatial.CubeGeometry.prototype.supr = THREE.Object3D.prototype;