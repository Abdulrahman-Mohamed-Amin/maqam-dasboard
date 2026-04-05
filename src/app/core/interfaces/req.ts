

export interface Req {
  id: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
  availableDateTime: string;

  serviceId: number;
  service: Service;

  requestType: number;
  arRequestType: string;
  enRequestType: string;
}
export interface Service {
  id: number;
  arTitle: string;
  arDescription: string;
  enTitle: string;
  enDescription: string;
  interfacePath: string;

  projects: any[]; // لو عندك type للمشاريع نعدله
}