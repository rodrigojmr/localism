import { useLoadScript } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const useMapLocality = defaultCenter => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'pt'
  });

  const [mapLocality, setMapLocality] = useState('');

  useEffect(() => {
    (async () => {
      const locality = await getLocality(defaultCenter);
      setMapLocality(locality);
    })();
  }, [defaultCenter]);

  const getLocality = center => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: center }, function(results, status) {
        if (status === 'OK') {
          resolve(
            results[0].address_components.find(
              component =>
                component.types.includes('locality') ||
                component.types.includes('administrative_area_level_1')
            ).short_name
          );
        } else {
          reject(new Error('No results found.'));
        }
      });
    });
  };

  const setLocality = async center => {
    const locality = await getLocality(center);
    setMapLocality(locality);
  };

  return [mapLocality, setLocality];
};

export default useMapLocality;
