import * as React from "react";
import {
  Route,
  RouteOff,
  Command,
  Waypoints,
} from "lucide-react";
import { Play } from "lucide-react";
import { AlgorithmSwitcher } from "@/components/algorithm-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type CardProps = React.ComponentProps<typeof Card>

// ---



interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  runTSP: () => void;
  setSelectedAlgorithm: (algorithm: "brute-force" | "nearest-neighbor") => void;
  resetMap: () => void;
  markers: { lat: number; lng: number }[];
  selectedAlgorithm: "brute-force" | "nearest-neighbor";
  executionTime: number | null;
}

const data = {
  algorithms: [
    {
      name: "Brute force",
      logo: Waypoints,
      efficiency: "O(n!)",
      key: "brute-force",
    },
    {
      name: "Nearest Neighbour",
      logo: Route,
      efficiency: "O(n²)",
      key: "nearest-neighbor",
    },
  ],
};

const factorial = (n: number): number => {
  return n === 1 ? 1 : n * factorial(n - 1);
};

export function AppSidebar({
  runTSP,
  setSelectedAlgorithm,
  resetMap,
  markers,
  selectedAlgorithm,
  executionTime,
  ...props
}: AppSidebarProps) {
  const handleAlgorithmChange = (selectedAlgorithm: string) => {
    setSelectedAlgorithm(selectedAlgorithm as "brute-force" | "nearest-neighbor");
  };

  const numMarkers = markers.length;
  const algorithmSteps =
    numMarkers < 2
      ? 0
      : selectedAlgorithm === "brute-force"
      ? factorial(numMarkers)
      : numMarkers ** 2;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AlgorithmSwitcher algorithms={data.algorithms} onChange={handleAlgorithmChange} />
      </SidebarHeader>
      <SidebarContent>
        <Card className="w-100% mx-2 mt-24 bg-transparent border-0 outline-none shadow-none">
          <CardHeader>
            <CardTitle>Algorithm Statistics</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Markers Placed: {numMarkers}</p>
              <p className="text-sm font-medium">
                Algorithm Steps: {algorithmSteps.toLocaleString()}
              </p>
              {executionTime !== null && (
                <p className="text-sm font-medium">
                  Execution Time: {executionTime} ms
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={resetMap}>
              <RouteOff /> Clear
            </Button>
          </CardFooter>
        </Card>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" className="w-full h-12 font-bold text-lg" onClick={runTSP}>
          <Play className="h-12 w-12"/> Run
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
