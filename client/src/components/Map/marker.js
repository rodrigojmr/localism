//     let marker;
//      const latitudeInputElement = document.getElementById('latitude-input');
//      console.log(latitudeInputElement)
//     const longitudeInputElement = document.getElementById('longitude-input');
//     map.addListener('click', event => {
//       const latitude = event.latLng.lat();
//       const longitude = event.latLng.lng();
//       if (marker) {
//         marker.setMap(null);
//       }
//       marker = new window.google.maps.Marker({
//         map,
//         position: {
//           lat: latitude,
//           lng: longitude
//         }
//       });
//       latitudeInputElement.value = latitude;
//       longitudeInputElement.value = longitude;
//     });
//  }
