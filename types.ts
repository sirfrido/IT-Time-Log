export interface Task {
  id: string;
  user: string; // Storing name for simplicity
  category: string; // Storing name for simplicity
  description: string;
  startTime: string;
  endTime: string;
}

export interface User {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}
