var mydata = [
  { date: '4/01/2017', low: 55, high: 78 },
  { date: '4/02/2017', low: 56, high: 58 },
  { date: '4/03/2017', low: 53, high: 68 },
  { date: '4/04/2017', low: 51, high: 98 },
  { date: '4/05/2017', low: 58, high: 88 },
]

d3.select('tbody')
.selectAll('tr')
.data(mydata)
.enter().append('tr')
.html(function(d) {
  return '<th scope="row">' + d.date +
  '</th><td>' + d.low +
  '</td><td>' + d.high + '</td>'
})


d3.select('#viz')
  .append('svg')
    .attr('width', 600)
    .attr('height', 400)
    .style('background', '#93A1A1')
  .append('rect') 
    .attr('x', 200)
    .attr('y', 100)
    .attr('height', 200)
    .attr('width', 200)
    .style('fill', '#CB4B19');

d3.select('#viz svg')
  .append('circle')
    .attr('cx', 300)
    .attr('cy', 200)
    .attr('r', 50)
    .style('fill', '#840043')

    // randomize bar data. bar data object can take numbers too
var bardata = [];
for (var i = 0; i<100; i++) {
  bardata.push(Math.random() * 20);
}
var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;

var yScale = d3.scaleLinear()
    .domain([0, d3.max(bardata)])
    .range([0, height]);

var xScale = d3.scaleBand()
    .domain(bardata)
    .paddingInner(.3)
    .paddingOuter(.1)
    .range([0, width]);

var colors = d3.scaleLinear()
    .domain([0, bardata.length *.33,
    bardata.length *.66,
  bardata.length ])
    .range(['#FFB832', '#C61C6F',
  '#268BD2', '#85992c']);

var tooltip = d3.select('body')
    .append('div')
    .style('position', 'absolute')
    .style('padding', '0 10px')
    .style('background', 'white')
    .style('opacity', 0);

var myBarChart = 
d3.select('#viz2').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#C9D7D6')  // Adds background color
.selectAll('rect').data(bardata)
    .enter().append('rect')
      .attr('fill', function(d, i) {
        return colors(d, i)
      })
      .attr('width', function(d){
        return xScale.bandwidth();
      })
     
      .attr('x', function(d, i) {
        return xScale(d);
      })
      .attr('y', height
      )
      .attr('height', 0)
      .on('mouseover', function(d) {
        tooltip.transition().duration(200)
         .style('opacity', .9)
        tooltip.html(d)
         .style('left', (d3.event.pageX -35) + 'px')
         .style('top', (d3.event.pageY -30) + 'px')

        d3.select(this)
        .transition()
        .delay(10)
        .duration(500)
        .style('opacity', 0.5)
      })
      .on('mouseout', function(d) {
        d3.select(this)
        .transition()
        .style('opacity', 1)
      });

  // add animation
  myBarChart.transition() 
  .attr('y', function(d) {
    return height - yScale(d);
  })
  .attr('height', function(d) {
    return yScale(d);
  })
  .delay(function(d, i) {
    return i * 20;
  })
  .duration(1000)
  .ease(d3.easeBounceOut);