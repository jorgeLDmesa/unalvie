"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import {
  X,
  Edit,
  ChevronDown,
  CalendarIcon,
  Upload,
  FileText,
  Plus,
  Trash2,
  Eye,
  Copy,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Building,
  DollarSign,
  FileCheck,
  History,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Target } from "lucide-react" // Import Target component

interface ContratoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  proyecto: any
}

export function ContratoModal({ open, onOpenChange, proyecto }: ContratoModalProps) {
  const [activeTab, setActiveTab] = useState("resumen")
  const [hasChanges, setHasChanges] = useState(false)
  const [contratoData, setContratoData] = useState({
    codigo: "CC-2025-1234",
    tipo: "Convenio",
    ambito: "Nacional",
    rol: "Ejecutor",
    financiacion: "Externo",
    objeto: "Desarrollo de sistema de inteligencia artificial",
    objetoDetalle:
      "Desarrollo e implementación de un sistema de inteligencia artificial para diagnóstico médico automatizado, incluyendo algoritmos de machine learning y interfaz de usuario.",
    palabrasClave: ["IA", "Diagnóstico", "Machine Learning"],
    fechaLegalizacion: new Date("2024-01-10"),
    fechaFirma: new Date("2024-01-15"),
    fechaInicio: new Date("2024-01-15"),
    fechaFin: new Date("2026-01-14"),
    valorTotal: 2450000000,
    adicionValor: 0,
    valorEfectivoUN: 1200000000,
    valorEspecieUN: 300000000,
    contrapartidaHorasUN: 2000,
    contrapartidaEfectivoUN: 450000000,
    valorEfectivoParticipantes: 400000000,
    valorEspecieParticipantes: 100000000,
    valorEfectivoOtras: 0,
  })

  const [entidades, setEntidades] = useState([
    {
      id: 1,
      entidad: "Universidad Nacional de Colombia",
      nit: "899.999.063-3",
      rol: "Contratista",
      representante: "Dr. Dolly Montoya Castaño",
      correo: "rectoria@unal.edu.co",
      telefono: "+57 1 316 5000",
    },
    {
      id: 2,
      entidad: "Ministerio de Ciencia y Tecnología",
      nit: "830.116.481-1",
      rol: "Contratante",
      representante: "Dr. Arturo Luna Tapia",
      correo: "contacto@minciencias.gov.co",
      telefono: "+57 1 625 8480",
    },
  ])

  const [productos, setProductos] = useState([
    {
      id: 1,
      descripcion: "Prototipo funcional del sistema de IA",
      fechaComprometida: new Date("2025-06-30"),
      estado: "Pendiente",
    },
    {
      id: 2,
      descripcion: "Documentación técnica completa",
      fechaComprometida: new Date("2025-12-31"),
      estado: "Pendiente",
    },
  ])

  const [documentos, setDocumentos] = useState([
    {
      id: 1,
      nombre: "Contrato_Principal_CC-2025-1234.pdf",
      tipo: "Contrato",
      tamaño: "2.4 MB",
      fechaCarga: new Date("2024-01-15"),
      url: "#",
    },
    {
      id: 2,
      nombre: "Poliza_Cumplimiento.pdf",
      tipo: "Póliza",
      tamaño: "1.1 MB",
      fechaCarga: new Date("2024-01-20"),
      url: "#",
    },
  ])

  const [historial, setHistorial] = useState([
    {
      id: 1,
      fecha: new Date("2024-01-15"),
      usuario: "mrojas",
      accion: "Contrato creado",
      notas: "Contrato inicial firmado y legalizado",
    },
    {
      id: 2,
      fecha: new Date("2024-02-01"),
      usuario: "aherrera",
      accion: "Documentos cargados",
      notas: "Póliza de cumplimiento adjuntada",
    },
  ])

  const getStatusBadge = () => {
    const today = new Date()
    if (contratoData.fechaFin < today)
      return { text: "Vencido", color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" }
    if (contratoData.fechaInicio > today)
      return { text: "Borrador", color: "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400" }
    return { text: "Vigente", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400" }
  }

  const getDiasRestantes = () => {
    const today = new Date()
    const diffTime = contratoData.fechaFin.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const calcularConsistencia = () => {
    const totalCalculado =
      contratoData.valorEfectivoUN +
      contratoData.valorEspecieUN +
      contratoData.contrapartidaEfectivoUN +
      contratoData.valorEfectivoParticipantes +
      contratoData.valorEspecieParticipantes +
      contratoData.valorEfectivoOtras

    const diferencia = contratoData.valorTotal - totalCalculado
    return { totalCalculado, diferencia, esConsistente: Math.abs(diferencia) < 1000 }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const handleSave = () => {
    toast.success("Cambios guardados, el contrato ha sido actualizado exitosamente."
    )
    setHasChanges(false)
  }

  const status = getStatusBadge()
  const diasRestantes = getDiasRestantes()
  const consistencia = calcularConsistencia()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
            {/*w-[50vw] sm:max-w-none max-h-[85vh] overflow-y-auto*/}
      <DialogContent className="w-[90vw] sm:max-w-none h-[90vh] flex flex-col p-0">
        {/* Header Fijo */}
        <DialogHeader className="flex-shrink-0 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Contrato / Convenio · {contratoData.codigo}
              </DialogTitle>
              <div className="flex items-center gap-3">
                <Badge className={status.color}>{status.text}</Badge>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Última actualización: 2025-07-28 · por mrojas · v1.2
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Editar completo
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    Acciones
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Renovar
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Prorrogar
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Adicionar
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Contenido con Tabs */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="flex-shrink-0 mx-6 mt-4">
              <TabsTrigger value="resumen">Resumen</TabsTrigger>
              <TabsTrigger value="partes">Partes</TabsTrigger>
              <TabsTrigger value="finanzas">Finanzas</TabsTrigger>
              <TabsTrigger value="pagos">Pagos/Entregables</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              <TabsTrigger value="historial">Historial</TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 px-6">
              <div className="py-6">
                {/* TAB RESUMEN */}
                <TabsContent value="resumen" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Identificación
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="codigo">Convenio/Contrato (código)</Label>
                          <Input
                            id="codigo"
                            value={contratoData.codigo}
                            placeholder="CC-2025-1234"
                            onChange={(e) => {
                              setContratoData({ ...contratoData, codigo: e.target.value })
                              setHasChanges(true)
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="tipo">Tipo</Label>
                          <Select
                            value={contratoData.tipo}
                            onValueChange={(value) => {
                              setContratoData({ ...contratoData, tipo: value })
                              setHasChanges(true)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Contrato">Contrato</SelectItem>
                              <SelectItem value="Convenio">Convenio</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="ambito">Tipo de convenio (ámbito)</Label>
                          <Select
                            value={contratoData.ambito}
                            onValueChange={(value) => {
                              setContratoData({ ...contratoData, ambito: value })
                              setHasChanges(true)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Nacional">Nacional</SelectItem>
                              <SelectItem value="Internacional">Internacional</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="rol">Rol de la U</Label>
                          <Select
                            value={contratoData.rol}
                            onValueChange={(value) => {
                              setContratoData({ ...contratoData, rol: value })
                              setHasChanges(true)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Ejecutor">Ejecutor</SelectItem>
                              <SelectItem value="Coejecutor">Coejecutor</SelectItem>
                              <SelectItem value="Consultor">Consultor</SelectItem>
                              <SelectItem value="Otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="financiacion">Tipo de financiación</Label>
                          <Select
                            value={contratoData.financiacion}
                            onValueChange={(value) => {
                              setContratoData({ ...contratoData, financiacion: value })
                              setHasChanges(true)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Interno">Interno</SelectItem>
                              <SelectItem value="Externo">Externo</SelectItem>
                              <SelectItem value="Mixto">Mixto</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          Objeto
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="objeto">Objeto/objetivo (resumen)</Label>
                          <Input
                            id="objeto"
                            value={contratoData.objeto}
                            onChange={(e) => {
                              setContratoData({ ...contratoData, objeto: e.target.value })
                              setHasChanges(true)
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor="objetoDetalle">Objeto contrato (detalle)</Label>
                          <Textarea
                            id="objetoDetalle"
                            value={contratoData.objetoDetalle}
                            rows={4}
                            onChange={(e) => {
                              setContratoData({ ...contratoData, objetoDetalle: e.target.value })
                              setHasChanges(true)
                            }}
                          />
                          <div className="text-xs text-slate-500 mt-1">
                            {contratoData.objetoDetalle.length}/500 caracteres
                          </div>
                        </div>
                        <div>
                          <Label>Palabras clave</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {contratoData.palabrasClave.map((palabra, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {palabra}
                                <button
                                  onClick={() => {
                                    const nuevas = contratoData.palabrasClave.filter((_, i) => i !== index)
                                    setContratoData({ ...contratoData, palabrasClave: nuevas })
                                    setHasChanges(true)
                                  }}
                                  className="ml-2 hover:text-red-500"
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                            <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                              + Agregar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5" />
                          Fechas
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <Label>Fecha de legalización</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal bg-transparent"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {format(contratoData.fechaLegalizacion, "dd/MM/yyyy", { locale: es })}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={contratoData.fechaLegalizacion}
                                  onSelect={(date) => {
                                    if (date) {
                                      setContratoData({ ...contratoData, fechaLegalizacion: date })
                                      setHasChanges(true)
                                    }
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <Label>Firma</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal bg-transparent"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {format(contratoData.fechaFirma, "dd/MM/yyyy", { locale: es })}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={contratoData.fechaFirma}
                                  onSelect={(date) => {
                                    if (date) {
                                      setContratoData({ ...contratoData, fechaFirma: date })
                                      setHasChanges(true)
                                    }
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <Label>Inicio</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal bg-transparent"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {format(contratoData.fechaInicio, "dd/MM/yyyy", { locale: es })}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={contratoData.fechaInicio}
                                  onSelect={(date) => {
                                    if (date) {
                                      setContratoData({ ...contratoData, fechaInicio: date })
                                      setHasChanges(true)
                                    }
                                  }}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <Label>Fin</Label>
                            <div className="space-y-2">
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal bg-transparent"
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {format(contratoData.fechaFin, "dd/MM/yyyy", { locale: es })}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={contratoData.fechaFin}
                                    onSelect={(date) => {
                                      if (date) {
                                        setContratoData({ ...contratoData, fechaFin: date })
                                        setHasChanges(true)
                                      }
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <Badge variant={diasRestantes > 30 ? "default" : "destructive"} className="text-xs">
                                Días restantes: {diasRestantes}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* TAB PARTES */}
                <TabsContent value="partes" className="mt-0">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            Entidades Participantes
                          </CardTitle>
                          <CardDescription>Total entidades: {entidades.length} (1 principal)</CardDescription>
                        </div>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Agregar entidad
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Entidad</TableHead>
                            <TableHead>NIT</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Representante</TableHead>
                            <TableHead>Contacto</TableHead>
                            <TableHead>Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {entidades.map((entidad) => (
                            <TableRow key={entidad.id}>
                              <TableCell className="font-medium">{entidad.entidad}</TableCell>
                              <TableCell className="font-mono text-sm">{entidad.nit}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{entidad.rol}</Badge>
                              </TableCell>
                              <TableCell>{entidad.representante}</TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <div>{entidad.correo}</div>
                                  <div className="text-slate-500">{entidad.telefono}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* TAB FINANZAS */}
                <TabsContent value="finanzas" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Contexto General
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Moneda</Label>
                              <Select defaultValue="COP">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="COP">COP - Peso Colombiano</SelectItem>
                                  <SelectItem value="USD">USD - Dólar</SelectItem>
                                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Valor total del Convenio/Contrato</Label>
                              <Input
                                type="text"
                                value={formatCurrency(contratoData.valorTotal)}
                                onChange={(e) => {
                                  const value = Number.parseFloat(e.target.value.replace(/[^\d]/g, ""))
                                  if (!isNaN(value)) {
                                    setContratoData({ ...contratoData, valorTotal: value })
                                    setHasChanges(true)
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Adición valor (acumulado)</Label>
                            <Input
                              type="text"
                              value={formatCurrency(contratoData.adicionValor)}
                              onChange={(e) => {
                                const value = Number.parseFloat(e.target.value.replace(/[^\d]/g, ""))
                                if (!isNaN(value)) {
                                  setContratoData({ ...contratoData, adicionValor: value })
                                  setHasChanges(true)
                                }
                              }}
                            />
                            {contratoData.adicionValor > 0 && (
                              <Badge variant="secondary" className="mt-1 text-xs">
                                auto-sumado por otrosí
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>UNAL</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Valor Efectivo a ejecutar UN</Label>
                              <Input
                                type="text"
                                value={formatCurrency(contratoData.valorEfectivoUN)}
                                onChange={(e) => {
                                  const value = Number.parseFloat(e.target.value.replace(/[^\d]/g, ""))
                                  if (!isNaN(value)) {
                                    setContratoData({ ...contratoData, valorEfectivoUN: value })
                                    setHasChanges(true)
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <Label>Valor especie UN</Label>
                              <Input
                                type="text"
                                value={formatCurrency(contratoData.valorEspecieUN)}
                                onChange={(e) => {
                                  const value = Number.parseFloat(e.target.value.replace(/[^\d]/g, ""))
                                  if (!isNaN(value)) {
                                    setContratoData({ ...contratoData, valorEspecieUN: value })
                                    setHasChanges(true)
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <Label>Contrapartida horas docente UN</Label>
                              <Input
                                type="number"
                                value={contratoData.contrapartidaHorasUN}
                                onChange={(e) => {
                                  setContratoData({
                                    ...contratoData,
                                    contrapartidaHorasUN: Number.parseInt(e.target.value) || 0,
                                  })
                                  setHasChanges(true)
                                }}
                              />
                              <div className="text-xs text-slate-500 mt-1">
                                Valor equivalente: {formatCurrency(contratoData.contrapartidaHorasUN * 50000)}
                              </div>
                            </div>
                            <div>
                              <Label>Contrapartida efectivo UN</Label>
                              <Input
                                type="text"
                                value={formatCurrency(contratoData.contrapartidaEfectivoUN)}
                                onChange={(e) => {
                                  const value = Number.parseFloat(e.target.value.replace(/[^\d]/g, ""))
                                  if (!isNaN(value)) {
                                    setContratoData({ ...contratoData, contrapartidaEfectivoUN: value })
                                    setHasChanges(true)
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Entidades Participantes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Valor efectivo entidades participantes</Label>
                              <Input
                                type="text"
                                value={formatCurrency(contratoData.valorEfectivoParticipantes)}
                                onChange={(e) => {
                                  const value = Number.parseFloat(e.target.value.replace(/[^\d]/g, ""))
                                  if (!isNaN(value)) {
                                    setContratoData({ ...contratoData, valorEfectivoParticipantes: value })
                                    setHasChanges(true)
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <Label>Valor especie entidades participantes</Label>
                              <Input
                                type="text"
                                value={formatCurrency(contratoData.valorEspecieParticipantes)}
                                onChange={(e) => {
                                  const value = Number.parseFloat(e.target.value.replace(/[^\d]/g, ""))
                                  if (!isNaN(value)) {
                                    setContratoData({ ...contratoData, valorEspecieParticipantes: value })
                                    setHasChanges(true)
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Otras Entidades</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div>
                            <Label>Valor Efectivo a ejecutar otras entidades</Label>
                            <Input
                              type="text"
                              value={formatCurrency(contratoData.valorEfectivoOtras)}
                              onChange={(e) => {
                                const value = Number.parseFloat(e.target.value.replace(/[^\d]/g, ""))
                                if (!isNaN(value)) {
                                  setContratoData({ ...contratoData, valorEfectivoOtras: value })
                                  setHasChanges(true)
                                }
                              }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="h-fit">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {consistencia.esConsistente ? (
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                          Consistencia
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Valor total declarado:</div>
                          <div className="font-semibold">{formatCurrency(contratoData.valorTotal)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600 dark:text-slate-400">Suma calculada:</div>
                          <div className="font-semibold">{formatCurrency(consistencia.totalCalculado)}</div>
                        </div>
                        <Separator />
                        <div>
                          {consistencia.esConsistente ? (
                            <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              OK
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Descuadre: {formatCurrency(Math.abs(consistencia.diferencia))}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                          <div>
                            <strong>Contrapartida:</strong> recursos aportados sin giro directo
                          </div>
                          <div>
                            <strong>Especie:</strong> bienes/servicios valorados
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* TAB PAGOS/ENTREGABLES */}
                <TabsContent value="pagos" className="mt-0">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <FileCheck className="h-5 w-5" />
                            Productos Comprometidos
                          </CardTitle>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar producto
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Descripción</TableHead>
                              <TableHead>Fecha comprometida</TableHead>
                              <TableHead>Estado</TableHead>
                              <TableHead>Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {productos.map((producto) => (
                              <TableRow key={producto.id}>
                                <TableCell className="font-medium">{producto.descripcion}</TableCell>
                                <TableCell>
                                  {format(producto.fechaComprometida, "dd/MM/yyyy", { locale: es })}
                                </TableCell>
                                <TableCell>
                                  <Badge variant={producto.estado === "Pendiente" ? "secondary" : "default"}>
                                    {producto.estado}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="sm">
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* TAB DOCUMENTOS */}
                <TabsContent value="documentos" className="mt-0">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Upload className="h-5 w-5" />
                          Subir Documentos
                        </CardTitle>
                        <CardDescription>
                          Hasta 3 archivos, máx. 15 MB c/u (PDF, DOCX, imágenes). Para cargas grandes, usa la vista
                          completa.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center">
                          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                          <div className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                            Arrastra archivos aquí o haz clic para seleccionar
                          </div>
                          <Button variant="outline">Seleccionar archivos</Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Documentos Cargados</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nombre</TableHead>
                              <TableHead>Tipo</TableHead>
                              <TableHead>Tamaño</TableHead>
                              <TableHead>Cargado el</TableHead>
                              <TableHead>Acciones</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {documentos.map((doc) => (
                              <TableRow key={doc.id}>
                                <TableCell className="font-medium">{doc.nombre}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{doc.tipo}</Badge>
                                </TableCell>
                                <TableCell>{doc.tamaño}</TableCell>
                                <TableCell>{format(doc.fechaCarga, "dd/MM/yyyy", { locale: es })}</TableCell>
                                <TableCell>
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* TAB HISTORIAL */}
                <TabsContent value="historial" className="mt-0">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <History className="h-5 w-5" />
                          Timeline de Eventos
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {historial.map((evento) => (
                            <div
                              key={evento.id}
                              className="flex gap-4 pb-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0"
                            >
                              <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                  <span>{format(evento.fecha, "dd/MM/yyyy HH:mm", { locale: es })}</span>
                                  <span>·</span>
                                  <span className="font-medium">{evento.usuario}</span>
                                  <span>·</span>
                                  <span className="font-medium text-slate-900 dark:text-slate-100">
                                    {evento.accion}
                                  </span>
                                </div>
                                <div className="text-sm text-slate-700 dark:text-slate-300 mt-1">{evento.notas}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Seguimiento y Evaluación</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="seguimiento">Notas de seguimiento</Label>
                          <Textarea id="seguimiento" placeholder="Agregar notas de seguimiento..." rows={3} />
                        </div>
                        <div>
                          <Label htmlFor="evaluacion">Notas de evaluación</Label>
                          <Textarea id="evaluacion" placeholder="Agregar notas de evaluación..." rows={3} />
                        </div>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Agregar evento
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Footer Fijo */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {hasChanges ? "Cambios sin guardar" : "Cambios guardados · 15:32"}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges}>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
