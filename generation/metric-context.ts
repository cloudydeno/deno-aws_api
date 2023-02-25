import DatadogApi from "https://deno.land/x/datadog_api@v0.1.5/mod.ts";
import { type MetricSubmission } from "https://deno.land/x/datadog_api@v0.1.5/v1/metrics.ts";
const datadog = DatadogApi.fromEnvironment(Deno.env);

const host_name = [
  Deno.env.get('DENO_REGION'),
].filter(x => x).map(x => `deno-deploy-${x}`)[0] ?? 'localhost';

class CountMetric {
  constructor(
    private readonly point: { value: number; },
    public readonly tags = new Array<string>,
  ) {}
  incr() { this.point.value++; }
  decr() { this.point.value--; }
  incrBy(offset = 1) { this.point.value += offset; }
  decrBy(offset = 1) { this.point.value -= offset; }
}

export class MetricContext {

  metrics = new Array<MetricSubmission>;
  metricTags = new URLSearchParams; // used for duplicatable key/val

  incrementCounter(name: string, value: number, tags: string[] = []) {
    // TODO: coalesce counts?
    this.metrics.push({
      metric_name: name,
      metric_type: 'count',
      points: [{value}],
      tags,
    });
  }

  withCounter(name: string, tags: string[] = []) {
    const point = {value: 0};
    this.metrics.push({
      metric_name: name,
      metric_type: 'count',
      points: [point],
      tags,
    });
    return new CountMetric(point, tags);
  }

  setGauge(name: string, value: number, tags: string[] = []) {
    this.metrics.push({
      metric_name: name,
      metric_type: 'gauge',
      points: [{value}],
      tags,
    });
  }

  async flushMetrics() {
    const metrics = this.metrics.map(x => ({ ...x,
      tags: [
        ...(x.tags || []),
        ...Array.from(this.metricTags).map(([k,v]) => `${k}:${v}`),
      ],
      host_name,
    }));
    this.metrics.length = 0;

    await datadog.v1Metrics.submit(metrics);
  }

}

import { AsyncLocalStorage } from "node:async_hooks";
const asyncLocalStorage = new AsyncLocalStorage<MetricContext>();

export function runWithMetricContext<T>(func: () => T) {
  return asyncLocalStorage.run(new MetricContext(), func);
}
export function getMetricContext() {
  return asyncLocalStorage.getStore();
}
