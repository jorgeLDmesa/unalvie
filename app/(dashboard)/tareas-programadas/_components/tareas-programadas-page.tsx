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
  Clock, 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Download,
  Search,
  Filter
} from "lucide-react"

// Tipos de datos
interface TaskExecution {
  date: string
  time: string
  status: "success" | "error"
  result: string
  downloadUrl?: string
}

interface ScheduledTask {
  id: string
  name: string
  description: string
  frequency: string
  nextExecution: string
  lastResult: {
    status: "success" | "error"
    summary: string
  }
  recipients: string[]
  history: TaskExecution[]
}

// Datos hardcodeados de las 6 tareas
const scheduledTasks: ScheduledTask[] = [
  {
    id: "1",
    name: "Informe mensual de ejecución por facultad",
    description: "Genera el PDF de ejecución por facultad y lo envía a decanos y Secretaría.",
    frequency: "Mensual · día 1 · 8:00 a. m.",
    nextExecution: "01/08/2024 · 8:00 a. m.",
    lastResult: {
      status: "success",
      summary: "8 informes enviados"
    },
    recipients: ["Decanos", "Secretaría"],
    history: [
      {
        date: "01/07/2024",
        time: "8:00 a. m.",
        status: "success",
        result: "8 informes enviados correctamente",
        downloadUrl: "#"
      },
      {
        date: "01/06/2024", 
        time: "8:00 a. m.",
        status: "success",
        result: "8 informes enviados correctamente",
        downloadUrl: "#"
      },
      {
        date: "01/05/2024",
        time: "8:00 a. m.", 
        status: "error",
        result: "Error al enviar informes a 2 decanos"
      }
    ]
  },
  {
    id: "2",
    name: "Alertas diarias de hitos vencidos y próximos 7 días",
    description: "Envía un resumen de proyectos con hitos vencidos o por vencer en la semana.",
    frequency: "Diario · 7:30 a. m. (lunes a viernes)",
    nextExecution: "29/07/2024 · 7:30 a. m.",
    lastResult: {
      status: "success",
      summary: "3 vencidos · 5 próximos"
    },
    recipients: ["Profesores/directores", "Canal interno"],
    history: [
      {
        date: "26/07/2024",
        time: "7:30 a. m.",
        status: "success",
        result: "Alertas enviadas: 3 vencidos, 5 próximos"
      },
      {
        date: "25/07/2024",
        time: "7:30 a. m.",
        status: "success", 
        result: "Alertas enviadas: 2 vencidos, 7 próximos"
      },
      {
        date: "24/07/2024",
        time: "7:30 a. m.",
        status: "success",
        result: "Alertas enviadas: 1 vencido, 4 próximos"
      }
    ]
  },
  {
    id: "3",
    name: "Contratos por vencer (próximos 30 días)",
    description: "Lista contratos que terminan en los próximos 30 días y envía recordatorios.",
    frequency: "Semanal · lunes · 8:30 a. m.",
    nextExecution: "29/07/2024 · 8:30 a. m.",
    lastResult: {
      status: "success",
      summary: "2 contratos por vencer antes del 31/08"
    },
    recipients: ["Decanos", "Secretaría", "Canal interno"],
    history: [
      {
        date: "22/07/2024",
        time: "8:30 a. m.",
        status: "success",
        result: "2 contratos por vencer identificados"
      },
      {
        date: "15/07/2024",
        time: "8:30 a. m.",
        status: "success",
        result: "3 contratos por vencer identificados"
      },
      {
        date: "08/07/2024",
        time: "8:30 a. m.",
        status: "error",
        result: "Error al acceder a la base de datos de contratos"
      }
    ]
  },
  {
    id: "4", 
    name: "Resumen semanal para directores",
    description: "Envío de breve reporte de avance del proyecto a cada director (tareas completadas, próximas fechas, alertas).",
    frequency: "Semanal · viernes · 4:00 p. m.",
    nextExecution: "02/08/2024 · 4:00 p. m.",
    lastResult: {
      status: "success",
      summary: "29 resúmenes enviados"
    },
    recipients: ["Profesores/directores"],
    history: [
      {
        date: "26/07/2024",
        time: "4:00 p. m.",
        status: "success",
        result: "29 resúmenes enviados correctamente",
        downloadUrl: "#"
      },
      {
        date: "19/07/2024",
        time: "4:00 p. m.",
        status: "success",
        result: "28 resúmenes enviados correctamente",
        downloadUrl: "#"
      },
      {
        date: "12/07/2024",
        time: "4:00 p. m.",
        status: "success",
        result: "30 resúmenes enviados correctamente",
        downloadUrl: "#"
      }
    ]
  },
  {
    id: "5",
    name: "Alertas de desviación presupuestal",
    description: "Detecta proyectos con ejecución > 90% sin adición registrada, o con saldo negativo.",
    frequency: "Diario · 6:00 a. m.",
    nextExecution: "29/07/2024 · 6:00 a. m.",
    lastResult: {
      status: "success",
      summary: "1 proyecto con posible desviación"
    },
    recipients: ["Decanos", "Secretaría", "Canal interno"],
    history: [
      {
        date: "28/07/2024",
        time: "6:00 a. m.",
        status: "success",
        result: "1 proyecto con posible desviación detectado"
      },
      {
        date: "27/07/2024",
        time: "6:00 a. m.",
        status: "success",
        result: "Sin desviaciones detectadas"
      },
      {
        date: "26/07/2024",
        time: "6:00 a. m.",
        status: "success",
        result: "2 proyectos con posible desviación detectados"
      }
    ]
  },
  {
    id: "6",
    name: "Correo semanal a profesores (directores) – recordatorio de pendientes",
    description: "Envía a cada profesor/director un correo con: pendientes de la semana, documentos faltantes, y próximos hitos.",
    frequency: "Semanal · lunes · 7:45 a. m.",
    nextExecution: "29/07/2024 · 7:45 a. m.",
    lastResult: {
      status: "success",
      summary: "Correos enviados a 42 profesores"
    },
    recipients: ["Profesores/directores"],
    history: [
      {
        date: "22/07/2024",
        time: "7:45 a. m.",
        status: "success",
        result: "Correos enviados a 42 profesores"
      },
      {
        date: "15/07/2024",
        time: "7:45 a. m.",
        status: "success",
        result: "Correos enviados a 41 profesores"
      },
      {
        date: "08/07/2024",
        time: "7:45 a. m.",
        status: "error",
        result: "Error al enviar correos a 5 profesores"
      }
    ]
  }
]

