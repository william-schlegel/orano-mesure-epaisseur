class Capteur {
  constructor(
    macAddress,
    id,
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
    this.id = id;
    this.materiau = materiau;
    this.description = description;
    this.vitesseProp = vitesseProp;
    this.zone = zone;
    this.alerte = alerte;
    this.photo = photo;
    this.debutA = debutA;
    this.largeurA = largeurA;
    this.seuilA = seuilA;
    this.debutB = debutB;
    this.largeurB = largeurB;
    this.seuilB = seuilB;
  }
}

export default Capteur;
