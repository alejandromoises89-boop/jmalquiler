import { Vehicle } from './types';

export const APP_BORDO = "#600010";
export const APP_GOLD = "#D4AF37";
export const ADMIN_KEY = "8899";
export const CORPORATE_WA = "595991681191";
export const FEE_WASHING_BRL = 100.0;

// Horarios Comerciales
export const BUSINESS_HOURS = {
  WEEKDAY: { start: 8, end: 17 }, // 08:00 - 17:00
  WEEKEND: { start: 8, end: 12 }  // 08:00 - 12:00
};

export const getContractText = (
  arrendador: { nombre: string; ci: string; direccion: string; tel: string },
  arrendatario: { nombre: string; ci: string; direccion: string; tel: string },
  vehiculo: Vehicle,
  inicio: string,
  fin: string,
  total: number,
  dias: number
) => `
CONTRATO DE ALQUILER DE VEHÍCULO Y AUTORIZACIÓN PARA CONDUCIR

Entre: 
ARRENDADOR:
Nombre: 				${arrendador.nombre}
Cédula de Identidad:		${arrendador.ci}
Domicilio: 				${arrendador.direccion}
Teléfono: 				${arrendador.tel}

Y, ARRENDATARIO
Nombre: 				${arrendatario.nombre.toUpperCase()}
Cédula de Identidad: 		${arrendatario.ci}	
Domicilio: 				${arrendatario.direccion}
Teléfono: 				${arrendatario.tel}

Se acuerda lo siguiente:

PRIMERA - Objeto del Contrato.
El arrendador otorga en alquiler al arrendatario el siguiente vehículo:
* Marca/Modelo: 		${vehiculo.nombre.toUpperCase()}
* Año: 		N/A
* Color: 				${vehiculo.color.toUpperCase()}
* Placa/Patente: 		${vehiculo.placa.toUpperCase()}
El vehículo se encuentra en perfecto estado de funcionamiento y libre de cargas o gravámenes. El arrendatario confirma la recepción del vehículo en buen estado, tras realizar una inspección visual y técnica con soporte Técnico VIDEO del Vehículo. El ARRENDADOR AUTORIZA AL ARRENDATARIO A CONDUCIR EL VEHÍCULO EN TODO EL TERRITORIO PARAGUAYO Y EL MERCOSUR.

SEGUNDA - Duración del Contrato
El presente contrato tendrá una duración de ${dias} días, comenzando el ${inicio} y finalizando el ${fin}. Salvo que se acuerde otra cosa por ambas partes mediante una extensión o terminación anticipada.

TERCERA - Precio y Forma de Pago
El arrendatario se compromete a pagar al arrendador la cantidad total estipulada de ${total.toLocaleString()} BRL (o su equivalente en Guaraníes) por el periodo de alquiler.
El pago se realizará de la siguiente manera: Efectivo, Transferencia Electrónica o Tarjeta. El monto total será pagado por adelantado, en caso de exceder el tiempo se pagará a la entrega del vehículo lo excedido de acuerdo a lo que corresponda.

CUARTA - Depósito de Seguridad.
El arrendatario pagara cinco millones de guaraníes (Gs. 5.000.000) o su equivalente en moneda extranjera en caso de siniestro (accidente) para cubrir los daños al vehículo durante el periodo de alquiler.

QUINTA - Condiciones de Uso del Vehículo.
1. El vehículo será utilizado exclusivamente para fines personales dentro del territorio nacional.
2. El ARRENDATARIO es responsable PENAL y CIVIL, de todo lo ocurrido dentro del vehículo y/o encontrado durante el alquiler.
3. El arrendatario se compromete a no subarrendar el vehículo ni permitir que terceros lo conduzcan sin autorización previa del arrendador.
4. El uso del vehículo fuera de los límites del país deberá ser aprobado por el arrendador.

SEXTA - Kilometraje y Excesos
El alquiler incluye un límite de 200 kilómetros por día. En caso de superar este límite, el arrendatario pagará un adicional por los kilómetros excedentes según tarifa vigente.

SÉPTIMA - Seguro.
• El vehículo cuenta con un seguro básico que cubre Responsabilidad CIVIL en caso de daños a terceros, Cobertura en caso de accidentes y Servicio de rastreo satelital.
• El arrendatario será responsable de los daños que no estén cubiertos por el seguro, tales como daños por negligencia o uso inapropiado del vehículo.

OCTAVA - Mantenimiento y Reparaciones
El arrendatario se compromete a mantener el vehículo en buen estado de funcionamiento. (Agua, combustible, limpieza). En caso de desperfectos técnicos o accidentes, el arrendatario deberá notificar inmediatamente al arrendador.
Las reparaciones necesarias debido al desgaste normal del vehículo serán responsabilidad del arrendador, mientras que las reparaciones debido a uso indebido o negligente serán responsabilidad del arrendatario.

NOVENA - Devolución del Vehículo.
El arrendatario devolverá el vehículo en la misma condición en la que lo recibió, excepto por el desgaste normal. Si el vehículo no se devuelve en la fecha y hora acordada, el arrendatario pagará una penalización de media diaria y/o una diaria completa por cada día adicional.

DÉCIMA – Incumplimiento.
En caso de incumplimiento de alguna de las cláusulas de este contrato, el arrendador podrá rescindir el mismo de manera inmediata, sin perjuicio de reclamar daños y perjuicios.

UNDÉCIMA - Jurisdicción y Ley Aplicable.
Para cualquier disputa derivada de este contrato, las partes se someten a la jurisdicción de los tribunales del Alto Paraná, Paraguay, y se regirán por la legislación vigente en el país.

DÉCIMA SEGUNDA - Firma de las Partes.
Ambas partes firman el presente contrato en señal de conformidad, en Ciudad del Este en la fecha de registro digital de esta operación.
El ARRENDADOR AUTORIZA AL ARRENDATARIO A CONDUCIR EL VEHÍCULO EN TODO EL TERRITORIO PARAGUAYO Y EL MERCOSUR.
`;

