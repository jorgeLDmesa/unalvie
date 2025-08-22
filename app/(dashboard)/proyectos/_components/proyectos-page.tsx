"use client"

import { useState } from "react"
import { Search, FolderOpen, Calendar, Clock, Award, FileText, User, FileCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ContratoModal } from "./contract-modal"

// Datos mock de investigadores (para los tooltips)
const investigadores = {
  1: {
    nombreCompleto: "Dr. María Elena Rodríguez García",
    documento: "12.345.678",
    correoInstitucional: "maria.rodriguez@universidad.edu.co",
    grupoInvestigacion: "Inteligencia Artificial Aplicada",
    facultadSede: "Facultad de Ingeniería - Sede Bogotá",
    horasSemanales: 40,
  },
  2: {
    nombreCompleto: "PhD. Carlos Alberto Mendoza Silva",
    documento: "23.456.789",
    correoInstitucional: "carlos.mendoza@universidad.edu.co",
    grupoInvestigacion: "Biotecnología Molecular",
    facultadSede: "Facultad de Ciencias - Sede Medellín",
    horasSemanales: 35,
  },
  3: {
    nombreCompleto: "Dra. Ana Sofía Herrera López",
    documento: "34.567.890",
    correoInstitucional: "ana.herrera@universidad.edu.co",
    grupoInvestigacion: "Estudios Sociales Contemporáneos",
    facultadSede: "Facultad de Humanidades - Sede Cali",
    horasSemanales: 30,
  },
  4: {
    nombreCompleto: "Dr. Roberto Alejandro Torres Vega",
    documento: "45.678.901",
    correoInstitucional: "roberto.torres@universidad.edu.co",
    grupoInvestigacion: "Energías Renovables",
    facultadSede: "Facultad de Ingeniería - Sede Bogotá",
    horasSemanales: 42,
  },
}

// Datos mock de proyectos
const proyectos = [
  {
    project_id: 1,
    quipu_code: "QUIPU-2024-001",
    hermes_code: "HERMES-AI-2024",
    agreement_code: "CONV-2024-15",
    title: "Desarrollo de Sistemas de Inteligencia Artificial para Diagnóstico Médico",
    acronym: "SIADM",
    type: "Investigación",
    modality: "Investigación Aplicada",
    submodality: "Desarrollo Tecnológico",
    status: "En ejecución",
    creation_year: 2024,
    start_date: "2024-01-15",
    end_date: "2026-01-14",
    liquidation_year: null,
    director_id: 1,
  },
  {
    project_id: 2,
    quipu_code: "QUIPU-2023-045",
    hermes_code: "HERMES-BIO-2023",
    agreement_code: "CONV-2023-28",
    title: "Biotecnología Aplicada al Desarrollo de Nuevos Biomateriales Sostenibles",
    acronym: "BIOMATSOS",
    type: "Investigación",
    modality: "Investigación Básica",
    submodality: "Ciencias Naturales",
    status: "Activo",
    creation_year: 2023,
    start_date: "2023-03-01",
    end_date: "2025-02-28",
    liquidation_year: null,
    director_id: 2,
  },
  {
    project_id: 3,
    quipu_code: "QUIPU-2022-089",
    hermes_code: "HERMES-SOC-2022",
    agreement_code: null,
    title: "Impacto Social de las Tecnologías Emergentes en Comunidades Rurales",
    acronym: "ISTECR",
    type: "Extensión",
    modality: "Proyección Social",
    submodality: "Desarrollo Comunitario",
    status: "Liquidado",
    creation_year: 2022,
    start_date: "2022-06-01",
    end_date: "2023-05-31",
    liquidation_year: 2023,
    director_id: 3,
  },
  {
    project_id: 4,
    quipu_code: "QUIPU-2024-012",
    hermes_code: "HERMES-ENE-2024",
    agreement_code: "CONV-2024-07",
    title: "Optimización de Sistemas de Energía Solar Fotovoltaica para Aplicaciones Industriales",
    acronym: "OSEFAI",
    type: "Innovación",
    modality: "Desarrollo Tecnológico",
    submodality: "Transferencia Tecnológica",
    status: "En ejecución",
    creation_year: 2024,
    start_date: "2024-02-01",
    end_date: "2025-07-31",
    liquidation_year: null,
    director_id: 4,
  },
  {
    project_id: 5,
    quipu_code: "QUIPU-2023-067",
    hermes_code: "HERMES-EDU-2023",
    agreement_code: "CONV-2023-19",
    title: "Plataforma Digital para la Enseñanza de Matemáticas en Educación Básica",
    acronym: "PDMEB",
    type: "Investigación",
    modality: "Investigación Aplicada",
    submodality: "Educación",
    status: "Suspendido",
    creation_year: 2023,
    start_date: "2023-08-01",
    end_date: "2024-12-31",
    liquidation_year: null,
    director_id: 1,
  },
  {
    project_id: 6,
    quipu_code: "QUIPU-2021-134",
    hermes_code: "HERMES-AMB-2021",
    agreement_code: "CONV-2021-42",
    title: "Monitoreo Ambiental Mediante Sensores IoT para Calidad del Aire Urbano",
    acronym: "MASCA",
    type: "Investigación",
    modality: "Investigación Aplicada",
    submodality: "Medio Ambiente",
    status: "Liquidado",
    creation_year: 2021,
    start_date: "2021-09-01",
    end_date: "2023-08-31",
    liquidation_year: 2023,
    director_id: 2,
  },
]

