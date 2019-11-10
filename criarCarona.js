btn_carona = document.getElementById("btn-carona");

btn_carona.addEventListener("click", () => {
  console.log("clicou");
  // if ("geolocation" in navigator) {
  getPosition(locationOptions)
    .then(response => {
      let obj_position = {
        latitude: response.coords.latitude.toFixed(6),
        longitude: response.coords.longitude.toFixed(6)
      };
      console.log(obj_position.latitude + " " + obj_position.longitude);
    })
    .catch(err => {
      // CHECK ERROR MESSAGE
      if (err.message === "User denied Geolocation") {
        // CHECK BROWSER - MOZILLA ALLOWS TO REVOKE PERMISSIONS
        if (navigator.userAgent.includes("Firefox")) {
          appHideLoading(spinner, spinner.children[0]);
          navigator.permissions.revoke({ name: "geolocation" }).then(result => {
            report(result.state);
          });
        }
        // OTHER BROWSERS NOT ALLOW TO REVOKE PERMISSIONS
        else {
          appHideLoading(spinner, spinner.children[0]);
          appShowDialog({
            element: dialog,
            title: "Erro",
            message:
              "A permissão para localização foi negada, por favor acesse as configurações da aplicação para alterar.",
            btn_ok() {
              appHideDialog(dialog);
            }
          });
        }
      } else {
        appHideLoading(spinner, spinner.children[0]);
        appShowSnackBar(snackbar, "Ocorreu um erro, por favor tente novamente");
      }
    });
  addCircleToMap(
    map,
    {
      lat: -27.631235,
      lng: -48.528737
    },
    1000
  );
});

// FUNCTION TO GET CURRENT POSITION
getPosition = options => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

// LOCATION OPTIONS
locationOptions = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

//SEARCH RADIUS

var circle = null;
addCircleToMap = (map, coordinates, distance) => {
  circle = new H.map.Circle(
    // The central point of the circle
    coordinates,
    // The radius of the circle in meters
    distance,
    {
      style: {
        strokeColor: "rgba(31, 38, 42, 1)",
        lineWidth: 2,
        fillColor: "rgba(31, 38, 42, 0.3)"
      }
    }
  );
  map.addObject(circle);
};
