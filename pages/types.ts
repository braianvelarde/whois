export interface Event {
  eventAction: string;
  eventDate: Date;
}

export interface Link {
  value: string;
  rel: string;
  type: string;
  href: string;
}

export interface Entity {
  objectClassName: string;
  handle: string;
  roles: string[];
  vcardArray: any[];
  events: Event[];
  links: Link[];
}

export interface Event2 {
  eventAction: string;
  eventDate: Date;
}

export interface Link2 {
  value: string;
  rel: string;
  type: string;
  href: string;
}

export interface Remark {
  description: any[];
  title: string;
}

export interface Cidr0Cidrs {
  v4prefix: string;
  length: number;
}

export interface Link3 {
  value: string;
  rel: string;
  type: string;
  href: string;
}

export interface Notice {
  title: string;
  description: string[];
  links: Link3[];
}

export interface who {
  objectClassName: string;
  handle: string;
  parentHandle: string;
  startAddress: string;
  endAddress: string;
  ipVersion: string;
  type: string;
  entities: Entity[];
  events: Event2[];
  links: Link2[];
  remarks: Remark[];
  lacnic_originAutnum: string[];
  lacnic_legalRepresentative: string;
  lacnic_reverseDelegations: any[];
  cidr0_cidrs: Cidr0Cidrs[];
  rdapConformance: string[];
  notices: Notice[];
  port43: string;
}
