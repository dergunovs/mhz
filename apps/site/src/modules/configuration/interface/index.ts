export interface IConfigurationError {
  category: string;
  field: string;
}

export interface IConfigurationCheck {
  error: IConfigurationError[];
  message: string;
}

export type TMotherboardFormat = 'Micro-ATX' | 'Mini-ITX' | 'Standard-ATX';
