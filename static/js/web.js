
web = function(){
    var dataset = [
        {skill: "D3js", value:1},
        {skill: "JQuery", value:1},
        {skill: "Security", value:1},
        {skill: "Flask", value:1},
        {skill: "Boostrap", value:1},
    ]
    var svgWidth = $(".speciality-col").width(),
        svgHeight = 300
        radius = Math.min(svgWidth, svgHeight) / 2;

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#a05d56", "#d0743c", "#ff8c00"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });

    var svg = d3.select("#web-design")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

    var parentG = svg.append("g")
        .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

    var g = parentG.selectAll(".arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc");

    path = g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.data.skill); });

    text = g.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function(d) { return d.data.skill; });

     function resize(){

        svgWidth = $(".speciality-col").width(),
        svgHeight = 300;
        radius = Math.min(svgWidth, svgHeight) / 2;


        svg = d3.select("#web-design")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

        parentG.transition()
            .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

        arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);


        text.transition()
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })

     }

    g.on("mouseover", function(){
        d3.select(this)
        .select("path")
        .style("fill", "red");
    })

    g.on("mouseout", function(){
        d3.select(this)
        .select("path")
        .style("fill", function(d){return color(d.data.skill)});
    })

    $(window).resize(resize)

}();
