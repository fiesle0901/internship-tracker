export interface User {
  id: number;
  email: string;
  password: string;
  name?: string | null;
  createdAt: Date;
  updatedAt: Date;

  // relation
  entries?: ReportEntry[];
}

export interface ReportEntry {
  id: number;
  date: string;
  task: string;
  givenBy: string;
  hours: number;
  remarks?: string | null;
  createdAt: Date;

  // relation fields
  userId?: number | null;
  user?: User | null;
}
