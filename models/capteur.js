class Capteur {
  constructor(
    macAddress,
    id,
    materiau,
    description,
    vitesseProp,
    zone,
    alerte,
    photo
  ) {
    this.macAddress = macAddress;
    this.id = id;
    this.materiau = materiau;
    this.description = description;
    this.vitesseProp = vitesseProp;
    this.zone = zone;
    this.alerte = alerte;
    this.photo = photo;
  }
}

export default Capteur;