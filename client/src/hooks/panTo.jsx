import React from 'react';

const panTo = (map, { lat, lng }) => {
  map.current.setZoom(15);
  map.current.panTo({ lat, lng });
};

export default panTo;
