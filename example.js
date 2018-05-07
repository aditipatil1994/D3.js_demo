function myFunction() {
var x = document.getElementById("myDIV");
     if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
d3.csv("states.csv", function(d) {
  return {
    state: d.Abbreviation,
    medHouseIncome: +d.medianHouseholdIncome.replace(",", ""),
  };

}, function(data) {
  d3.select("demo").style("background-color", "black");
  const map = new Datamap({
    scope: "usa",
    element: document.getElementById("mapContainer"),
	
    responsive: true,
    geographyConfig: {
      highlightOnHover: true,
      popupTemplate: function(geo) {
		function findState(states) {				
          return states.state == geo.id;
        }
        return ["<div class='hoverinfo'><strong>",
          geo.properties.name,
          ": $" + data.find(findState).medHouseIncome,
          "</strong></div>"].join("");		 
      }
    }
  });

 var a1000 = '#41d3f4';
 var a2000 = '#4286f4';
var  a3000 = '#f44150';
  var  a4000 = '#f4e841';
 var   a5000 = '#97ED8A';

  for (var i = 0; i < data.length; i++) {
    let st = d3.select("." + data[i].state);
	console.log(data[i].state);
    if (data[i].medHouseIncome < 1000) {
      st.style("fill", a1000);
    } else if (data[i].medHouseIncome >= 1000 && data[i].medHouseIncome < 2000) {
      st.style("fill", a2000);
    } else if (data[i].medHouseIncome >= 2000 && data[i].medHouseIncome < 3000) {
      st.style("fill", a3000);
    } else if (data[i].medHouseIncome >= 3000 && data[i].medHouseIncome < 4000) {
      st.style("fill", a4000);
    } else if (data[i].medHouseIncome >= 5000) {
      st.style("fill", a5000);
    }
  }

  d3.select(window).on("resize", function() {
    map.resize();
  });

});
}