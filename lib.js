function sortByPosition(a, b){
  if (a.y == b.y) return a.x - b.x;
  return a.y - b.y;
}

function drawBezierCurve(fromX, fromY, toX, toY){
	var dataArray = [{x:fromX, y:fromY},{x:toX / 2, y:fromY + 50},{x:toX, y:toY}];				
	var group = mapCanvas.append("g").attr("class","group1");

 	var lineGenerator = d3.line()
             .x(function(d) { return d.x; })
             .y(function(d) { return d.y; })
             .curve(d3.curveBasis);

    group.append("path")
	.style("fill","none")
	.style("stroke","#999999")
	.style("stroke-width","2px")
	.style("stroke-dasharray", [10,5])
	.attr("d",function(d,i){ return lineGenerator(dataArray); });
}