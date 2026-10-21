const fs=require('fs');
const d3=require('d3-geo');
const topojson=require('topojson-client');
const topo=JSON.parse(fs.readFileSync('../data/countries-110m.json'));
const land=topojson.feature(topo, topo.objects.countries);
const W=1080,H=1500;
// clockwise ring (d3 convention) so fitExtent fits the region itself
const region={type:'Feature',geometry:{type:'Polygon',coordinates:[[[-105,-58],[-105,72],[45,72],[45,-58],[-105,-58]]]}};
console.log('area',d3.geoArea(region));
const proj=d3.geoNaturalEarth1().rotate([30,0]).fitExtent([[0,0],[W,H]],region);
const path=d3.geoPath(proj);
const d=path(land);
const anto=proj([-70.40,-23.65]);
const palma=proj([2.65,39.57]);
fs.writeFileSync('../data/map.js',`window.MAP=${JSON.stringify({W,H,d,anto,palma})};`);
console.log(anto,palma,path.bounds(land));
