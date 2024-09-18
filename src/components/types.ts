export interface Job {
  id: string;
  pattern: string;
  state: "created" | "running" | "done";
  address?: string;
}
