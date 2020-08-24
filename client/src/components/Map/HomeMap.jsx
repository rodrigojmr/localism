import React, { Component } from 'react';

import SearchName from './../Search/SearchName';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Autocomplete
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from '@reach/combobox';
import './../../App.css';
import '@reach/combobox/styles.css';

import MapStyles from '../../MapStyles';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '80vh'
};

const options = {
  styles: MapStyles,
  //disableDefaultUI: true,
  zoomControl: true
};

// export class HomeMap extends Component {
//   constructor() {
//     this.state = {
//       markers: []
//     };
//   }

//   componentDidMount() {

//   }

//   render() {
//     return <div></div>;
//   }
// }

// export default HomeMap;

const Map = props => {
  //setState on marker click and retrieve value when clicked by user
  const [selected, setSelected] = React.useState(null);

  //use this to reference the map without causing re-renders
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  const getBoundaries = () => {
    let ne = mapRef.current.getBounds().getNorthEast();
    let sw = mapRef.current.getBounds().getSouthWest();

    const boundaries = {
      neLat: ne.lat(),
      neLng: ne.lng(),
      swLat: sw.lat(),
      swLng: sw.lng()
    };

    props.idleMapSearch(boundaries);
  };

  const onMapIdle = () => {
    getBoundaries();
  };

  const handleResultInfo = result => {
    const obj = {
      formatted_address: result.formatted_address,
      address_components: result.address_components,
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng()
    };

    console.log('obj: ', obj);
    for (let key in obj) {
      props.resultInfoHandler(key, obj[key]);
    }
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={props.center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
        onIdle={onMapIdle}
      >
        {props.places.length && (
          <>
            {props.places.map(place => {
              return (
                <Marker
                  key={place.place_id}
                  position={{
                    lat: place.location.coordinates[0],
                    lng: place.location.coordinates[1]
                  }}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'
                  }}
                  onClick={() => {
                    setSelected(place);
                  }}
                />
              );
            })}
          </>
        )}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.location.coordinates[0],
              lng: selected.location.coordinates[1]
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.name}</h2>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <SearchName
        handleResultInfo={handleResultInfo}
        // setMarker={setMarker}
        panTo={panTo}
      />
    </div>
  );
};

export default Map;
