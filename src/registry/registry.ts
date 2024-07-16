export interface Registry {
  tonion: Tonion;
}

export interface Tonion {
  [version: string]: Version | Metadata;
}

export interface Version {
  traits: Traits;
  contracts: Contracts;
}

export interface Contracts {
  [contracts: string]: string[];
}

export interface Traits {
  [traits: string]: string[];
}

export interface Metadata {
  status: string;
  website: string;
  documents: string;
  name: string;
}
