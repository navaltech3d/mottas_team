
// Import React to provide types like React.ReactNode
import React from 'react';

export interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export enum TechCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  DATABASE = 'Database',
  INFRA = 'Infrastructure',
  INTEGRATION = 'Integrations'
}

export interface TechItem {
  category: TechCategory;
  name: string;
  description: string;
  icon: string;
}
