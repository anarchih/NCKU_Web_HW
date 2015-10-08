
var svg = d3.select("svg");
var dataset = [
    {'lang': 'Python', 'value': 4},
    {'lang': 'JS', 'value': 3},
    {'lang': 'C', 'value': 3},
    {'lang': 'R', 'value': 2},
    {'lang': 'C++', 'value': 2},
]
var svgWidth = 0;
var svgMaxWidth = 800;
var svgheight = 0;
var textHeightOffset = 0;
var upperDomain = 0;
var lowerDomain = 0;
var upperRange = 0;
var lowerRange = 0;
var svgPadding = 0;
var barPadding = 0;
var barWidth = 0;
var yLinearScale = d3.scale.linear()
                        .domain([lowerDomain, upperDomain])
                        .range([upperRange, lowerRange])
function init(){

}
function skillVarRecalcuate(){
        svgWidth = $("body").width();
        if(svgWidth > svgMaxWidth){
            svgWidth = svgMaxWidth;
        }
        svgheight = svgWidth / 2;
        textHeightOffset = 10;
        upperDomain = 5;
        lowerDomain = 0;
        upperRange = svgheight + textHeightOffset;
        lowerRange = 0;
        svgPadding = svgWidth / 10;
        barPadding = svgPadding / 3;
        barWidth = (svgWidth - 2 * svgPadding) / dataset.length;
        yLinearScale = d3.scale.linear()
                                .domain([lowerDomain, upperDomain])
                                .range([upperRange, lowerRange])

}
function resizing(){
    skillVarRecalcuate();

    svg.transition()
        .attr("width", svgWidth)
        .attr("height", svgheight);
    rect.transition()

    .attr("x", function(d, i){
        return svgPadding + barPadding + (barWidth) * i;

    })
    .attr("y", function(d, i){
        return yLinearScale(d.value);
     })
    .attr("width", barWidth - 2 * barPadding)
    .attr("height", function(d, i){
        return d.value * ((upperRange - lowerRange) / (upperDomain - lowerDomain));
    })
    .attr("fill", function(d, i){
        return d3.rgb(255, i * (255 / dataset.length), 0)
    });

    text.transition()
        .attr("width", svgWidth)
        .attr("height", svgheight)
        .attr("class", "lang-text")
        .text(function(d){
            return d.lang;
        })
        .attr("x", function(d, i){
            return svgPadding + (barWidth) * i + barWidth / 2;
        })
        .attr("y", function(d, i){
            return yLinearScale(d.value) - textHeightOffset;
        })
}

var rect = svg.attr("width", svgWidth)
            .attr("height", svgheight)
            .selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect");

var text = svg.attr("width", svgWidth)
            .attr("height", svgheight)
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("class", "lang-text")
            .text(function(d){
                return d.lang;
            })
            .attr("x", 0)
            .attr("y", 0)


rect.attr("x", 0)
    .attr("y", 0)
    .attr("width", 0)
    .attr("height", 0)
    .attr("fill", function(d, i){
        return d3.rgb(255, i * (255 / dataset.length), 0)
    });

resizing();
$(window).resize(resizing)
