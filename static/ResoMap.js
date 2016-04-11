/**
 * Created by Chema on 04/12/2015.
 */
function refreshCenter(){
    //alert(map.getCenter());
    $("#Lat").val( map.getCenter().lat()) ;
    $("#Lng").val(map.getCenter().lng());
}


function Resource(id,name,lat,lng,skills)
{
    this.ResoID = id;
    this.Name = name;
    this.Lat = lat;
    this.Lng = lng;
    this.Skills = skills;
}

$(document).ready(function()
{
    // Initialize data (first entry)

    $("#searchSkill").click(searchSkill);
    $("#save").click(saveReso);

});

var resources = [];
var map;

function initialize() {
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
        center: new google.maps.LatLng(32, 0),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions);
    map.addListener('center_changed', refreshCenter);
    //geocoder = new google.maps.Geocoder();
    //var xhttp = new XMLHttpRequest();
    // "GET", "/loadDrawings/",true
    $.ajax({
        url: "/loadResources/",
        success: function (result) {
            var data = result;
            var resoStrings = data.split(";");
            for (var i = 0; i < resoStrings.length; i++) {
                var resoString = resoStrings[i];
                var attributeStrings = resoString.split(",");
                var newResource = new Resource(attributeStrings[0], attributeStrings[1], attributeStrings[2], attributeStrings[3], attributeStrings[4], attributeStrings[5]);
                if (newResource.ResoID != "")
                    resources.push(newResource);
            }
            //alert("A total of " +resources.length + " resources are added to the array.");

            //Create markers
            for (i=0;i<resources.length;i++){

                var contentString = '<div id="content">'+
                  '<div id="siteNotice">'+
                  '</div>'+
                  '<h1 id="firstHeading" class="firstHeading">'+resources[i].Name+'</h1>'+
                  '<div id="bodyContent">'+
                  '<p>'+resources[i].Skills+'</p>'+
                  '</div>'+
                  '</div>';

                 var marker = new google.maps.Marker({
                    position: {lat: parseFloat(resources[i].Lat), lng: parseFloat(resources[i].Lng)},
                    label: resources[i].Name,
                    content: contentString,
                    //icon: ‘path to the image file’,
                    //animation: google.maps.Animation.DROP,
                    map: map
                    });

                // Add infowindow
                /*var infowindow = new google.maps.InfoWindow({
                    //content: this.content;
                    });*/

                var infowindow = new google.maps.InfoWindow()
                marker.addListener('click', function() {
                    infowindow.setContent(this.content)
                    infowindow.setPosition(this.position)
                    //alert(this.content);
                    infowindow.open(map, this.marker);
                 });
        } // for
        }
    });
    refreshCenter();
}

google.maps.event.addDomListener(window, 'load', initialize);

function searchSkill() {
    //alert (mapCenter);
    $.ajax({url:"/searchResource/"+ "?skill=" + document.getElementById("searchBar").value
        + "&lat1=" +  map.getCenter().lat() + "&lng1=" + map.getCenter().lng(), //$('#searchBar').val(),
        success:function(result) {
            //alert(result);
            // Point and open the ID received
            var location = {lat: parseFloat(resources[result].Lat), lng: parseFloat(resources[result].Lng)};
            map.setCenter(location);

            var i = result;
            var contentString = '<div id="content">'+
                  '<div id="siteNotice">'+
                  '</div>'+
                  '<h1 id="firstHeading" class="firstHeading">'+resources[i].Name+'</h1>'+
                  '<div id="bodyContent">'+
                  '<p>'+resources[i].Skills+'</p>'+
                  '</div>'+
                  '</div>';

            var marker = new google.maps.Marker({
                    position: location,
                    label: resources[i].Name,
                    content: contentString,
                    //icon: ‘path to the image file’,
                    //animation: google.maps.Animation.DROP,
                    map: map
                    });

                // Add infowindow
                /*var infowindow = new google.maps.InfoWindow({
                    //content: this.content;
                    });*/

                var infowindow = new google.maps.InfoWindow({
                    content:contentString,
                    position: location
                });
            infowindow.open(map, marker);

        }
    });
}


function saveReso() {
     $.ajax({
         url: "/saveResource/" + "?Name=" + document.getElementById("Name").value
         + "&Lat=" + map.getCenter().lat() + "&Lng=" + map.getCenter().lng()
         + "&Skills=" + document.getElementById("skills").value, //$('#searchBar').val(),
         success: function (result){
             initialize();
             }
         });

}