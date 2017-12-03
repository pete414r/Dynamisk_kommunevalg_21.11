/**************KORT**INFOVINDUE************/

var map;

window.addEventListener("load", initMap);

function initMap() {
	var center = {
		lat: 55.689056,
		lng: 12.597405
	};
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 3,
		center: center
	});
	$.getJSON("json/map_info.json", visKort);
	var mig = new google.maps.Marker({
		map: map,
		icon: "images_turen/region_map/pointer_5turen.png",
		title: "Husk at stemme"
	});
	if (navigator.geolocation) {
		navigator.geolocation.watchPosition(function (position) {
			console.log("SE DIN POSITION");
			var minPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(minPos);
			mig.setPosition(minPos);
		});
	} else {
		alert("Geolocation NOT");
	}

	function visKort(listen)  {
		console.log(listen);
		listen.forEach(visPunktInfo);
	}
	var bounds = {
		north: 58.12807374519922,
		south: 53.17738038244198,
		east: 15.879176749999942,
		west: 7.090114249999942
	}
	var overlay = new google.maps.GroundOverlay("images_turen/kort_kv17_google_A12.svg", bounds);
	overlay.setMap(map);

	function visPunktInfo(punkt) {
		console.log("Vis info");
		console.log("id: " + punkt.id);
		console.log("lat: " + punkt.lat);
		console.log("lng: " + punkt.lng);
		var ll = new google.maps.LatLng(punkt.lat, punkt.lng);
		var m = new google.maps.Marker({
			position: ll,
			map: map,
			icon: "images_turen/region_map/pointer_5turen.png",
			title: "Her finder du regioner og kommuner, hvor de unge bor",
			animation: google.maps.Animation.DROP,
			icon: punkt.icon
		});
		var infowindow = new google.maps.InfoWindow({
			maxWidth: 320
		});
		m.addListener("click", visinfo);

		function visinfo() {
			var tempinfo =
				document.querySelector("#kort").content.cloneNode(true);
			tempinfo.querySelector(".h2class").innerHTML = punkt.id;
			tempinfo.querySelector(".res-responsive").src = punkt.images1;
			tempinfo.querySelector(".aclass").href = punkt.txt;
			tempinfo.querySelector(".aclass").innerHTML = punkt.txt;
			tempinfo.querySelector(".aclass").target = "_blank";
			tempinfo.querySelector(".pclass").innerHTML = punkt.title;

			infowindow.setContent(tempinfo);
			infowindow.open(map, m);
		}
	}
}

/**************KORT**INFOVINDUE**SLUT**********/

/**************INFOGRAFIK**VALGTUREN**********/

var valgte;
var info;
var aktiv;
$('#valgturen').load("images_turen/infografik/cs_infografik_opacity_radius.svg", kortHentet);

function kortHentet() {
	$.getJSON("json/grafik_info.json", dataHentet);
};

function dataHentet(data) {
	info = data;

	$("#valgturen svg g g").on("mouseenter", onEnter);

	$("#valgturen svg g g").on("mouseleave", onOut);
}

function onEnter(e) {
	aktiv = $(e.currentTarget).children();
	valgte = $(e.currentTarget).closest("g").attr("id");
	console.log(valgte);
	info.forEach(visTekst);
	if (valgte == "tur1") {
		console.log("test");
		$(".arrow").css("transform", "scaleX(-1)");
		$(".arrow").css("margin-left", "12vw");
		$("#section2 h4").css("margin-left", "7vw");
	}
	if (valgte == "tur2") {
		$(".arrow").css("transform", "scaleX(1)");
		$(".arrow").css("margin-left", "20vw");
		$("#section2 h4").css("margin-left", "26vw");
	}
	if (valgte == "tur3") {
		$(".arrow").css("transform", "scaleX(1)");
		$(".arrow").css("margin-left", "34vw");
		$("#section2 h4").css("margin-left", "38vw");
	}
	if (valgte == "tur4") {
		$(".arrow").css("transform", "scaleX(1)");
		$(".arrow").css("margin-left", "59vw");
		$("#section2 h4").css("margin-left", "67vw");
	}
	if (valgte == "tur5") {

		$(".arrow").css("transform", "scaleX(1)");
		$(".arrow").css("margin-left", "45vw");
		$("#section2 h4").css("margin-left", "50vw");
	}
};

function onOut() {}

function visTekst(val) {
	if (val.id == valgte) {
		document.querySelector("#section2 h4").textContent = val.sted;
		document.querySelector("#section2 h5").textContent = val.beskrivelse;
	}
};

/**************INFOGRAFIK**VALGTUREN***SLUT*******/
window.addEventListener("load", start);


function start() {
	console.log("Start programmet");

	$.getJSON("json/region_info.json", vistekstLuften);
}

function vistekstLuften(listen) {
	console.table(listen);
	listen.forEach(vistekstUnion);
}

