

dm = function(){
    var dataset = [
        {skill: "ML", value:1},
        {skill: "Visualization", value:1},
        {skill: "Statistics", value:1},
    ]
    var svgWidth = $(".speciality-col").width(),
        svgHeight = 300
        radius = Math.min(svgWidth, svgHeight) / 2;

    var color = d3.scale.ordinal()
        .range(["#579CD1", "#5192C4", "#376385", "#62E4E8", "#68FFCD"]);

    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.value; });

    var svg = d3.select("#data-mining")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

    var parentG = svg.append("g")
        .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

    var g = parentG.selectAll(".arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc");

    var path = g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color(d.data.skill); });

    var text = g.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function(d) { return d.data.skill; });

     function resize(){

        svgWidth = $(".speciality-col").width(),
        svgHeight = 300;
        radius = Math.min(svgWidth, svgHeight) / 2;


        svg = d3.select("#data-mining")
        .attr("width", svgWidth)
        .attr("height", svgHeight)

        parentG.transition()
            .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

        arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

        path.transition()
        .attr("d", arc);

        text.transition()
            .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })

     }
    function scrollEffect(){
        var langTop = $("#data-mining").offset().top;
        var windowHeight = $(window).innerHeight();
        var windowTop = $(window).scrollTop();
        if(windowTop + windowHeight / 5 * 4 < langTop){
            arc = d3.svg.arc()
                    .outerRadius(1)
                    .innerRadius(0);
            path.transition()
            .delay(200)
            .duration(500)
            .attr("d", arc);

            text.transition()
            .duration(200)
            .attr("opacity", 0);
        }else{
            arc = d3.svg.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);
            path.transition()
            .duration(500)
            .attr("d", arc);

            text.transition()
            .delay(500)
            .attr("opacity", 1);
        }
    }
    g.on("mouseover", function(){
        d3.select(this)
        .select("path")
        .style("fill", "#0000ff");
    })

    g.on("mouseout", function(){
        d3.select(this)
        .select("path")
        .style("fill", function(d){return color(d.data.skill)});
    })

    $(window).resize(resize)
    $(window).scroll(scrollEffect)

}();
