"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { 
  CheckCircle, 
  XCircle, 
  Calendar, 
  FileCheck,
  Search,
  Filter,
  Clock,
  AlertTriangle
} from "lucide-react"

interface ProjectEndorsement {
  projectId: number
  projectTitle: string
  projectAcronym: string
  isEndorsed: boolean
  endorsementDate?: string
  endorsementTime?: string
  rejectionNote?: string
  directorName: string
  projectType: string
  projectStatus: string
}

const projectEndorsements: ProjectEndorsement[] = [
  {
    projectId: 1,
    projectTitle: "Desarrollo de Sistemas de Inteligencia Artificial para Diagnóstico Médico",
    projectAcronym: "SIADM",
    isEndorsed: true,
    endorsementDate: "15/03/2024",
    endorsementTime: "10:30 a. m.",
    directorName: "Dr. María Elena Rodríguez García",
    projectType: "Investigación",
    projectStatus: "En ejecución"
  },
  {
    projectId: 2,
    projectTitle: "Biotecnología Aplicada al Desarrollo de Nuevos Biomateriales Sostenibles",
    projectAcronym: "BIOMATSOS",
    isEndorsed: true,
    endorsementDate: "22/02/2024",
    endorsementTime: "2:15 p. m.",
    directorName: "PhD. Carlos Alberto Mendoza Silva",
    projectType: "Investigación",
    projectStatus: "Activo"
  },
  {
    projectId: 3,
    projectTitle: "Impacto Social de las Tecnologías Emergentes en Comunidades Rurales",
    projectAcronym: "ISTECR",
    isEndorsed: false,
    rejectionNote: "Falta documentación técnica requerida. El proyecto no presenta metodología clara para la implementación en comunidades rurales. Se requiere plan de trabajo más detallado y cronograma específico.",
    directorName: "Dra. Ana Sofía Herrera López",
    projectType: "Extensión",
    projectStatus: "Liquidado"
  },
  {
    projectId: 4,
    projectTitle: "Optimización de Sistemas de Energía Solar Fotovoltaica para Aplicaciones Industriales",
    projectAcronym: "OSEFAI",
    isEndorsed: true,
    endorsementDate: "08/04/2024",
    endorsementTime: "9:45 a. m.",
    directorName: "Dr. Roberto Alejandro Torres Vega",
    projectType: "Innovación",
    projectStatus: "En ejecución"
  },
  {
    projectId: 5,
    projectTitle: "Plataforma Digital para la Enseñanza de Matemáticas en Educación Básica",
    projectAcronym: "PDMEB",
    isEndorsed: false,
    rejectionNote: "El presupuesto presentado no es coherente con los objetivos planteados. Se identificaron inconsistencias en la distribución de recursos humanos y técnicos. Requiere revisión completa del componente financiero.",
    directorName: "Dr. María Elena Rodríguez García",
    projectType: "Investigación",
    projectStatus: "Suspendido"
  },
  {
    projectId: 6,
    projectTitle: "Monitoreo Ambiental Mediante Sensores IoT para Calidad del Aire Urbano",
    projectAcronym: "MASCA",
    isEndorsed: true,
    endorsementDate: "12/01/2024",
    endorsementTime: "11:20 a. m.",
    directorName: "PhD. Carlos Alberto Mendoza Silva",
    projectType: "Investigación",
    projectStatus: "Liquidado"
  }
]

