
<div class="container"> 
<div class="create-bar">
<h4>🚀 Create a moment, make history.</h4>
</div>

 <form method="POST" enctype="multipart/form-data"> 
  <div class="row bg-light border-0 shadow m-0 p-0"> 
   <div class="col-sm-6  m-0 p-0">
    <div class="card bg-light">
     <div class="card-body">
       {{!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > FEELING <- --}}
        <p  class="card-title">How are you feeling</h5>
            <select name="feeling">
             <option type="text"  value="Amused"> Amused </option>
             <option type="text"  value="Anxious"> Anxious </option>
             <option type="text"  value="Brave">  Brave</option>
             <option type="text"  value="Happy">  Happy</option>
             <option type="text"  value="Inspired"> Inspired </option>
             <option type="text"  value="Loved"> Loved </option>
             <option type="text"  value="Relaxed">  Relaxed</option>
             <option type="text"  value="Upset">  Upset</option>
            </select>
          <h5 class="card-text"> 
          {{!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > DESCRIPTION <- --}}

      <label for="description-input">Describe the moment in three words:</label> <br>
     <input id="description-input" type="text" placeholder="Funny, Memorable, Sunset" name="description" minlength="10" maxlength="100"></h5>
      {{!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > LOCATION <- --}}
      <h5 class="card-text">Where?...search on map! </h5>
      <input id="pac-input" class="controls" type="text" placeholder="Locate this Moment"/>
     </div>
    </div>
   </div> 
  
    <div class="card shadow" id="map">  </div> 
       <label for="latitude-input"></label>
       <input type="hidden" id="latitude-input" type="text" placeholder="Latitude" name="latitude">
  
        <label for="longitude-input"></label>
        <input  type="hidden" id="longitude-input" type="text" placeholder="Longitude" name="longitude"> 
   </div>

{{!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > LEARNING <- --}}
  <label for="learning-input">What did you learn in this moment?</label>

  <input id="learning-input" type="text" placeholder="I learned to dust off my ass and keep moving."  class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" name="learning"  minlength="3" maxlength="100">

{{!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > GRATITUDE <- --}}

  <label for="gratitude-input">What are you grateful for in this moment?</label>
  <input id="gratitude-input" type="text" placeholder="I am grateful for this moment!"  class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" name="gratitude"  minlength="3" maxlength="100">

{{!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - > IMAGE <- --}}
  <div class="d-flex justify-content-space-between">
  <h4> <b>  Capture the moment: </b></h4>
  <input class="fil" type="file" name="photo">
</div>
  

  <button>Ubelimi</button>

</form>




<script>

 function init() {
   const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 38.75, lng: -9.15 },
    zoom: 11,
    mapTypeId: "roadmap"
    });
    
    
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
   
   searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
   
     const bounds = new google.maps.LatLngBounds();
     places.forEach(place => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
     
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    });
 
  
    let marker;
     const latitudeInputElement = document.getElementById('latitude-input');
     console.log(latitudeInputElement)
    const longitudeInputElement = document.getElementById('longitude-input');
    map.addListener('click', event => {
      const latitude = event.latLng.lat();
      const longitude = event.latLng.lng();
      if (marker) {
        marker.setMap(null);
      }
      marker = new window.google.maps.Marker({
        map,
        position: {
          lat: latitude,
          lng: longitude
        }
      });
      latitudeInputElement.value = latitude;
      longitudeInputElement.value = longitude;
    });
 }
  
</script>

{{> mapscript}}