export default function TareasProgramadasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("Todas")

  const filters = ["Todas", "Exitosas", "No exitosas", "Próximas 24 h"]

  // Filtrar tareas según búsqueda y filtro activo
  const filteredTasks = scheduledTasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (!matchesSearch) return false
    
    switch (activeFilter) {
      case "Exitosas":
        return task.lastResult.status === "success"
      case "No exitosas":
        return task.lastResult.status === "error"
      case "Próximas 24 h":
        // Simulamos que algunas tareas están en próximas 24h
        return task.id === "2" || task.id === "3" || task.id === "5" || task.id === "6"
      default:
        return true
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <Clock className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Tareas programadas
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Automatizaciones del sistema · Zona horaria: America/Bogotá
              </p>
            </div>
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
                placeholder="Buscar tarea por nombre"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Lista de tareas */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Filter className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  No se encontraron tareas que coincidan con los filtros seleccionados.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredTasks.map((task) => (
                <AccordionItem key={task.id} value={task.id} className="border-0">
                  <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <AccordionTrigger className="hover:no-underline p-0">
                      <CardHeader className="w-full">
                        <div className="flex items-start justify-between">
                          <div className="text-left space-y-2">
                            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                              {task.name}
                            </CardTitle>
                            <CardDescription className="text-slate-600 dark:text-slate-400">
                              {task.frequency}
                            </CardDescription>
                            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Próxima: {task.nextExecution}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right space-y-2">
                            <div className="flex items-center gap-2">
                              {task.lastResult.status === "success" ? (
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-500" />
                              )}
                              <Badge 
                                variant={task.lastResult.status === "success" ? "default" : "destructive"}
                                className={task.lastResult.status === "success" 
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400" 
                                  : ""
                                }
                              >
                                {task.lastResult.status === "success" ? "Exitoso" : "No exitoso"}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {task.lastResult.summary}
                            </p>
                            {task.lastResult.status === "error" && (
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Nuestro equipo ya fue notificado.
                              </p>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </AccordionTrigger>

                    <AccordionContent>
                      <CardContent className="pt-0">
                        <div className="space-y-6">
                          {/* Descripción */}
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                              Descripción
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {task.description}
                            </p>
                          </div>

                          {/* Destinatarios */}
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                              Destinatarios / Entrega
                            </h4>
                            <div className="flex gap-2 flex-wrap">
                              {task.recipients.map((recipient, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {recipient}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Historial */}
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-3">
                              Historial (últimas ejecuciones)
                            </h4>
                            <div className="space-y-2">
                              {task.history.map((execution, index) => (
                                <div 
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                      {execution.date} · {execution.time}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      {execution.status === "success" ? (
                                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                                      ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                      )}
                                      <span className={`text-sm font-medium ${
                                        execution.status === "success" 
                                          ? "text-emerald-700 dark:text-emerald-400" 
                                          : "text-red-700 dark:text-red-400"
                                      }`}>
                                        {execution.status === "success" ? "Exitoso" : "No exitoso"}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                      {execution.result}
                                    </span>
                                    {execution.downloadUrl && execution.status === "success" && (
                                      <Button size="sm" variant="outline" className="h-8">
                                        <Download className="h-3 w-3 mr-1" />
                                        Ver/Descargar
                                      </Button>
                                    )}
                                    {execution.status === "error" && (
                                      <span className="text-xs text-slate-500 dark:text-slate-400">
                                        El equipo ya fue notificado.
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
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