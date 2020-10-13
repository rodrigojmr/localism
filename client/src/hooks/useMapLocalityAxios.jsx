import React from 'react';
import axios from 'axios';
import { useLoadScript } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const useMapLocality = center => {
  const [loading, setLoading] = useState(false);
  const [localityError, setLocalityError] = useState(false);
  const [mapLocality, setMapLocality] = useState('');

  const fetchLocality = async center => {
    const { lat, lng } = center;
    if (!lat && !lng) return;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=pt&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    try {
      setLoading(true);
      const res = await axios.get(url);
      const locality = res.data.results[0].address_components.find(
        component =>
          component.types.includes('locality') ||
          component.types.includes('administrative_area_level_1')
      ).short_name;
      if (locality !== undefined) {
        setMapLocality(locality);
      } else {
        setLocalityError(true);
      }
      setLoading(false);
    } catch (localityError) {
      setLoading(false);
      setLocalityError(true);
    }
  };

  useEffect(() => {
    if (!center) return;
    fetchLocality(center);
  }, [center]);
  return [mapLocality, loading, localityError, fetchLocality];
};

export default useMapLocality;

// const getLocality = async center => {
//   const locality = () => {
//     return new Promise((resolve, reject) => {
//       const geocoder = new window.google.maps.Geocoder();
//       geocoder.geocode({ location: center }, function(results, status) {
//         if (status === 'OK') {
//           resolve(
//             results[0].address_components.find(
//               component =>
//                 component.types.includes('locality') ||
//                 component.types.includes('administrative_area_level_1')
//             ).short_name
//           );
//         } else {
//           reject(new Error('No results found.'));
//         }
//       });
//     });
//   };
//   setMapLocality(await locality());
// };
