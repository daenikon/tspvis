import axios from "axios";
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

export default function Page() {
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [polylines, setPolylines] = useState<number[][]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<"brute-force" | "nearest-neighbor">("brute-force");


const fetchPolylines = async () => {
  if (markers.length > 2) {
    if (selectedAlgorithm === "brute-force" && markers.length > 10) {
      alert("Maximum 10 markers allowed for brute force algorithm.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/tsp/${selectedAlgorithm}`,
        markers
      );

      console.log(response.data);
      setPolylines(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    alert("Add at least 3 markers to run TSP.");
  }
};

  return (
    <SidebarProvider>
      <AppSidebar runTSP={fetchPolylines} setSelectedAlgorithm={setSelectedAlgorithm} />
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
            selectedAlgorithm={selectedAlgorithm} // Pass selected algorithm to MapComponent
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

