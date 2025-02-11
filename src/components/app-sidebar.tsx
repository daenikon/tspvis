import * as React from "react";
import {
  Route,
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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  runTSP: () => void;
  setSelectedAlgorithm: (algorithm: "brute-force" | "nearest-neighbor") => void;
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
      efficiency: "O(n^2)",
      key: "nearest-neighbor",
    },
  ],
};

export function AppSidebar({ runTSP, setSelectedAlgorithm, ...props }: AppSidebarProps) {
  const handleAlgorithmChange = (selectedAlgorithm: string) => {
    setSelectedAlgorithm(selectedAlgorithm as "brute-force" | "nearest-neighbor");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AlgorithmSwitcher algorithms={data.algorithms} onChange={handleAlgorithmChange} />
      </SidebarHeader>
      <SidebarContent>
        {/* Navigation or project-related UI elements */}
      </SidebarContent>
      <SidebarFooter>
        <Button variant="outline" className="mx-16" onClick={runTSP}>
          <Play /> Run
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

