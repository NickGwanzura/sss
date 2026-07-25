// ========== ENUMS ==========

export type UserRole =
  | "SUPER_ADMIN"
  | "OPERATIONS_MANAGER"
  | "DISPATCHER"
  | "CONTROL_ROOM_OPERATOR"
  | "FINANCE"
  | "HR"
  | "FLEET_MANAGER"
  | "VAULT_OFFICER"
  | "DRIVER"
  | "GUARD"
  | "CLIENT"
  | "AUDITOR";

export type TripStatus =
  | "PENDING"
  | "ASSIGNED"
  | "EN_ROUTE"
  | "COLLECTED"
  | "DELIVERED"
  | "CLOSED"
  | "CANCELLED";

export type CollectionOrderStatus =
  | "PENDING"
  | "ASSIGNED"
  | "EN_ROUTE"
  | "COLLECTED"
  | "DELIVERED"
  | "CLOSED"
  | "CANCELLED";

export type IncidentType =
  | "VEHICLE_BREAKDOWN"
  | "ROBBERY_ATTEMPT"
  | "DELAYED_COLLECTION"
  | "CASH_DISCREPANCY"
  | "SEAL_BROKEN"
  | "LOST_COMMUNICATION"
  | "OTHER";

export type IncidentSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type IncidentStatus = "OPEN" | "INVESTIGATING" | "RESOLVED" | "CLOSED";
export type Currency = "USD" | "ZWL" | "ZAR" | "EUR" | "GBP";
export type VehicleStatus = "ACTIVE" | "IN_MAINTENANCE" | "OUT_OF_SERVICE" | "RETIRED";
export type EmployeeRole = "DRIVER" | "COMMANDER" | "GUARD" | "SUPERVISOR";
export type ClientType = "BANK" | "RETAILER" | "FUEL_STATION" | "CASINO" | "GOVERNMENT" | "SUPERMARKET" | "OTHER";
export type CashBagStatus = "EMPTY" | "LOADED" | "IN_TRANSIT" | "DELIVERED" | "VERIFIED" | "DISCREPANCY";

// ========== DASHBOARD TYPES ==========

export interface DashboardStats {
  activeTrips: number;
  completedDeliveries: number;
  cashInTransit: number;
  vehiclesOnline: number;
  crewOnDuty: number;
  openIncidents: number;
  pendingCollections: number;
  atmReplenishments: number;
  dailyRevenue: number;
  revenueChange: number;
  tripsChange: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  previousValue?: number;
}

export interface CollectionChartData {
  date: string;
  collections: number;
  deposits: number;
}

export interface ClientDepositData {
  name: string;
  amount: number;
  color: string;
}

export interface RoutePerformanceData {
  route: string;
  onTime: number;
  delayed: number;
}

export interface IncidentTrendData {
  month: string;
  incidents: number;
}

export interface VehicleUtilizationData {
  vehicle: string;
  utilization: number;
}

// ========== TRIP TYPES ==========

export interface TripData {
  id: string;
  tripNumber: string;
  status: TripStatus;
  scheduledDate: string;
  driver?: { id: string; name: string };
  vehicle?: { id: string; registration: string };
  stops: TripStopData[];
  crew: TripCrewData[];
}

export interface TripStopData {
  id: string;
  stopOrder: number;
  type: string;
  branch?: { id: string; name: string };
  status: string;
  eta?: string;
  arrivalTime?: string;
}

export interface TripCrewData {
  id: string;
  employee: { id: string; firstName: string; lastName: string; role: string };
  role: string;
}

// ========== CLIENT TYPES ==========

export interface ClientData {
  id: string;
  name: string;
  type: ClientType;
  code: string;
  branches: { id: string; name: string }[];
  contacts: { id: string; name: string; email?: string }[];
  contracts: { id: string; contractNumber: string; status: string }[];
}

// ========== BRANCH TYPES ==========

export interface BranchData {
  id: string;
  name: string;
  clientName?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  openingTime?: string;
  closingTime?: string;
  cashLimit?: number;
  phone?: string;
  isActive: boolean;
}

// ========== VEHICLE TYPES ==========

export interface VehicleData {
  id: string;
  registration: string;
  make: string;
  model: string;
  status: VehicleStatus;
  trackerId?: string;
  nextServiceDue?: string;
  insuranceExpiry?: string;
}

// ========== EMPLOYEE TYPES ==========

export interface EmployeeData {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  role: EmployeeRole;
  phone?: string;
  email?: string;
  licenseExpiry?: string;
  firearmExpiry?: string;
  medicalExpiry?: string;
  isActive: boolean;
}

// ========== INCIDENT TYPES ==========

export interface IncidentData {
  id: string;
  incidentNumber: string;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  description: string;
  location?: string;
  reportedAt: string;
  resolvedAt?: string;
  photos?: string[];
  policeCase?: string;
}

// ========== NAVIGATION TYPES ==========

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  roles?: UserRole[];
  children?: NavItem[];
}

// ========== MAP TYPES ==========

export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  type: "VEHICLE" | "BRANCH" | "INCIDENT" | "STOP";
  label: string;
  status?: string;
  speed?: number;
  heading?: number;
}
