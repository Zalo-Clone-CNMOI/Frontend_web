import http from "../api/http";
import { API } from "../api/path";
import {
  AiAnalyzeResult,
  ContainerStatus,
  LogLine,
} from "../interface/monitoring-interface";

export const monitoringService = {
  getContainers() {
    return http.get<ContainerStatus[]>(API.API_MONITORING_CONTAINERS);
  },
  getLogs(id: string, level?: string, limit = 100) {
    const q = new URLSearchParams();
    if (level) q.set("level", level);
    q.set("limit", String(limit));
    return http.get<LogLine[]>(`${API.API_MONITORING_LOGS(id)}?${q.toString()}`);
  },
  aiAnalyze(question: string) {
    return http.post<AiAnalyzeResult>(API.API_MONITORING_AI_ANALYZE, {
      question,
    });
  },
};
