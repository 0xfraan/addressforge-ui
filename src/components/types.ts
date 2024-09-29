export interface Job {
  id: string;
  owner: string;
  pattern: string;
  deployer: string;
  state: string;
  salt: string | null;
  address: string | null;
  createdAt: string;
  finishedAt: string | null;
}
