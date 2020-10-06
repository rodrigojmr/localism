import { useState, useEffect } from 'react';

const useLocation = () => {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }

    const watcher = geo.watchPosition(onChange, onError, options);

    return () => geo.clearWatch(watcher);
  }, []);

  const onError = error => {
    setError(error.message);
  };

  const onChange = ({ coords }) => {
    setLocation({
      lat: coords.latitude,
      lng: coords.longitude
    });
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  return { ...location, error };
};

export default useLocation;
