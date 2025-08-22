"use client"

import React, { useState } from "react"
import { ChevronDown, BarChart3, Users, FolderOpen, Calendar, Menu as MenuIcon } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface MenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
  showChevron?: boolean
}

export function Menu({ trigger, children, align = "left", showChevron = true }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
        {showChevron && (
          <ChevronDown className="ml-2 -mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-9 focus:outline-none z-50`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

interface MenuItemProps {
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: React.ReactNode
  isActive?: boolean
  label?: string
}

export function MenuItem({ children, onClick, disabled = false, icon, isActive = false, label }: MenuItemProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`relative w-16 h-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-lg hover:shadow-xl group transition-all duration-200 hover:scale-105 flex items-center justify-center
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              ${isActive ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950" : ""}
            `}
            role="menuitem"
            onClick={onClick}
            disabled={disabled}
          >
            {icon && (
              <span className="transition-all duration-200 group-hover:scale-110">
                {icon}
              </span>
            )}
            {children}
          </button>
        </TooltipTrigger>
        {label && (
          <TooltipContent side="left" className="bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 border-slate-700 dark:border-slate-300">
            <p className="font-medium">{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export function MenuContainer({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = React.Children.toArray(children)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50" data-expanded={isExpanded}>
      <div className="relative">
        {/* Main toggle button - always visible */}
        <div 
          className="relative w-16 h-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer rounded-full shadow-lg hover:shadow-xl group will-change-transform z-50 flex items-center justify-center transition-all duration-200 hover:scale-105"
          onClick={handleToggle}
        >
          <MenuIcon className="h-6 w-6 text-slate-600 dark:text-slate-300 transition-transform duration-300" 
                   style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)' }} />
        </div>

        {/* Navigation items */}
        {childrenArray.map((child, index) => (
          <div 
            key={index} 
            className="absolute bottom-0 right-0 w-16 h-16 will-change-transform"
            style={{
              transform: `translateY(${isExpanded ? -(index + 1) * 72 : 0}px)`,
              opacity: isExpanded ? 1 : 0,
              zIndex: 40 - index,
              transitionProperty: 'transform, opacity',
              transitionDuration: `${isExpanded ? '400ms' : '300ms'}, ${isExpanded ? '300ms' : '200ms'}`,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1), ease-out',
              transitionDelay: isExpanded ? `${index * 50}ms` : '0ms'
            }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

export function DashboardNavigationMenu() {
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    {
      path: '/dashboard',
      icon: <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      label: 'Dashboard'
    },
    {
      path: '/investigadores',
      icon: <Users className="h-5 w-5 text-green-600 dark:text-green-400" />,
      label: 'Investigadores'
    },
    {
      path: '/proyectos',
      icon: <FolderOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      label: 'Proyectos'
    },
    {
      path: '/tareas-programadas',
      icon: <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
      label: 'Tareas Programadas'
    }
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <MenuContainer>
      {menuItems.map((item) => (
        <MenuItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          isActive={pathname === item.path}
          onClick={() => handleNavigation(item.path)}
        />
      ))}
    </MenuContainer>
  )
}
