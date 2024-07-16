export type RegistryType = Record<
  string,
  {
    Metadata: MetadataType;
    Version: Record<string, VersionType>;
  }
>;

export type VersionType = {
  Traits: Record<string, Record<string, string[]>>;
  Contract: Record<string, Record<string, string[]>>;
};

export type MetadataType = {
  Website: string;
  Document: string;
  Status: ProviderStatus;
};

export enum ProviderStatus {
  DEPRECATED = 'DEPRECATED',
  UNSTABLE = 'UNSTABLE',
  STABLE = 'STABLE',
}
