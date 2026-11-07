#!/usr/bin/env python3
"""
Portavela paramétrico con forma de cruz latina (para velas de parafina).

- La bandeja tiene forma de cruz con borde: recoge la cera que gotea.
- Base 100% plana: se para firme en el piso.
- El brazo largo de la cruz sirve de mango para sostenerlo en la mano.
- El tubo central (en el cruce de la cruz) sujeta la vela, con nervios
  interiores que aprietan la vela aunque varíe un poco su diámetro.

Uso:
    pip install manifold3d numpy
    python3 generar_stl.py --diametro 22            # -> portavela_cruz_D22.stl
    python3 generar_stl.py --diametro 25 --altura-tubo 25

Todas las medidas en mm.
"""
import argparse
import struct

import numpy as np
from manifold3d import CrossSection, Manifold, JoinType


def construir(p):
    D = p.diametro
    holgura = p.holgura
    pared = p.pared
    base = p.base
    borde_h = p.borde_alto
    borde_w = p.borde_ancho
    fn = 96

    r_int = D / 2 + holgura          # radio interior del tubo
    r_ext = r_int + pared            # radio exterior del tubo

    # --- Silueta de la cruz latina (2D), centrada en el cruce ---
    ancho = 2 * r_ext + 2 * p.margen      # ancho de cada brazo
    brazo = r_ext + p.brazo               # largo brazos arriba / izq / der
    mango = r_ext + p.mango               # largo del brazo inferior (mango)
    radio_punta = min(p.redondeo, ancho / 2 - 0.5)

    def rect(x0, y0, x1, y1):
        return CrossSection.square([x1 - x0, y1 - y0]).translate([x0, y0])

    vertical = rect(-ancho / 2, -mango, ancho / 2, brazo)
    horizontal = rect(-brazo, -ancho / 2, brazo, ancho / 2)
    cruz = vertical + horizontal
    # redondear todas las esquinas (exteriores e interiores)
    cruz = cruz.offset(-radio_punta, JoinType.Round, circular_segments=48)
    cruz = cruz.offset(radio_punta, JoinType.Round, circular_segments=48)
    interior = cruz.offset(-borde_w, JoinType.Round, circular_segments=48)

    bandeja = Manifold.extrude(cruz, base + borde_h)
    hueco = Manifold.extrude(interior, borde_h + 1).translate([0, 0, base])
    bandeja = bandeja - hueco

    # --- Tubo porta-vela ---
    h_tubo = p.altura_tubo
    tubo = Manifold.cylinder(base + h_tubo, r_ext, r_ext, fn)
    agujero = Manifold.cylinder(h_tubo + 1, r_int, r_int, fn).translate([0, 0, base])
    # chaflán de entrada para guiar la vela
    ch = min(1.2, pared - 0.4)
    entrada = Manifold.cylinder(ch + 0.01, r_int, r_int + ch, fn).translate(
        [0, 0, base + h_tubo - ch])
    tubo = tubo - agujero - entrada

    # nervios interiores (aprietan la vela)
    nervios = Manifold()
    if p.nervios > 0:
        n_w = 1.2
        n_d = holgura + p.apriete  # cuánto entran hacia el centro
        for i in range(p.nervios):
            ang = 360.0 / p.nervios * i
            n = Manifold.cube([n_d + 0.5, n_w, h_tubo - 3]).translate(
                [r_int - n_d, -n_w / 2, base])
            nervios = nervios + n.rotate([0, 0, ang])

    pieza = bandeja + tubo + nervios
    return pieza


def guardar_stl(m, ruta):
    mesh = m.to_mesh()
    v = np.asarray(mesh.vert_properties)[:, :3]
    t = np.asarray(mesh.tri_verts)
    with open(ruta, "wb") as f:
        f.write(b"portavela cruz".ljust(80, b" "))
        f.write(struct.pack("<I", len(t)))
        for a, b, c in t:
            p0, p1, p2 = v[a], v[b], v[c]
            nrm = np.cross(p1 - p0, p2 - p0)
            l = np.linalg.norm(nrm)
            nrm = nrm / l if l else nrm
            f.write(struct.pack("<12fH", *nrm, *p0, *p1, *p2, 0))


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--diametro", type=float, default=22, help="diámetro de la vela (mm)")
    ap.add_argument("--holgura", type=float, default=0.6, help="juego radial vela-tubo")
    ap.add_argument("--apriete", type=float, default=0.5, help="cuánto aprietan los nervios")
    ap.add_argument("--nervios", type=int, default=4, help="nervios interiores (0 = sin)")
    ap.add_argument("--altura-tubo", type=float, default=20, help="alto del tubo sobre la base")
    ap.add_argument("--pared", type=float, default=1.2, help="pared del tubo (3 líneas de 0.4)")
    ap.add_argument("--base", type=float, default=1.2, help="espesor del fondo")
    ap.add_argument("--borde-alto", type=float, default=4, help="alto del borde anti-goteo")
    ap.add_argument("--borde-ancho", type=float, default=1.2, help="ancho del borde")
    ap.add_argument("--margen", type=float, default=6, help="espacio entre tubo y borde del brazo")
    ap.add_argument("--brazo", type=float, default=20, help="largo brazos sup/laterales desde el tubo")
    ap.add_argument("--mango", type=float, default=42, help="largo brazo inferior (mango)")
    ap.add_argument("--redondeo", type=float, default=4, help="radio de redondeo de puntas")
    ap.add_argument("--salida", default=None)
    p = ap.parse_args()

    m = construir(p)
    salida = p.salida or f"portavela_cruz_D{p.diametro:g}.stl"
    guardar_stl(m, salida)
    (x0, y0, z0), (x1, y1, z1) = m.bounding_box()[:3], m.bounding_box()[3:]
    print(f"{salida}: {x1-x0:.1f} x {y1-y0:.1f} x {z1-z0:.1f} mm, "
          f"volumen {m.volume()/1000:.1f} cm3 (~{m.volume()/1000*1.24:.1f} g PLA)")


if __name__ == "__main__":
    main()
