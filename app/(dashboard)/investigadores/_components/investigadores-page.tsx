"use client"

import { useState } from "react"
import { Search, Users, Building2, Clock, Mail, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ThemeSwitcher } from "@/components/theme-switcher"

// Datos mock de investigadores
const investigadores = [
  {
    id: 1,
    nombreCompleto: "Dr. María Elena Rodríguez García",
    documento: "12.345.678",
    correoInstitucional: "maria.rodriguez@universidad.edu.co",
    grupoInvestigacion: "Inteligencia Artificial Aplicada",
    facultadSede: "Facultad de Ingeniería - Sede Bogotá",
    horasSemanales: 40,
  },
  {
    id: 2,
    nombreCompleto: "PhD. Carlos Alberto Mendoza Silva",
    documento: "23.456.789",
    correoInstitucional: "carlos.mendoza@universidad.edu.co",
    grupoInvestigacion: "Biotecnología Molecular",
    facultadSede: "Facultad de Ciencias - Sede Medellín",
    horasSemanales: 35,
  },
  {
    id: 3,
    nombreCompleto: "Dra. Ana Sofía Herrera López",
    documento: "34.567.890",
    correoInstitucional: "ana.herrera@universidad.edu.co",
    grupoInvestigacion: "Estudios Sociales Contemporáneos",
    facultadSede: "Facultad de Humanidades - Sede Cali",
    horasSemanales: 30,
  },
  {
    id: 4,
    nombreCompleto: "Dr. Roberto Alejandro Torres Vega",
    documento: "45.678.901",
    correoInstitucional: "roberto.torres@universidad.edu.co",
    grupoInvestigacion: "Energías Renovables",
    facultadSede: "Facultad de Ingeniería - Sede Bogotá",
    horasSemanales: 42,
  },
  {
    id: 5,
    nombreCompleto: "PhD. Laura Cristina Morales Díaz",
    documento: "56.789.012",
    correoInstitucional: "laura.morales@universidad.edu.co",
    grupoInvestigacion: "Neurociencias Cognitivas",
    facultadSede: "Facultad de Medicina - Sede Bogotá",
    horasSemanales: 38,
  },
  {
    id: 6,
    nombreCompleto: "Dr. Fernando José Castillo Ruiz",
    documento: "67.890.123",
    correoInstitucional: "fernando.castillo@universidad.edu.co",
    grupoInvestigacion: "Matemáticas Aplicadas",
    facultadSede: "Facultad de Ciencias - Sede Medellín",
    horasSemanales: 36,
  },
]

export default function InvestigadoresPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInvestigadores = investigadores.filter(
    (investigador) =>
      investigador.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investigador.grupoInvestigacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investigador.facultadSede.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investigador.correoInstitucional.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getHorasColor = (horas: number) => {
    if (horas >= 40) return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
    if (horas >= 35) return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <ThemeSwitcher/>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
              <Users className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Investigadores
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Gestión y seguimiento del personal investigador</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Total Investigadores</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{investigadores.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                    <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Grupos de Investigación</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">6</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                    <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Promedio H/S</p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">37</p>
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
                  Directorio de Investigadores
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  Lista completa del personal investigador activo
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar investigador, grupo o facultad..."
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
                        <Users className="h-4 w-4" />
                        Investigador
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Documento
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Correo Institucional
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                      Grupo de Investigación
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Facultad / Sede
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <Clock className="h-4 w-4" />
                        H/S
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvestigadores.map((investigador) => (
                    <TableRow
                      key={investigador.id}
                      className="border-slate-200 dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-150"
                    >
                      <TableCell className="font-medium">
                        <div className="space-y-1">
                          <div className="text-slate-900 dark:text-slate-100 font-semibold">
                            {investigador.nombreCompleto}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400 font-mono text-sm">
                        {investigador.documento}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${investigador.correoInstitucional}`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150 text-sm"
                        >
                          {investigador.correoInstitucional}
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          {investigador.grupoInvestigacion}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
                        {investigador.facultadSede}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="secondary"
                          className={`${getHorasColor(investigador.horasSemanales)} font-semibold px-3 py-1`}
                        >
                          {investigador.horasSemanales}h
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredInvestigadores.length === 0 && (
              <div className="text-center py-12">
                <div className="text-slate-400 dark:text-slate-500 text-lg mb-2">No se encontraron investigadores</div>
                <div className="text-slate-500 dark:text-slate-400 text-sm">Intenta con otros términos de búsqueda</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
