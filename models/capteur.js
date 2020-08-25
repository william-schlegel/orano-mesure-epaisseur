class Capteur {
  constructor(
    macAddress,
    nom,
    materiau,
    description,
    vitesseProp,
    zone,
    alerte,
    photo,
    debutA,
    largeurA,
    seuilA,
    debutB,
    largeurB,
    seuilB
  ) {
    this.macAddress = macAddress;
    this.nom = nom;
    this.materiau = materiau;
    this.description = description;
    this.zone = zone;
    this.photo = photo;
    this.vitesseProp = isNaN(vitesseProp) ? 0 : parseFloat(vitesseProp);
    this.alerte = isNaN(alerte) ? 0 : parseFloat(alerte);
    this.debutA = isNaN(debutA) ? 0 : parseFloat(debutA);
    this.largeurA = isNaN(largeurA) ? 0 : parseFloat(largeurA);
    this.seuilA = isNaN(seuilA) ? 0 : parseFloat(seuilA);
    this.debutB = isNaN(debutB) ? 0 : parseFloat(debutB);
    this.largeurB = isNaN(largeurB) ? 0 : parseFloat(largeurB);
    this.seuilB = isNaN(seuilB) ? 0 : parseFloat(seuilB);
  }
}

export default Capteur;
