export interface Coffee {
  id: string;
  name: string;
  description: string;
  roastLevel: 'Light' | 'Medium' | 'Dark';
  notes: string[];
  price: number;
  imageUrl: string;
  origin: string;
  stock: number;
}

export interface CoffeeProfile {
  preferredNotes: string[];
  acidity: 'Low' | 'Medium' | 'High';
  body: 'Light' | 'Medium' | 'Full';
  summary: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
