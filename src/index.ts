/**
 * @see https://eips.ethereum.org/EIPS/eip-1193
 */

 export interface EventEmitter {
  /* eslint-disable prettier/prettier */
  on(eventName: 'accountsChanged', listener: (accounts: string[]) => void): this;
  on(eventName: 'message', listener: (message: ProviderMessage | EthSubscription) => void): this;
  on(eventName: 'connect', listener: (message: ProviderConnectInfo) => void): this;
  on(eventName: 'disconnect', listener: (error: ProviderRpcError) => void): this;
  on(eventName: 'chainChanged', listener: (chainId: string) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  /* eslint-enable prettier/prettier */
}

export interface MetaMaskProvider extends EventEmitter {
  isMetaMask?: boolean;

  isConnected(): boolean;

  request(args: { method: 'eth_chainId' }): Promise<HexString>;
  request(args: { method: 'eth_accounts' }): Promise<string[]>;
  request(args: { method: 'eth_requestAccounts' }): Promise<string[]>;
  request(args: { method: 'eth_sendTransaction', params: TransactionParams[] }): Promise<HexString>;
  request(args: RequestArguments): Promise<unknown>;
}

interface TransactionParams {
  from: HexString;
  to?: HexString;
  value?: HexString;
  gasPrice?: HexString;
  gas?: HexString;
  nonce?: HexString;
  data?: string;
}

export type HexString = string;

interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export interface ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}

export interface EthSubscription extends ProviderMessage {
  readonly type: 'eth_subscription';
  readonly data: {
    readonly subscription: string;
    readonly result: unknown;
  };
}

export interface ProviderConnectInfo {
  readonly chainId: string;
}

export enum ChainId {
  Mainnet = '0x1',
  Ropsten = '0x3',
  Rinkeby = '0x4',
  Goerli = '0x5',
  Kovan = '0x2a',
}

const chainName: Record<string, string> = {
  [ChainId.Mainnet]: 'Mainnet',
  [ChainId.Ropsten]: 'Ropsten Test Network',
  [ChainId.Rinkeby]: 'Rinkeby Test Network',
  [ChainId.Goerli]: 'Goerli Test Network',
  [ChainId.Kovan]: 'Kovan Test Network',
};

declare global {
  interface Window {
    ethereum?: MetaMaskProvider;
  }
}

export function isMetaMaskInstalled(): boolean {
  return window?.ethereum?.isMetaMask === true;
}

export function getMetaMaskProvider(): MetaMaskProvider | undefined {
  return isMetaMaskInstalled() ? window.ethereum : undefined;
}

export function getChainName(chainId: HexString): string {
  return chainName[chainId.toLowerCase()] ?? chainId;
}
