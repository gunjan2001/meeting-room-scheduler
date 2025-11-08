export interface IFormData {
  name: string;
  capacity: string;
}

export interface IErrors {
  name?: string;
  capacity?: string;
}

export interface IRoom {
  id: string;
  name: string;
  capacity: number;
}