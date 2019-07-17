
var svgWidth = 1000;
var svgHeight = 500;
var margin = {top: 20, right: 20, bottom: 55, left: 20};
var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top - margin.bottom;

var chart = d3.select("#scatter").append("div").classed("chart", true);

var svg = chart.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

d3.csv("data.csv").then(function(healthData) {
    // if (error) return console.warn(error);
    console.log(healthData)

    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    var xScale = d3.scaleLinear().range([0, width]);    
    var yScale = d3.scaleLinear().range([height, 0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    var xMin = d3.min(healthData, function(data) {
        return +data.poverty;
    });

    var xMax = d3.max(healthData, function(data) {
        return +data.poverty;
    });

    var yMin = d3.min(healthData, function(data) {
        return +data.healthcare;
    });

    var yMax = d3.max(healthData, function(data) {
        return +data.healthcare;
    });
    
    xScale.domain([xMin, xMax]);
    yScale.domain([yMin, yMax]);

    svg.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", function(data, index) {
            return xScale(data.poverty)
        })
        .attr("cy", function(data, index) {
            return yScale(data.healthcare)
        })
        .attr("r", "15")
        .attr("fill", "lightblue")

        .on("mouseover", function(data) {
            toolTip.show(data);
        })

        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        }); 

    svg.append("text")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .selectAll("tspan")
        .data(healthData)
        .enter()
        .append("tspan")
            .attr("x", function(data) {
                return xScale(data.poverty - 0);
            })
            .attr("y", function(data) {
                return yScale(data.healthcare - 0.2);
            })
            .text(function(data) {
                return data.abbr
            });

    svg
        .append("g")
        .attr('transform', `translate(40, ${height})`)
        .call(bottomAxis);

    svg
        .append("g")
        .attr('transform', `translate(40, 0)`)
        .call(leftAxis);
        

    svg
    .append("text")
    .attr(
        "transform",
        "translate(10, 200)rotate(-90)"
            )
    .attr("class", "axis-text y")
    .text("Healthcare");

    svg
        .append("text")
        .attr(
            "transform",
            "translate(400, 460)"
        )
        .attr("class", "axis-text x")
        .text("Poverty");
    });
