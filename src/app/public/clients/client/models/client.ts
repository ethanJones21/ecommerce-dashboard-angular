export interface ClientItf {
  // necessary
  nombre: string;
  apellido: string;
  email: string;
  pais: string;
  genero: string;
  test: boolean;
  activo: boolean;
  // ?
  perfil?: string;
  telefono?: string;
  password?: string;
  fnacimiento?: string;
  dni?: string;
}

export class ClientClass {
  // necessary
  nombre = '';
  apellido = '';
  email = '';
  pais = '';
  genero = '';
  password? = '123';
  test = true;
  //   ?
  perfil? = '';
  telefono? = '';
  fnacimiento? = '';
  dni? = '';
  activo = true;

  constructor(
    nombre: string,
    apellido: string,
    email: string,
    pais: string,
    genero: string,
    other: {}
  ) {
    //   necessary
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.pais = pais;
    this.genero = genero;
    // ?
    this.fillOtherFields(other);
  }

  fillOtherFields(other: any) {
    const {
      perfilClient: perfil,
      phoneClient: telefono,
      activeClient: activo,
    } = other;
    console.log(perfil);
    if (perfil) this.perfil = perfil;
    if (telefono) this.telefono = telefono;
    if (activo) this.activo = activo;
  }
}
