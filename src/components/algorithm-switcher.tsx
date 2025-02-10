import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AlgorithmSwitcher({
  algorithms,
  onChange,
}: {
  algorithms: {
    name: string;
    logo: React.ElementType;
    efficiency: string;
    key: string;
  }[];
  onChange: (selectedKey: string) => void;
}) {
  const { isMobile } = useSidebar();
  const [activeAlgorithm, setActiveAlgorithm] = React.useState(algorithms[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeAlgorithm.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeAlgorithm.name}
                </span>
                <span className="truncate text-xs">{activeAlgorithm.efficiency}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Algorithms
            </DropdownMenuLabel>
            {algorithms.map((algorithm, index) => (
              <DropdownMenuItem
                key={algorithm.name}
                onClick={() => {
                  setActiveAlgorithm(algorithm);
                  onChange(algorithm.key);
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <algorithm.logo className="size-4 shrink-0" />
                </div>
                {algorithm.name}
                <DropdownMenuShortcut>{algorithm.efficiency}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

