"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"
import { Users, FolderOpen, TrendingUp, Target, Activity, Zap } from "lucide-react"

// Datos para las gráficas
const proyectosPorEstado = [
  { name: "En ejecución", value: 2, color: "#10b981" },
  { name: "Activo", value: 1, color: "#3b82f6" },
  { name: "Liquidado", value: 2, color: "#6b7280" },
  { name: "Suspendido", value: 1, color: "#ef4444" },
]

const proyectosPorTipo = [
  { name: "Investigación", cantidad: 4, color: "#8b5cf6" },
  { name: "Extensión", cantidad: 1, color: "#f97316" },
  { name: "Innovación", cantidad: 1, color: "#06b6d4" },
]

const investigadoresPorFacultad = [
  { facultad: "Ingeniería", investigadores: 2, proyectos: 3 },
  { facultad: "Ciencias", investigadores: 2, proyectos: 2 },
  { facultad: "Medicina", investigadores: 1, proyectos: 0 },
  { facultad: "Humanidades", investigadores: 1, proyectos: 1 },
]

const proyectosPorAño = [
  { año: 2021, creados: 1, liquidados: 0 },
  { año: 2022, creados: 1, liquidados: 1 },
  { año: 2023, creados: 2, liquidados: 2 },
  { año: 2024, creados: 2, liquidados: 0 },
]

const horasDedicacion = [
  { investigador: "Dr. María Elena", horas: 40, proyectos: 2 },
  { investigador: "Dr. Roberto", horas: 42, proyectos: 1 },
  { investigador: "Dr. Carlos", horas: 35, proyectos: 2 },
  { investigador: "Dra. Ana Sofía", horas: 30, proyectos: 1 },
  { investigador: "Dra. Laura", horas: 38, proyectos: 0 },
  { investigador: "Dr. Fernando", horas: 36, proyectos: 0 },
]

const actividadMensual = [
  { mes: "Ene", proyectosIniciados: 1, proyectosFinalizados: 0 },
  { mes: "Feb", proyectosIniciados: 1, proyectosFinalizados: 0 },
  { mes: "Mar", proyectosIniciados: 1, proyectosFinalizados: 0 },
  { mes: "Abr", proyectosIniciados: 0, proyectosFinalizados: 0 },
  { mes: "May", proyectosIniciados: 0, proyectosFinalizados: 1 },
  { mes: "Jun", proyectosIniciados: 1, proyectosFinalizados: 0 },
  { mes: "Jul", proyectosIniciados: 0, proyectosFinalizados: 0 },
  { mes: "Ago", proyectosIniciados: 1, proyectosFinalizados: 0 },
]

export default function DashboardPage() {
  const totalInvestigadores = 6
  const totalProyectos = 6
  const proyectosActivos = 3
  const presupuestoTotal = 2450000000 // En pesos colombianos

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <Activity className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Dashboard de Investigación
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Métricas y análisis del sistema de investigación institucional
              </p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Investigadores</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{totalInvestigadores}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +2 este año
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Proyectos Totales</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{totalProyectos}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3" />
                    +2 este año
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                  <FolderOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Proyectos Activos</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{proyectosActivos}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {Math.round((proyectosActivos / totalProyectos) * 100)}% del total
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl">
                  <Zap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Presupuesto Total</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    ${(presupuestoTotal / 1000000).toFixed(0)}M
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">COP millones</p>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-xl">
                  <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Proyectos por Estado */}
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Distribución por Estado
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Estado actual de los proyectos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={proyectosPorEstado}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {proyectosPorEstado.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-4">
                {proyectosPorEstado.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {item.name} ({item.value})
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Proyectos por Tipo */}
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Proyectos por Tipo
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Distribución por tipo de proyecto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={proyectosPorTipo}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" className="text-slate-600 dark:text-slate-400" fontSize={12} />
                  <YAxis className="text-slate-600 dark:text-slate-400" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="cantidad" radius={[4, 4, 0, 0]}>
                    {proyectosPorTipo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Investigadores por Facultad */}
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Investigadores por Facultad
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Distribución del personal investigador
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={investigadoresPorFacultad} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" className="text-slate-600 dark:text-slate-400" fontSize={12} />
                  <YAxis
                    dataKey="facultad"
                    type="category"
                    className="text-slate-600 dark:text-slate-400"
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar dataKey="investigadores" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Timeline de Proyectos */}
          <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Timeline de Proyectos
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                Proyectos creados y liquidados por año
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={proyectosPorAño}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="año" className="text-slate-600 dark:text-slate-400" fontSize={12} />
                  <YAxis className="text-slate-600 dark:text-slate-400" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="creados"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    name="Creados"
                  />
                  <Line
                    type="monotone"
                    dataKey="liquidados"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                    name="Liquidados"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Horas de Dedicación */}
        <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Dedicación de Investigadores
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Horas semanales dedicadas por investigador
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={horasDedicacion}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="investigador"
                  className="text-slate-600 dark:text-slate-400"
                  fontSize={11}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis className="text-slate-600 dark:text-slate-400" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="horas"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Actividad Mensual */}
        <Card className="border-0 shadow-sm bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Actividad Mensual 2024
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Proyectos iniciados y finalizados por mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={actividadMensual}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="mes" className="text-slate-600 dark:text-slate-400" fontSize={12} />
                <YAxis className="text-slate-600 dark:text-slate-400" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="proyectosIniciados" fill="#10b981" radius={[2, 2, 0, 0]} name="Iniciados" />
                <Bar dataKey="proyectosFinalizados" fill="#ef4444" radius={[2, 2, 0, 0]} name="Finalizados" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