export default function ProyectosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [isContractModalOpen, setIsContractModalOpen] = useState(false)

  const handleOpenContractModal = (projectId: number) => {
    setSelectedProjectId(projectId)
    setIsContractModalOpen(true)
  }

  const selectedProject = proyectos.find(p => p.project_id === selectedProjectId)

  const filteredProyectos = proyectos.filter(
    (proyecto) =>
      proyecto.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.acronym.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.modality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.quipu_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.hermes_code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "En ejecución":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
      case "Liquidado":
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400"
      case "Suspendido":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Investigación":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "Extensión":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "Innovación":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const proyectosActivos = proyectos.filter((p) => p.status === "Activo" || p.status === "En ejecución").length
  const proyectosLiquidados = proyectos.filter((p) => p.status === "Liquidado").length

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <FolderOpen className="h-6 w-6 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                  Proyectos de Investigación
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Gestión y seguimiento de proyectos institucionales
                </p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <FolderOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Total Proyectos</p>
                      <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{proyectos.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                      <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Activos</p>
                      <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{proyectosActivos}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-900/20 rounded-lg">
                      <Award className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Liquidados</p>
                      <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{proyectosLiquidados}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                      <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Año Actual</p>
                      <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Search and Table */}
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Directorio de Proyectos
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    Lista completa de proyectos de investigación, extensión e innovación
                  </CardDescription>
                </div>
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Buscar proyecto, código o tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200 dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Códigos
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Proyecto</TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                        Tipo y Modalidad
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">Estado</TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Fechas
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Director
                        </div>
                      </TableHead>
                      <TableHead className="font-semibold text-slate-700 dark:text-slate-300 w-20">
                        Acciones
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProyectos.map((proyecto) => {
                      const director = investigadores[proyecto.director_id as keyof typeof investigadores]
                      return (
                        <TableRow
                          key={proyecto.project_id}
                          className="border-slate-200 dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-150"
                        >
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-xs text-slate-500 dark:text-slate-400">QUIPU:</div>
                              <div className="font-mono text-sm text-slate-700 dark:text-slate-300">
                                {proyecto.quipu_code}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">HERMES:</div>
                              <div className="font-mono text-sm text-slate-700 dark:text-slate-300">
                                {proyecto.hermes_code}
                              </div>
                              {proyecto.agreement_code && (
                                <>
                                  <div className="text-xs text-slate-500 dark:text-slate-400">Convenio:</div>
                                  <div className="font-mono text-sm text-slate-700 dark:text-slate-300">
                                    {proyecto.agreement_code}
                                  </div>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <div className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                                {proyecto.title}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs font-medium">
                                  {proyecto.acronym}
                                </Badge>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  Creado: {proyecto.creation_year}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Badge className={`${getTypeColor(proyecto.type)} text-xs font-medium`}>
                                {proyecto.type}
                              </Badge>
                              <div className="text-sm text-slate-600 dark:text-slate-400">{proyecto.modality}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{proyecto.submodality}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(proyecto.status)} font-medium`}>
                              {proyecto.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1 text-sm">
                              <div className="text-slate-600 dark:text-slate-400">
                                <span className="text-xs text-slate-500 dark:text-slate-400">Inicio: </span>
                                {formatDate(proyecto.start_date)}
                              </div>
                              <div className="text-slate-600 dark:text-slate-400">
                                <span className="text-xs text-slate-500 dark:text-slate-400">Fin: </span>
                                {formatDate(proyecto.end_date)}
                              </div>
                              {proyecto.liquidation_year && (
                                <div className="text-slate-500 dark:text-slate-400 text-xs">
                                  Liquidado: {proyecto.liquidation_year}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150">
                                  <div className="font-medium text-slate-900 dark:text-slate-100">
                                    {director?.nombreCompleto}
                                  </div>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="left" className="max-w-sm">
                                <div className="space-y-2">
                                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                                    {director?.nombreCompleto}
                                  </div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">
                                    <div>Doc: {director?.documento}</div>
                                    <div>{director?.correoInstitucional}</div>
                                    <div className="mt-1 font-medium">{director?.grupoInvestigacion}</div>
                                    <div>{director?.facultadSede}</div>
                                    <div className="mt-1">Dedicación: {director?.horasSemanales}h/semana</div>
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                                  onClick={() => handleOpenContractModal(proyecto.project_id)}
                                >
                                  <FileCheck className="h-4 w-4 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                <p>Ver contrato/convenio</p>
                              </TooltipContent>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {filteredProyectos.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-slate-400 dark:text-slate-500 text-lg mb-2">No se encontraron proyectos</div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm">
                    Intenta con otros términos de búsqueda
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      {selectedProject && (
        <ContratoModal
          open={isContractModalOpen}
          onOpenChange={setIsContractModalOpen}
          proyecto={selectedProject}
        />
      )}
    </TooltipProvider>
  )
}
