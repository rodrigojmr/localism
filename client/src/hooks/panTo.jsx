import React from 'react';

const panTo = (map, zoom, { lat, lng }) => {
  map.current.setZoom(zoom);
  map.current.panTo({ lat, lng });
};

export default panTo;
