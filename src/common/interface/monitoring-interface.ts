export interface ContainerStatus {
  service: string;
  container: string;
  up: boolean;
  restarts24h: number;
  uptimeSeconds: number;
  healthProbe: "up" | "down" | "unknown";
}

export interface LogLine {
  timestamp: string;
  line: string;
}

export interface AiAnalyzeResult {
  answer: string;
  model: string;
  provider: string;
}
