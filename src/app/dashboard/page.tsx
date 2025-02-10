import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import MapComponent from "@/components/MapComponent";
import { bruteForceTSP } from "@/utils/algorithms/bruteForce";
import { nearestNeighborTSP } from "@/utils/algorithms/nearestNeighbor";

export default function Page() {
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [polylines, setPolylines] = useState<number[][]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<"bruteForce" | "nearestNeighbor">("bruteForce");

  const runTSP = () => {
    if (markers.length > 2) {
      const path =
        selectedAlgorithm === "bruteForce"
          ? bruteForceTSP(markers)
          : nearestNeighborTSP(markers);
      setPolylines(path);
    } else {
      alert("Add at least 3 markers to run TSP.");
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar runTSP={runTSP} setSelectedAlgorithm={setSelectedAlgorithm} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Traveling Salesman Problem
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex-1 rounded-xl bg-muted/50">
          <MapComponent
            markers={markers}
            setMarkers={setMarkers}
            polylines={polylines}
            setPolylines={setPolylines}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

