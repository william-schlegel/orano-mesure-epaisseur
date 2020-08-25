import React from "react";
import { StyleSheet, View, Dimensions, DevSettings } from "react-native";
import Canvas from "react-native-canvas";
import { useSelector } from "react-redux";

const getIdMax = (points) => {
  let max = 0;
  let id = 0;
  for (let p = 0; p < points.length; p++) {
    if (points[p] > max) {
      max = points[p];
      id = p;
    }
  }
  return id;
};

export default function DessinCourbe({
  points,
  dataMesure,
  freqEchMHz = 125,
  vertical = true,
  height = 0,
  width = 0,
  handlePics = (picA, picB) => {
    return { picA, picB };
  },
}) {
  const handleCanvas = (canvas) => {
    if (!points.length) return;
    if (!canvas) return;

    const dim = Dimensions.get("window");
    canvas.width = width || dim.width - 6;
    canvas.height = height || dim.height - 220;
    const offsetX = vertical ? 25 : 5;
    const offsetY = vertical ? 5 : 25;
    const maxPoints = Math.max(...points);
    const h = canvas.height;
    const w = canvas.width;
    const dHor = (vertical ? h - offsetY * 2 : w - offsetX * 2) / points.length;
    const dVert = (vertical ? w - offsetX * 2 : h - offsetY * 2) / maxPoints;
    const totalµs = points.length / freqEchMHz;
    const dox = 2;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = "grey";
    ctx.strokeRect(0, 0, canvas.width - 1, canvas.height);

    const drawPorte = (debut, largeur, seuil, couleur) => {
      // porte
      ctx.beginPath();
      // id dans le tableau de points
      const idDeb = (debut / totalµs) * points.length;
      const idFin = ((debut + largeur) / totalµs) * points.length;
      const subPoints = points.slice(idDeb, idFin);
      const pic = getIdMax(subPoints);
      if (vertical) {
        const offset = offsetX + (seuil * w) / 100;
        ctx.moveTo(offset, offsetY + idDeb * dHor);
        ctx.lineTo(offset, offsetY + idFin * dHor);
        ctx.strokeStyle = couleur;
        ctx.setLineDash([]);
        ctx.stroke();
        // pic
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY + (idDeb + pic) * dHor);
        ctx.lineTo(w, offsetY + (idDeb + pic) * dHor);
        ctx.setLineDash([5, 5]);
        ctx.stroke();
      } else {
        const offset = h - offsetY - (seuil * h) / 100;
        ctx.moveTo(offsetX + idDeb * dHor, offset);
        ctx.lineTo(offsetX + idFin * dHor, offset);
        ctx.strokeStyle = couleur;
        ctx.setLineDash([]);
        ctx.stroke();
        // pic
        ctx.beginPath();
        ctx.moveTo(offsetX + (idDeb + pic) * dHor, h - offsetY);
        ctx.lineTo(offsetX + (idDeb + pic) * dHor, 0);
        ctx.setLineDash([5, 5]);
        ctx.stroke();
      }
      return pic;
    };

    // courbe
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";
    if (vertical) {
      const iy = Math.floor(points.length / h);
      ctx.moveTo(offsetX, offsetY);
      for (let p = 1; p < points.length; p += iy) {
        const pp = points[p];
        ctx.lineTo(offsetX + pp * dVert, offsetY + p * dHor);
      }
    } else {
      const ix = Math.floor(points.length / w);
      ctx.moveTo(offsetX, h - offsetY);
      for (let p = 1; p < points.length; p += ix) {
        const pp = points[p];
        ctx.lineTo(offsetX + p * dHor, h - offsetY - pp * dVert);
      }
    }
    ctx.stroke();
    // echelle
    ctx.beginPath();
    ctx.strokeStyle = "gray";
    if (vertical) {
      ctx.moveTo(offsetX - dox, offsetY);
      ctx.lineTo(offsetX - dox, h + offsetY);
      for (let p = 0; p <= 10; p += 1) {
        ctx.moveTo(offsetX - 5, offsetY + p * (h / 10));
        ctx.lineTo(offsetX - dox, offsetY + p * (h / 10));
      }
    } else {
      ctx.moveTo(offsetX, h - offsetY + dox);
      ctx.lineTo(w - offsetX, h - offsetY + dox);
      for (let p = 0; p <= 10; p += 1) {
        ctx.moveTo(offsetX + p * ((w - offsetX) / 10), h - offsetY + 5 + dox);
        ctx.lineTo(offsetX + p * ((w - offsetX) / 10), h - offsetY + dox);
      }
    }
    let ech = 0;
    ctx.textAlign = vertical ? "right" : "center";
    ctx.fillStyle = "gray";
    for (let p = 0; p <= 10; p += 1) {
      ctx.fillText(
        ech === 0 ? "(µs)" : Math.round(ech),
        vertical ? offsetX - dox - 4 : offsetX - 4 + p * (w / 10),
        vertical ? offsetY + 4 + p * (h / 10) : h - 10
      );
      ech += totalµs / 10;
    }
    ctx.stroke();
    const picA = drawPorte(
      dataMesure.debutA,
      dataMesure.largeurA,
      dataMesure.seuilA,
      "red"
    );
    const picB = drawPorte(
      dataMesure.debutB,
      dataMesure.largeurB,
      dataMesure.seuilB,
      "blue"
    );
    handlePics(picA, picB);
  };
  return (
    <View style={styles.courbe}>
      <Canvas ref={handleCanvas} />
    </View>
  );
}

const styles = StyleSheet.create({
  courbe: {
    padding: 2,
    margin: 2,
  },
});