export const INITIAL_FLEET: Vehicle[] = [
  {
    id: '1',
    nombre: "Hyundai Tucson 2012",
    precio: 260.0,
    img: "https://i.ibb.co/rGJHxvbm/Tucson-sin-fondo.png",
    estado: "Disponible",
    placa: "AAVI502",
    color: "Blanco Marfil",
    transmision: "Automática H-Matic 6 Vel.",
    pasajeros: 5,
    consumo: "Ciudad: 10 km/l | Ruta: 14 km/l",
    motor: "2.0 CRDi VGT (Diesel)",
    combustible: "Diesel",
    traccion: "4x2 Delantera (FWD)",
    potencia: "184 CV @ 4000 rpm / 392 Nm Torque",
    tanque: "58 Litros",
    maletero: "591 L (1436 L abatido)",
    seguridad: ["6 Airbags (Front/Lat/Cortina)", "Frenos ABS + EBD", "Control de Estabilidad (ESP)", "Asistente en Pendientes (HAC)", "Estructura de Acero AHSS"],
    dimensiones: "4.41m (L) x 1.82m (A) x 1.65m (H)",
    proximoMantenimiento: "2024-12-15",
    vencimientoSeguro: "2025-01-20"
  },
  {
    id: '2',
    nombre: "Toyota Vitz 2012",
    precio: 195.0,
    img: "https://i.ibb.co/Y7ZHY8kX/pngegg.png",
    estado: "Disponible",
    placa: "AAVP719",
    color: "Blanco Perla",
    transmision: "Automática Super CVT-i",
    pasajeros: 5,
    consumo: "Ciudad: 14 km/l | Ruta: 18 km/l",
    motor: "1.3 Dual VVT-i (1NR-FE)",
    combustible: "Nafta",
    traccion: "Delantera",
    potencia: "99 CV @ 6000 rpm",
    tanque: "42 Litros",
    maletero: "286 Litros",
    seguridad: ["Doble Airbag SRS", "Frenos ABS con BA", "Carrocería GOA (Absorción Impactos)", "Anclajes ISOFIX", "Cierre Centralizado"],
    dimensiones: "3.88m (L) x 1.69m (A) x 1.50m (H)",
    proximoMantenimiento: "2024-11-20",
    vencimientoSeguro: "2025-03-10"
  },
  {
    id: '3',
    nombre: "Toyota Vitz RS 2012",
    precio: 195.0,
    img: "https://i.ibb.co/rKFwJNZg/2014-toyota-yaris-hatchback-2014-toyota-yaris-2018-toyota-yaris-toyota-yaris-yaris-toyota-vitz-fuel.png",
    estado: "Disponible",
    placa: "AAOR725",
    color: "Negro Obsidiana",
    transmision: "Secuencial 7 Vel. (Paddle Shift)",
    pasajeros: 5,
    consumo: "Ciudad: 11 km/l | Ruta: 15 km/l",
    motor: "1.5 VVT-i RS (1NZ-FE)",
    combustible: "Nafta",
    traccion: "Delantera Sport",
    potencia: "110 CV @ 6000 rpm / 141 Nm",
    tanque: "42 Litros",
    maletero: "286 Litros",
    seguridad: ["Frenos a Disco en 4 Ruedas", "Faros de Xenón HID", "Suspensión Deportiva RS", "8 Airbags", "Control de Tracción (TRC)"],
    dimensiones: "3.93m (L) x 1.69m (A) x 1.51m (H)",
    proximoMantenimiento: "2024-12-01",
    vencimientoSeguro: "2025-05-15"
  },
  {
    id: '4',
    nombre: "Toyota Voxy 2011",
    precio: 240.0,
    img: "https://i.ibb.co/VpSpSJ9Q/voxy.png",
    estado: "Disponible",
    placa: "AAUG465",
    color: "Gris Platino",
    transmision: "Automática CVT 7 Vel.",
    pasajeros: 7,
    consumo: "Ciudad: 9 km/l | Ruta: 13 km/l",
    motor: "2.0 Valvematic (3ZR-FAE)",
    combustible: "Nafta",
    traccion: "Delantera",
    potencia: "158 CV @ 6200 rpm",
    tanque: "60 Litros",
    maletero: "Modulable (3ra fila abatible)",
    seguridad: ["Puertas Laterales Eléctricas", "Cámara de Reversa HD", "Sensores de Estacionamiento", "Climatizador Dual-Zone", "Faros Antiniebla"],
    dimensiones: "4.59m (L) x 1.69m (A) x 1.85m (H)",
    proximoMantenimiento: "2024-11-10",
    vencimientoSeguro: "2024-11-25"
  }
];