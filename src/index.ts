export { TimelineView, type ViewMode } from "./components/timeline-view";
export { CollectionsView } from "./components/collections-view";
export { useCollections } from "./hooks/use-collections";
export { errorMessage } from "./lib/errors";
export { installPlatform, platform } from "./platform";
export type {
  Platform,
  HttpPort,
  LivePort,
  LiveEvent,
  HttpRequest,
} from "./platform";
export type {
  SpanStatus,
  ExecutionType,
  Span,
  SpanQuery,
  NewSpan,
  SpanPatch,
  CollectionKind,
  Collection,
  NewCollection,
} from "./features/spans/types";
export type {
  Schema,
  ChartType,
  Aggregation,
  QuerySpec,
  ChartDataPoint,
  Chart,
  ChartSuggestion,
  ChartBoard,
  ChartBoardDetails,
  ChartDataResult,
} from "./features/pulse/types";
