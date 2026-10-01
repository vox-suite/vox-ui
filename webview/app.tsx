import { lazy, Suspense, useEffect, useState } from "react";
import { TimelineView, useCollections } from "../src";

const PulseView = lazy(() =>
  import("../src/components/pulse/pulse-view").then((m) => ({
    default: m.PulseView,
  })),
);
const SpacesView = lazy(() =>
  import("../src/components/spaces/spaces-view").then((m) => ({
    default: m.SpacesView,
  })),
);

type Route = "timeline" | "pulse" | "spaces";

function readRoute(): Route {
  const name = window.location.hash.replace(/^#\/?/, "");
  return name === "pulse" || name === "spaces" ? name : "timeline";
}

function TimelineScreen() {
  const { collections } = useCollections(true);
  return <TimelineView collections={collections} />;
}

export function App() {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return (
    <div className="flex h-full w-full flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <Suspense fallback={null}>
        {route === "pulse" ? (
          <PulseView />
        ) : route === "spaces" ? (
          <SpacesView />
        ) : (
          <TimelineScreen />
        )}
      </Suspense>
    </div>
  );
}
