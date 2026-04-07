export interface Receipt {
  node: string;
  stateCommitment: string;
  sig: string;
}

export interface Answer {
  answer: string;
  slot: number;
  receipt: Receipt;
}

export interface ClientOptions {
  endpoint: string;
  accessToken?: string;
}
