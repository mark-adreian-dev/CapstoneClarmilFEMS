import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import type { BreadcrumbNavigationOption } from "@/types/ComponentTypes/BreadcrumbNavigation"
import React from "react"

import { Link } from "react-router-dom"

interface BreadcrumbNavigationProps {
  homePath: string
  homePathLabel: string
  currentPageLabel: string
  paths?: BreadcrumbNavigationOption[]
}

export function BreadcrumbNavigation({ homePath, paths, currentPageLabel, homePathLabel }: BreadcrumbNavigationProps) {
  return (
    <Breadcrumb className="mb-10">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={homePath}>{homePathLabel}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {
          paths &&
          paths.map((path, index) => 
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={path.path}>{path.label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          )
        }

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPageLabel}</BreadcrumbPage>
        </BreadcrumbItem>
        
      </BreadcrumbList>
    </Breadcrumb>
  )
}
