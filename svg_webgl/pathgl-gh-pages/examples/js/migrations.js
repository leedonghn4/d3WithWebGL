var selector = 'svg'
var width = 760,
    height = 500,
    rotate = [10, -10],
    velocity = [.03, -.001],
    time = Date.now();

var simplify = d3.geo.transform({ point: function(x, y, z) { this.stream.point(x, y); } })
var proj = d3.geo.albersUsa().scale(1000).translate([width / 2 , height / 2])
  , path = d3.geo.path().projection(proj)

var svg = d3.select(selector)
          .attr("width", width)
          .attr("height", height)

var webgl = d3.select('canvas').attr('class', 'no-click')
var getDayOfYear = d3.time.format('%j')
// var dsv = d3.csv('data/birds.csv')
//           .row(function (d, i) {
//             var pos = proj([d.lat, d.long]) || []
//             var x = d3.time.format('%Y-%m-%e').parse(d.date)
//             return { x: pos[0], y:pos[1], intensity: .01, size: 50, date: x }
// })
// .get(function (err, birds) {
//   window.birds = birds.reduce(function (a, b) {
//     a[+ getDayOfYear(b.date)].push(b)
//     return a
//   }, d3.range(367).map(function () { return [] }))
//    window.birds.pop()

// })

d3.json('data/us.json', draw_world)
var i = 0
function draw_world(err, us) {
  if (err) throw err
  //var states = topojson.feature(us, us.objects.counties).features
  var states = topojson.feature(us, us.objects.counties).features
               //.filter(function (d) { return d.id !== 2 && d.id !== 15 })
  // var dest = pathgl.texture()
  //var bin = shader
  //.block
  //.global(week)
  //.reduce()
  //.pipe(dest)
  // birds.width = birds.height = ~~Math.sqrt(birds.length)
  // var birdTex = pathgl.texture(birds)//shit.json
  //.pipe(shader)
  //
  //birdTex.lookup(d.long, d.lat)
  webgl.selectAll('path')
  .data(states)
  .enter()
  .append("path")
  .attr('d', path)
  .attr('fill', function (d, i) { return 'hsl(' + Math.random() *360 + ', 90% , 70%)' })


  var canv  = d3.select('.right')

  // var heat = createWebGLHeatmap({canvas:  canv})

  // setInterval(function () {
  //   heat.multiply(0.91)
  //   heat.update()
  //   heat.display()
  //   heat.addPoints(birds[i = 1 + i % 364])
  //   heat.blur()
  // }, 16)
  // heat.update()
  // heat.display()

}

function draw_birds(err, data) {
  return
  data.forEach(function (d) {
    d.location = proj([d[1], d[0]])
  })
  webgl
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr({ class:'event'
          , stroke: function(d){ return d3.hsl(Math.random()*120, .9, 0.5) }
          , cx: function(d){ return d.location[0] * 1.1  }
          , cy: function(d){ return d.location[1] / 2 + 50}
          , cz: function(d){ return d[2] }
          , r: 5
          })
    .shader({'r': '5. - distance(pos.w, dates.x);'})
}
