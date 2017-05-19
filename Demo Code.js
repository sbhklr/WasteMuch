/**
Sorting raw SVG elements
*/
function sortByPosition(a, b){
  if (a.y == b.y) return a.x - b.x;
  return a.y - b.y;
}

var svgCanvas = d3.select("#map");			
svgCanvas.selectAll("circle").style("opacity", 0);
var circles = svgCanvas.selectAll("circle");

circles.each(function(d,i){					
	var circle = d3.select(this);
	circle.data([{"x" : circle.attr("cx"), "y" : circle.attr("cy")}]);
});

var sortedCircles = circles.sort(function(a,b){					
	return sortByPosition(a,b);
});

/**
Chaining Transistions
*/
circles.style("opacity", 0);				
circles.transition()
	.duration(250)
	.delay(function(d,i) { return i * 0.5; })
	.style("opacity", 1)
	.on("end", function(d,i){
		if(i == circles.size() -1){
			//Finished							
		}
	});

/**
Filtering elements
*/
var groups = mapCanvas.selectAll("g").filter(function(d,i) { 
	return this.id != "" && this.id != undefined && this.id != UNKNOWN_COUNTRY_ID; 
});


/**
Get center coordinate of sub-shapes (hacky way)
*/
function getCenterPoint(shape){				
	var circles = shape.selectAll("circle");
	var x = 0, y = 0;
	circles.each(function(d,i){					
		var circle = d3.select(this);
		x += parseFloat(circle.attr("cx"));
		y += parseFloat(circle.attr("cy"));					
	});				
	
	return {"x": Math.round(x / circles.size()), "y": Math.round(y / circles.size())};
}


/**
Draw arc
*/
connectionLine = canvas.append("g").append("path");
connectionLine
.attr("d", "M0,0A0,0 0 0,1 0,0")
.style("fill","none")
.style("stroke","#666666")
.style("stroke-width","0.5px")	

connectionLine.attr("d", function(d) {
    var dx = target.x - source.x,
        dy = target.y - source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + source.x + "," + source.y + "A" + dr + "," + dr + " 0 0,1 " + target.x + "," + target.y;
  });