export default function AvalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Todos")

  const filters = ["Todos", "Avalados", "No avalados", "Pendientes"]

  const filteredEndorsements = projectEndorsements.filter(endorsement => {
    const matchesSearch = endorsement.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endorsement.projectAcronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endorsement.directorName.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (!matchesSearch) return false
    
    switch (activeFilter) {
      case "Avalados":
        return endorsement.isEndorsed
      case "No avalados":
        return !endorsement.isEndorsed
      case "Pendientes":
        return endorsement.projectStatus === "En ejecución" && !endorsement.isEndorsed
      default:
        return true
    }
  })

  const avaladosCount = projectEndorsements.filter(e => e.isEndorsed).length
  const noAvaladosCount = projectEndorsements.filter(e => !e.isEndorsed).length
  const pendientesCount = projectEndorsements.filter(e => e.projectStatus === "En ejecución" && !e.isEndorsed).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <FileCheck className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Avales de Proyectos
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Estado de aprobación y validación de proyectos institucionales
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <FileCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Proyectos</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{projectEndorsements.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Avalados</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{avaladosCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">No Avalados</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{noAvaladosCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Pendientes</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{pendientesCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros y búsqueda */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Filtros */}
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter)}
                  className="text-sm"
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* Búsqueda */}
            <div className="relative md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar proyecto o director"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Lista de avales */}
        <div className="space-y-4">
          {filteredEndorsements.length === 0 ? (
            <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Filter className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  No se encontraron proyectos que coincidan con los filtros seleccionados.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredEndorsements.map((endorsement) => (
                <AccordionItem key={endorsement.projectId} value={endorsement.projectId.toString()} className="border-0">
                  <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <AccordionTrigger className="hover:no-underline p-0">
                      <CardHeader className="w-full">
                        <div className="flex items-start justify-between">
                          <div className="text-left space-y-2">
                            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                              {endorsement.projectTitle}
                            </CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-400">
                              {endorsement.projectAcronym} · {endorsement.projectType}
                            </CardDescription>
                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Director: {endorsement.directorName}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right space-y-2">
                            <div className="flex items-center gap-2">
                              {endorsement.isEndorsed ? (
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                              <Badge 
                                variant={endorsement.isEndorsed ? "default" : "destructive"}
                                className={endorsement.isEndorsed 
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400" 
                                  : ""
                                }
                              >
                                {endorsement.isEndorsed ? "Avalado" : "No avalado"}
                              </Badge>
                            </div>
                            {endorsement.isEndorsed && endorsement.endorsementDate && (
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {endorsement.endorsementDate} · {endorsement.endorsementTime}
                              </p>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {endorsement.projectStatus}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                    </AccordionTrigger>

                    <AccordionContent>
                      <CardContent className="pt-0">
                        <div className="space-y-6">
                          {/* Estado del aval */}
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
                              Estado del Aval
                            </h4>
                            {endorsement.isEndorsed ? (
                              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                                <div className="flex items-center gap-3 mb-2">
                                  <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                  <span className="font-medium text-emerald-800 dark:text-emerald-400">
                                    Proyecto Avalado
                                  </span>
                                </div>
                                <div className="text-sm text-emerald-700 dark:text-emerald-300">
                                  <p><strong>Fecha de aprobación:</strong> {endorsement.endorsementDate}</p>
                                  <p><strong>Hora:</strong> {endorsement.endorsementTime}</p>
                                  <p className="mt-2">El proyecto ha sido revisado y cumple con todos los requisitos institucionales.</p>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                <div className="flex items-center gap-3 mb-3">
                                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                  <span className="font-medium text-red-800 dark:text-red-400">
                                    Aval Denegado
                                  </span>
                                </div>
                                <div className="text-sm text-red-700 dark:text-red-300">
                                  <p className="font-medium mb-2">Motivo de denegación:</p>
                                  <p className="leading-relaxed">{endorsement.rejectionNote}</p>
                                </div>
                                <div className="mt-3 flex items-center gap-2 text-xs text-red-600 dark:text-red-400">
                                  <AlertTriangle className="h-4 w-4" />
                                  <span>Se recomienda contactar con la oficina de gestión de proyectos para más información.</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Información del proyecto */}
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
                              Información del Proyecto
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="text-sm">
                                  <span className="text-slate-500 dark:text-slate-400">Título: </span>
                                  <span className="text-slate-900 dark:text-slate-100">{endorsement.projectTitle}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-slate-500 dark:text-slate-400">Acrónimo: </span>
                                  <span className="text-slate-900 dark:text-slate-100">{endorsement.projectAcronym}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-slate-500 dark:text-slate-400">Tipo: </span>
                                  <Badge variant="outline" className="text-xs ml-1">
                                    {endorsement.projectType}
                                  </Badge>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="text-sm">
                                  <span className="text-slate-500 dark:text-slate-400">Director: </span>
                                  <span className="text-slate-900 dark:text-slate-100">{endorsement.directorName}</span>
                                </div>
                                <div className="text-sm">
                                  <span className="text-slate-500 dark:text-slate-400">Estado: </span>
                                  <Badge variant="outline" className="text-xs ml-1">
                                    {endorsement.projectStatus}
                                  </Badge>
                                </div>
                                <div className="text-sm">
                                  <span className="text-slate-500 dark:text-slate-400">ID Proyecto: </span>
                                  <span className="font-mono text-slate-900 dark:text-slate-100">{endorsement.projectId}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </div>
  )
}