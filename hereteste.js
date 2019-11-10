function setUpClickListener(map) {
  // Attach an event listener to map display
  // obtain the coordinates and display in an alert box.
  map.addEventListener("tap", function(evt) {
    var coord = map.screenToGeo(
      evt.currentPointer.viewportX,
      evt.currentPointer.viewportY
    );
    //alert("Lat: " + coord.lat.toFixed(6) + " | Long: " + coord.lng.toFixed(6));
  });
}

function caronaMarker(map, data) {
  //map.addEventListener("tap", function(evt))
  var newMarker = new H.map.Marker({ lat: data.lat, lng: data.lng });
  map.addObject(newMarker);
}

function addMarkerToGroup(group, coordinates, html) {
  var marker = new H.map.Marker(coordinates);
  //add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
}

function addInfoBubble(map) {
  var group = new H.map.Group();
  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener(
    "tap",
    function(evt) {
      console.log(evt.target.getData());
      // event target is the marker itself, group is a parent event target
      // for all objects that it contains
      var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
        //read custom data
        content: evt.target.getData()
      });
      //show info bubble
      ui.addBubble(bubble);
    },
    false
  );

  addMarkerToGroup(
    group,
    { lat: -27.601111, lng: -48.52 },
    ` 
      UFSC   
      Universidade Federal de Santa Catarina
      <button class="btnCarona" id="ufsc">Criar Carona</button>
    `
  );
  addMarkerToGroup(
    group,
    { lat: -27.5479, lng: -48.4978 },
    `
     SENAI
     Serviço Nacional de Aprendizagem Industrial 
     <button class="btnCarona" id="senai">Criar Carona</button>
    `
  );
  addMarkerToGroup(
    group,
    { lat: -27.586, lng: -48.5049 },
    `
     UDESC
     Universidade do Estado de Santa Catarina 
     <button class="btnCarona" id="udesc">Criar Carona</button>
    `
  );
  addMarkerToGroup(
    group,
    { lat: -27.54338, lng: -48.50351 },
    ` 
    UNIVALE 
    Universidade do Vale do Itajai 
    <button class="btnCarona" id="univale">Criar Carona</button>
    `
  );
  addMarkerToGroup(
    group,
    { lat: -27.59418, lng: -48.54325 },
    `
     IFSC - Mauro Ramos 
     Instituto Federal de Santa Catarina (Campus Mauro Ramos) 
     <button class="btnCarona" id="ifscCen">Criar Carona</button>
     `
  );
  addMarkerToGroup(
    group,
    { lat: -27.59704, lng: -48.57133 },
    ` 
    IFSC - Continente 
    Instituto Federal de Santa Catarina (Campus Continente) 
    <button class="btnCarona" id="ifscCon">Criar Carona</button>
    `
  );
}

// Obtain the default map types from the platform object:
var platform = new H.service.Platform({
  apikey: "JTmW8dYA61h9fZ39sGHsfsorV2KDWYHlWRlyC3kPGa4"
});
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById("map"),
  defaultLayers.vector.normal.map,
  {
    zoom: 17,
    center: { lat: -27.547, lng: -48.497 }
  }
);

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener("resize", () => map.getViewPort().resize());

// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers);
// Enable the event system on the map instance:

// Add event listeners:

// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// window.onload = function() {
//   addMarkersToMap(map);
// };

addInfoBubble(map);
setUpClickListener(map);
//caronaMarker(map);
