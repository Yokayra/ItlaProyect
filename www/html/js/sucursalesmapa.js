var ubicacion = {"latitud1":"18.468751",
				"longitud1":"-69.940210",
				"latitud2":"18.472763",
				"longitud2":"-69.925965",
				"latitud3":"18.451771",
				"longitud3": "-69.952231",
				"latitud4":"18.478682",
				"longitud4":"-69.898689",
				"latitud5":"18.478071",
				"longitud5":"-69.944153"}
function initialize() {
  var myLatlng = new google.maps.LatLng(ubicacion.latitud1,ubicacion.longitud1); 
  var myLatlng2 = new google.maps.LatLng(ubicacion.latitud2,ubicacion.longitud2); 
  var myLatlng3 = new google.maps.LatLng(ubicacion.latitud3,ubicacion.longitud3); 
  var myLatlng4 = new google.maps.LatLng(ubicacion.latitud4,ubicacion.longitud4); 
  var myLatlng5 = new google.maps.LatLng(ubicacion.latitud5,ubicacion.longitud5);
  var mapOptions = {
    zoom: 13,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Barra Payan(Evaristo Morales)'
  });
  
    var marker2 = new google.maps.Marker({
      position: myLatlng2,
      map: map,
      title: 'Barra Payan(Naco)'
  });
    var marker3 = new google.maps.Marker({
      position: myLatlng3,
      map: map,
      title: 'Barra Payan(Rómulo Betancourt)'
  });
    var marker4 = new google.maps.Marker({
      position: myLatlng4,
      map: map,
      title: 'Barra Payan(30 de Marzo)'
  });
    var marker5 = new google.maps.Marker({
      position: myLatlng5,
      map: map,
      title: 'Barra Payan(Winston Churchill)'
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


