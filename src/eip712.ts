export interface EIP712TypedData {
  types: EIP712Types;
  domain: EIP712Domain;
  primaryType: string;
  message: EIP712Object;
}

export interface EIP712Domain {
  name: string;
  chainId: number;
  version: string;
  verifyingContract: string;
}

export type EIP712ObjectValue = string | number | EIP712Object;

export interface EIP712Object {
  [key: string]: EIP712ObjectValue;
}

export interface EIP712Types {
  [key: string]: EIP712Parameter[];
}

export interface EIP712Parameter {
  name: string;
  type: string;
}
