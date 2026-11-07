// Portavela parametrico en forma de cruz latina (velas de parafina)
// Abrir en OpenSCAD -> Window > Customizer para cambiar medidas. F6 + F7 exporta STL.

/* [Vela] */
diametro_vela = 22;   // mm
holgura = 0.6;        // juego radial
apriete = 0.5;        // nervios interiores
nervios = 4;
altura_tubo = 20;

/* [Pieza] */
pared = 1.2;
base = 1.2;
borde_alto = 4;
borde_ancho = 1.2;
margen = 6;     // tubo -> borde del brazo
brazo = 20;     // brazos superior / laterales
mango = 42;     // brazo inferior (mango)
redondeo = 4;

$fn = 96;
r_int = diametro_vela/2 + holgura;
r_ext = r_int + pared;
ancho = 2*r_ext + 2*margen;
L = r_ext + brazo;
M = r_ext + mango;

module cruz2d() {
  offset(r=redondeo) offset(delta=-redondeo) union() {
    translate([-ancho/2, -M]) square([ancho, M+L]);
    translate([-L, -ancho/2]) square([2*L, ancho]);
  }
}

difference() {
  union() {
    linear_extrude(base + borde_alto) cruz2d();
    cylinder(r=r_ext, h=base + altura_tubo);
  }
  translate([0,0,base]) linear_extrude(borde_alto+1) difference() {
    offset(delta=-borde_ancho) cruz2d();
    circle(r=r_ext);
  }
  translate([0,0,base]) cylinder(r=r_int, h=altura_tubo+1);
  translate([0,0,base+altura_tubo-0.8]) cylinder(r1=r_int, r2=r_int+0.81, h=0.81);
}
for (i=[0:nervios-1]) rotate(360/nervios*i)
  translate([r_int-holgura-apriete, -0.6, base]) cube([holgura+apriete+0.5, 1.2, altura_tubo-3]);
