import http from "../api/http";
import { API } from "../api/path";
import {
  AiAnalyzeResult,
  ContainerStatus,
  LogLine,
} from "../interface/monitoring-interface";

/** BFF wraps all responses as {success, data, timestamp}. Unwrap here. */
function unwrap<T>(res: { ok: boolean; statusCode: number; payload: unknown }) {
  const data = (res.payload as { data?: T } | null)?.data ?? (res.payload as T);
  return { ...res, payload: data as T };
}

export const monitoringService = {
  async getContainers() {
    return unwrap<ContainerStatus[]>(await http.get(API.API_MONITORING_CONTAINERS));
  },
  async getLogs(id: string, level?: string, limit = 100) {
    const q = new URLSearchParams();
    if (level) q.set("level", level);
    q.set("limit", String(limit));
    return unwrap<LogLine[]>(
      await http.get(`${API.API_MONITORING_LOGS(id)}?${q.toString()}`),
    );
  },
  async aiAnalyze(question: string) {
    return unwrap<AiAnalyzeResult>(
      await http.post(API.API_MONITORING_AI_ANALYZE, { question }),
    );
  },
};
