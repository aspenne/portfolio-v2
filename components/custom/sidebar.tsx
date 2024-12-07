'use client'

import { SidebarContentComp } from "@/components/custom/sidebarContentComp";
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
import { usePathname } from "next/navigation";

type SidebarProps = {
  children: React.ReactNode;
};

export function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();

  console.log(pathname);

  const segments = pathname.split("/").filter((segment) => segment !== "");

  // Construire les URLs pour les liens
  const url = (index: number) => {
    return "/" + segments.slice(0, index + 1).join("/");
  };

  return (
    <SidebarProvider>
      <SidebarContentComp />
      <div>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {segments.map((segment, index) => {
                    const isLast = index == segments.length - 1;
                    return (
                      <BreadcrumbItem key={segment}>
                        {isLast ? (
                          <BreadcrumbPage>
                            {segment.charAt(0).toUpperCase() + segment.slice(1)}
                          </BreadcrumbPage>
                        ) : (
                          <>
                            <BreadcrumbLink href={url(index)}>
                              {segment.charAt(0).toUpperCase() + segment.slice(1)}
                            </BreadcrumbLink>
                            <BreadcrumbSeparator />
                          </>
                        )}
                      </BreadcrumbItem>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
        <SidebarInset>
          <div className="p-4">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
