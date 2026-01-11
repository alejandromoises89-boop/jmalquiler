
export interface Vehicle {
  id: string;
  nombre: string;
  precio: number; // En BRL (R$)
  img: string;
  estado: 'Disponible' | 'En Taller';
  placa: string;
  color: string;
  transmision: string;
  pasajeros: number;
  consumo: string;
  motor: string;
  combustible: string;
  traccion: string;
  // Ficha Técnica Completa
  potencia?: string;
  tanque?: string;
  maletero?: string;
  seguridad?: string[];
  dimensiones?: string;
  proximoMantenimiento?: string;
  vencimientoSeguro?: string;
  vencimientoCuota?: string;
}

export interface Reservation {
  id: string;
  cliente: string;
  ci: string;
  celular: string;
  auto: string;
  inicio: string; 
  fin: string;    
  total: number;
  reservaMonto: number;
  pagado: number;
  status: 'Confirmada' | 'Cancelada' | 'Pendiente' | 'Completada';
  metodoPago: 'PIX' | 'Efectivo' | 'Tarjeta' | 'Transferencia';
  signature?: string;
  comprobante?: string;
  fechaRegistro: string;
}

export interface Expense {
  id: string;
  descripcion: string;
  monto: number; 
  moneda: 'BRL' | 'PYG'; // Nuevo campo para moneda
  fecha: string;
  categoria: 'Mantenimiento' | 'Lavado' | 'Seguro' | 'Otro';
}

export interface AppData {
  reservations: Reservation[];
  fleet: Vehicle[];
  expenses: Expense[];
}

export enum Tab {
  RESERVATIONS = 'RESERVATIONS',
  LOCATION = 'LOCATION',
  ADMIN = 'ADMIN'
}

export interface ExchangeRates {
  PYG: number;
  USD: number;
}
