/**
 * Datos ficticios para alimentar el backoffice mientras Drizzle no está
 * conectado. Tipado estricto para que el código de UI sea idéntico al
 * que se usará contra la BD real.
 */

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export type Appointment = {
  id: string;
  patientName: string;
  service: string;
  date: string; // ISO YYYY-MM-DD
  time: string; // HH:mm
  status: AppointmentStatus;
  priceCents: number;
};

export type Patient = {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  lastVisit: string; // ISO YYYY-MM-DD
  totalAppointments: number;
};

export type Metric = {
  id: string;
  label: string;
  value: string;
  delta: string; // ej. "+12%"
  trend: "up" | "down" | "flat";
};

/* ────────────────── CITAS ────────────────── */

export const mockCitas: readonly Appointment[] = [
  {
    id: "apt-001",
    patientName: "Ana García López",
    service: "Quiropodia",
    date: "2026-05-27",
    time: "09:00",
    status: "confirmed",
    priceCents: 3500,
  },
  {
    id: "apt-002",
    patientName: "Carlos Méndez",
    service: "Estudio Biomecánico",
    date: "2026-05-27",
    time: "10:30",
    status: "confirmed",
    priceCents: 8000,
  },
  {
    id: "apt-003",
    patientName: "Lucía Fernández",
    service: "Podología Infantil",
    date: "2026-05-27",
    time: "12:00",
    status: "pending",
    priceCents: 4500,
  },
  {
    id: "apt-004",
    patientName: "Javier Romero",
    service: "Cirugía Ungueal",
    date: "2026-05-27",
    time: "16:00",
    status: "confirmed",
    priceCents: 18000,
  },
  {
    id: "apt-005",
    patientName: "Marta Iglesias",
    service: "Quiropodia",
    date: "2026-05-27",
    time: "18:30",
    status: "completed",
    priceCents: 3500,
  },
  {
    id: "apt-006",
    patientName: "Pablo Ruiz",
    service: "Quiropodia",
    date: "2026-05-28",
    time: "09:30",
    status: "pending",
    priceCents: 3500,
  },
  {
    id: "apt-007",
    patientName: "Sara Domínguez",
    service: "Estudio Biomecánico",
    date: "2026-05-28",
    time: "11:00",
    status: "cancelled",
    priceCents: 8000,
  },
] as const;

/* ────────────────── PACIENTES ────────────────── */

export const mockPacientes: readonly Patient[] = [
  {
    id: "pat-001",
    fullName: "Ana García López",
    phone: "+34 600 111 222",
    email: "ana.garcia@example.com",
    lastVisit: "2026-04-12",
    totalAppointments: 7,
  },
  {
    id: "pat-002",
    fullName: "Carlos Méndez",
    phone: "+34 611 222 333",
    email: "cmendez@example.com",
    lastVisit: "2026-03-22",
    totalAppointments: 3,
  },
  {
    id: "pat-003",
    fullName: "Lucía Fernández",
    phone: "+34 622 333 444",
    email: "lucia.fdez@example.com",
    lastVisit: "2026-05-01",
    totalAppointments: 5,
  },
  {
    id: "pat-004",
    fullName: "Javier Romero",
    phone: "+34 633 444 555",
    email: "j.romero@example.com",
    lastVisit: "2026-05-18",
    totalAppointments: 12,
  },
  {
    id: "pat-005",
    fullName: "Marta Iglesias",
    phone: "+34 644 555 666",
    email: "marta.i@example.com",
    lastVisit: "2026-05-20",
    totalAppointments: 2,
  },
] as const;

/* ────────────────── MÉTRICAS ────────────────── */

export const mockMetricas: readonly Metric[] = [
  {
    id: "today-appointments",
    label: "Citas hoy",
    value: "5",
    delta: "+2 vs. ayer",
    trend: "up",
  },
  {
    id: "new-patients",
    label: "Pacientes nuevos (semana)",
    value: "8",
    delta: "+33%",
    trend: "up",
  },
  {
    id: "weekly-revenue",
    label: "Ingresos semana",
    value: "1.245 €",
    delta: "+12%",
    trend: "up",
  },
  {
    id: "occupancy",
    label: "Ocupación agenda",
    value: "78%",
    delta: "−4%",
    trend: "down",
  },
] as const;
