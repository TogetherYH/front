export type BasicNode = {
  id: string;
  labels: string[];
  properties: Record<string, string>;
  propertyTypes: Record<string, string>;
};

export type BasicRelationship = {
  id: string;
  startNodeId: string;
  endNodeId: string;
  type: string;
  properties: Record<string, string>;
  propertyTypes: Record<string, string>;
};
export type BasicNodesAndRels = {
  nodes: BasicNode[];
  relationships: BasicRelationship[];
};

export type VizItemProperty = { key: string; value: string; type: string };

export type ZoomLimitsReached = {
  zoomInLimitReached: boolean;
  zoomOutLimitReached: boolean;
};

export type MeasureSizeFn = () => { width: number; height: number };

export enum ZoomType {
  IN = 'in',
  OUT = 'out',
  FIT = 'fit',
}
