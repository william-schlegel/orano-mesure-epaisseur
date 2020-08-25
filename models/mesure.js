import moment from "moment";

class Mesure {
  constructor(
    idCapteur,
    nomCapteur,
    debutA,
    largeurA,
    seuilA,
    debutB,
    largeurB,
    seuilB,
    dateMesure,
    epaisseur,
    points
  ) {
    this.idCapteur = idCapteur;
    this.nomCapteur = nomCapteur;
    this.debutA = parseFloat(debutA);
    this.largeurA = parseFloat(largeurA);
    this.seuilA = parseFloat(seuilA);
    this.debutB = parseFloat(debutB);
    this.largeurB = parseFloat(largeurB);
    this.seuilB = parseFloat(seuilB);
    this.dateMesure = (moment.isDate(dateMesure)) ? dateMesure : new Date(dateMesure);
    this.epaisseur = parseFloat(epaisseur);
    this.points = points;
  }
}

export default Mesure;