function vistekstUnion(tekst)  {
	// teksten tekst templ

	var teksten = document.querySelector("#tekstenunion_template").content.cloneNode(true);
	// til teksten
	teksten.querySelector(".data_fornavn_reg").innerHTML = tekst.fornavn_reg;
	teksten.querySelector(".data_fornavn").innerHTML = tekst.fornavn;
	teksten.querySelector(".data_efternavn").innerHTML = tekst.efternavn;
	teksten.querySelector(".data_fornavn_reg_modal").innerHTML = tekst.fornavn_reg_modal;
	teksten.querySelector(".data_fornavn_modal").innerHTML = tekst.fornavn_modal;
	teksten.querySelector(".data_alder").innerHTML = tekst.alder;

	teksten.querySelector(".data_billede_reg").src = "images_turen/button_region_small/" + tekst.billede_reg + "-sm.svg";
	teksten.querySelector(".data_billede").src = "images_turen/button_region_small/" + tekst.billede + "-sm.svg";

	teksten.querySelector(".data_yndlingsfarve_reg").style.backgroundColor = tekst.yndlingsfarve_reg;
	teksten.querySelector(".data_yndlingsfarve").style.backgroundColor = tekst.yndlingsfarve;
	teksten.querySelector(".data_bopæl").innerHTML = tekst.bopæl;
	teksten.querySelector(".data_vægttekst_reg").innerHTML = tekst.vægttekst_reg;
	teksten.querySelector(".data_vægt_reg").innerHTML = tekst.vægt_reg;
	teksten.querySelector(".data_højdetekst_reg").innerHTML = tekst.højdetekst_reg;
	teksten.querySelector(".data_højde_reg").innerHTML = tekst.højde_reg;
	teksten.querySelector(".data_vægttekst").innerHTML = tekst.vægttekst;
	teksten.querySelector(".data_vægt").innerHTML = tekst.vægt;
	teksten.querySelector(".data_højdetekst").innerHTML = tekst.højdetekst;
	teksten.querySelector(".data_højde").innerHTML = tekst.højde;
	teksten.querySelector(".data_uddannelse").innerHTML = tekst.uddannelse;
	teksten.querySelector(".data_idol").innerHTML = tekst.idol;
	teksten.querySelector(".data_kæledyr").innerHTML = tekst.kæledyr;
	teksten.querySelector(".data_hobby").innerHTML = tekst.hobby;
	teksten.querySelector(".aclass").href = tekst.kortbeskrivelse;
	teksten.querySelector(".aclass").target = "_blank";
	teksten.querySelector(".aclass").innerHTML = tekst.kortbeskrivelse;
	teksten.querySelector(".aclass_øjenfarve").href = tekst.kortbeskrivelse;
	teksten.querySelector(".aclass_øjenfarve").target = "_blank";
	teksten.querySelector(".aclass_øjenfarve").innerHTML = tekst.øjenfarve;
	teksten.querySelector(".aclass_hårfarve").href = tekst.kortbeskrivelse;
	teksten.querySelector(".aclass_hårfarve").target = "_blank";
	teksten.querySelector(".aclass_hårfarve").innerHTML = tekst.hårfarve;
	teksten.querySelector(".modal").id = "modal" + tekst.id;
	teksten.querySelector(".modalknap").dataset.target = "#modal" + tekst.id;

	// teksten til tekst div
	document.querySelector("#teksten_union").appendChild(teksten);
}

/**************PARTIINFO**MODAL**SLUT***********************/

/**************LUKKEKLIK**BURGERBAR********/

$(document).ready(function () {
	console.log("start");
	$(".lukkeklik").click(function () {
		var navbar_toggle = $('.navbar-toggle');
		if (navbar_toggle.is(':visible')) {
			navbar_toggle.trigger('click');
		}
	});
});

/**************LUKKEKLIK**BURGERBAR**SLUT******/

/**************FLOWDING**BACKGROUND******************/

$(document).ready(function () {
	var movementStrength = 50000;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();
	$("#top-image").mousemove(function (e) {
		var pageX = e.pageX - ($(window).width() / 2);
		var pageY = e.pageY - ($(window).height() / 2);
		var newvalueX = width * pageX * -1 - 25000;
		var newvalueY = height * pageY * -1 - 50000;
		$('#top-image').css("background-position", newvalueX + "px     " + newvalueY + "px");
	});
});

/**************FLOWDING**BACKGROUND**SLUT****************/

/**************SLOW**LINK******************/


$(document).ready(function () {
	// Add smooth scrolling to all links
	$("a").on('click', function (event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			//  hash
			var hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 600, function () {

				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		} // End if
	});
});

/**************SLOW**LINK***SLUT***************/
/************FB**like*LINK******************/

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/da_DK/sdk.js#xfbml=1&version=v2.11';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
/************FB**like*LINK**slut****************/
