import { accionTurno } from "src/app/Entities/accion-turno";

export const accionesHome : accionTurno[] = [
    {
      accion : 'NUEVO TURNO',
      permisos : {
        paciente : true,
        profesional : false,
        admin : true
      },
      route: 'nuevo-turno'
    },
    {
      accion : 'TURNOS',
      permisos : {
        paciente : true,
        profesional : true,
        admin : true
      },
      route: 'mis-turnos'
    },
    {
      accion : 'MIS PACIENTES',
      permisos : {
        paciente : false,
        profesional : true,
        admin : false
      },
      route: 'mis-pacientes'
    },
    {
      accion : 'INFORMES',
      permisos : {
        paciente : false,
        profesional : false,
        admin : true
      },
      route: 'informes'
    },
  ];