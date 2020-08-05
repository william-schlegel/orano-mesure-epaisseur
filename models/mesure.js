import moment from "moment";

class Mesure {
  constructor(
    idCapteur,
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
  get readableDate() {
    return moment(this.dateMesure).format("DD/MM/YYYY");
  }

}

export default Mesure;
