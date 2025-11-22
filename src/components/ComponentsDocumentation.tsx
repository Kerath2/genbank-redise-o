import { ArrowLeft, Check, X, ChevronRight, Dna, Pill, Database, Home, Search, Settings, User, Mail, Bell, Calendar, Download, Upload, Edit, Trash2, Plus, Minus, Copy, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

interface ComponentsDocumentationProps {
  onGoHome: () => void;
}

export function ComponentsDocumentation({ onGoHome }: ComponentsDocumentationProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onGoHome}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-[#030213]">Design System</h1>
                <p className="text-sm text-muted-foreground">Documentación de componentes UI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">v1.0.0</Badge>
              <Badge className="bg-gradient-to-r from-[#21D7FF] via-[#704BFF] to-[#FC10C3] text-white border-0">
                BLAST UI
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white border">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="colors">Colores</TabsTrigger>
            <TabsTrigger value="typography">Tipografía</TabsTrigger>
            <TabsTrigger value="buttons">Botones</TabsTrigger>
            <TabsTrigger value="forms">Formularios</TabsTrigger>
            <TabsTrigger value="components">Componentes</TabsTrigger>
            <TabsTrigger value="icons">Iconografía</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Stack Tecnológico</CardTitle>
                <CardDescription>Tecnologías y librerías utilizadas en el proyecto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-[#030213]">Core</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> React 18.3.1</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> TypeScript</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Vite 6.3.5</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-[#030213]">Estilos</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Tailwind CSS 4.1.3</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> CSS Custom Properties</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> OKLCH Color Space</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-[#030213]">Componentes</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> shadcn/ui</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Radix UI Primitives</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Lucide Icons</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Principios de Diseño</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-[#21D7FF]/10 via-[#704BFF]/10 to-[#FC10C3]/10 border">
                    <h4 className="font-medium mb-2">Accesibilidad</h4>
                    <p className="text-sm text-muted-foreground">Componentes ARIA-compliant con soporte completo de teclado y lectores de pantalla.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-[#21D7FF]/10 via-[#704BFF]/10 to-[#FC10C3]/10 border">
                    <h4 className="font-medium mb-2">Consistencia</h4>
                    <p className="text-sm text-muted-foreground">Sistema de diseño unificado con tokens de diseño y variantes predefinidas.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-[#21D7FF]/10 via-[#704BFF]/10 to-[#FC10C3]/10 border">
                    <h4 className="font-medium mb-2">Responsividad</h4>
                    <p className="text-sm text-muted-foreground">Diseño mobile-first que se adapta a todos los tamaños de pantalla.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-[#21D7FF]/10 via-[#704BFF]/10 to-[#FC10C3]/10 border">
                    <h4 className="font-medium mb-2">Modo Oscuro</h4>
                    <p className="text-sm text-muted-foreground">Soporte nativo para temas claro y oscuro con transiciones suaves.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Colores de Marca</CardTitle>
                <CardDescription>Gradiente principal utilizado en elementos destacados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="h-24 rounded-lg bg-gradient-to-r from-[#21D7FF] via-[#704BFF] to-[#FC10C3] flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Gradiente Principal</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[#21D7FF]"></div>
                      <p className="text-sm font-medium">Cian</p>
                      <code className="text-xs text-muted-foreground">#21D7FF</code>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[#704BFF]"></div>
                      <p className="text-sm font-medium">Púrpura</p>
                      <code className="text-xs text-muted-foreground">#704BFF</code>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 rounded-lg bg-[#FC10C3]"></div>
                      <p className="text-sm font-medium">Rosa</p>
                      <code className="text-xs text-muted-foreground">#FC10C3</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Colores del Sistema</CardTitle>
                <CardDescription>Paleta de colores semánticos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-[#030213]"></div>
                    <p className="text-sm font-medium">Primary</p>
                    <code className="text-xs text-muted-foreground">#030213</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-[#ececf0] border"></div>
                    <p className="text-sm font-medium">Muted</p>
                    <code className="text-xs text-muted-foreground">#ececf0</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-[#717182]"></div>
                    <p className="text-sm font-medium">Muted Foreground</p>
                    <code className="text-xs text-muted-foreground">#717182</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-[#d4183d]"></div>
                    <p className="text-sm font-medium">Destructive</p>
                    <code className="text-xs text-muted-foreground">#d4183d</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-[#f3f3f5] border"></div>
                    <p className="text-sm font-medium">Input Background</p>
                    <code className="text-xs text-muted-foreground">#f3f3f5</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-[#e9ebef] border"></div>
                    <p className="text-sm font-medium">Accent</p>
                    <code className="text-xs text-muted-foreground">#e9ebef</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-[#cbced4]"></div>
                    <p className="text-sm font-medium">Switch Background</p>
                    <code className="text-xs text-muted-foreground">#cbced4</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg bg-white border"></div>
                    <p className="text-sm font-medium">Background</p>
                    <code className="text-xs text-muted-foreground">#ffffff</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Colores para Gráficos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg" style={{ backgroundColor: 'oklch(0.646 0.222 41.116)' }}></div>
                    <p className="text-sm font-medium">Chart 1</p>
                    <code className="text-xs text-muted-foreground">Naranja</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg" style={{ backgroundColor: 'oklch(0.6 0.118 184.704)' }}></div>
                    <p className="text-sm font-medium">Chart 2</p>
                    <code className="text-xs text-muted-foreground">Cian</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg" style={{ backgroundColor: 'oklch(0.398 0.07 227.392)' }}></div>
                    <p className="text-sm font-medium">Chart 3</p>
                    <code className="text-xs text-muted-foreground">Azul oscuro</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg" style={{ backgroundColor: 'oklch(0.828 0.189 84.429)' }}></div>
                    <p className="text-sm font-medium">Chart 4</p>
                    <code className="text-xs text-muted-foreground">Amarillo</code>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 rounded-lg" style={{ backgroundColor: 'oklch(0.769 0.188 70.08)' }}></div>
                    <p className="text-sm font-medium">Chart 5</p>
                    <code className="text-xs text-muted-foreground">Naranja claro</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Sistema Tipográfico</CardTitle>
                <CardDescription>Fuentes del sistema para máximo rendimiento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Font Sans (Predeterminada)</h4>
                  <code className="text-xs text-muted-foreground block">
                    ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
                  </code>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Font Mono</h4>
                  <code className="text-xs font-mono text-muted-foreground block">
                    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Escala Tipográfica</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Clase</TableHead>
                      <TableHead>Tamaño</TableHead>
                      <TableHead>Ejemplo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell><code>text-xs</code></TableCell>
                      <TableCell>0.75rem (12px)</TableCell>
                      <TableCell><span className="text-xs">Texto extra pequeño</span></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>text-sm</code></TableCell>
                      <TableCell>0.875rem (14px)</TableCell>
                      <TableCell><span className="text-sm">Texto pequeño</span></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>text-base</code></TableCell>
                      <TableCell>1rem (16px)</TableCell>
                      <TableCell><span className="text-base">Texto base</span></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>text-lg</code></TableCell>
                      <TableCell>1.125rem (18px)</TableCell>
                      <TableCell><span className="text-lg">Texto grande</span></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>text-xl</code></TableCell>
                      <TableCell>1.25rem (20px)</TableCell>
                      <TableCell><span className="text-xl">Texto extra grande</span></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>text-2xl</code></TableCell>
                      <TableCell>1.5rem (24px)</TableCell>
                      <TableCell><span className="text-2xl">Título 2XL</span></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><code>text-4xl</code></TableCell>
                      <TableCell>2.25rem (36px)</TableCell>
                      <TableCell><span className="text-4xl">Título 4XL</span></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pesos de Fuente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-normal text-lg">Normal (400)</span>
                    <code className="text-sm text-muted-foreground">font-normal</code>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium text-lg">Medium (500)</span>
                    <code className="text-sm text-muted-foreground">font-medium</code>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-semibold text-lg">Semibold (600)</span>
                    <code className="text-sm text-muted-foreground">font-semibold</code>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-bold text-lg">Bold (700)</span>
                    <code className="text-sm text-muted-foreground">font-bold</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Buttons Tab */}
          <TabsContent value="buttons" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Variantes de Botón</CardTitle>
                <CardDescription>Diferentes estilos para distintos contextos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="space-y-2 text-center">
                      <Button variant="default">Default</Button>
                      <p className="text-xs text-muted-foreground">variant="default"</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <Button variant="secondary">Secondary</Button>
                      <p className="text-xs text-muted-foreground">variant="secondary"</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <Button variant="outline">Outline</Button>
                      <p className="text-xs text-muted-foreground">variant="outline"</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <Button variant="ghost">Ghost</Button>
                      <p className="text-xs text-muted-foreground">variant="ghost"</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <Button variant="link">Link</Button>
                      <p className="text-xs text-muted-foreground">variant="link"</p>
                    </div>
                    <div className="space-y-2 text-center">
                      <Button variant="destructive">Destructive</Button>
                      <p className="text-xs text-muted-foreground">variant="destructive"</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tamaños de Botón</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-end gap-4">
                  <div className="space-y-2 text-center">
                    <Button size="sm">Small</Button>
                    <p className="text-xs text-muted-foreground">size="sm"</p>
                  </div>
                  <div className="space-y-2 text-center">
                    <Button size="default">Default</Button>
                    <p className="text-xs text-muted-foreground">size="default"</p>
                  </div>
                  <div className="space-y-2 text-center">
                    <Button size="lg">Large</Button>
                    <p className="text-xs text-muted-foreground">size="lg"</p>
                  </div>
                  <div className="space-y-2 text-center">
                    <Button size="icon"><Plus className="h-4 w-4" /></Button>
                    <p className="text-xs text-muted-foreground">size="icon"</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Botones con Iconos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button><Plus className="mr-2 h-4 w-4" /> Agregar</Button>
                  <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Descargar</Button>
                  <Button variant="secondary"><Search className="mr-2 h-4 w-4" /> Buscar</Button>
                  <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Eliminar</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Botón Gradiente (Especial)</CardTitle>
                <CardDescription>Usado para acciones principales y destacadas</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="bg-gradient-to-r from-[#21D7FF] via-[#704BFF] to-[#FC10C3] text-white border-0 hover:opacity-90">
                  <Dna className="mr-2 h-4 w-4" /> Iniciar Búsqueda BLAST
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Campos de Entrada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="input-default">Input Default</Label>
                    <Input id="input-default" placeholder="Escribe aquí..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="input-disabled">Input Disabled</Label>
                    <Input id="input-disabled" placeholder="Deshabilitado" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="input-icon">Input con Icono</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input id="input-icon" className="!pl-11" placeholder="Buscar..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="input-email">Email</Label>
                    <Input id="input-email" type="email" placeholder="ejemplo@correo.com" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Textarea</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="textarea">Secuencia FASTA</Label>
                  <Textarea
                    id="textarea"
                    placeholder=">secuencia_1&#10;ATCGATCGATCG..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">Ingresa tu secuencia en formato FASTA</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-64 space-y-2">
                  <Label>Base de datos</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nr">nr (Non-redundant)</SelectItem>
                      <SelectItem value="nt">nt (Nucleotide)</SelectItem>
                      <SelectItem value="refseq">RefSeq</SelectItem>
                      <SelectItem value="pdb">PDB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Checkbox y Switch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Checkboxes</h4>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="check1" defaultChecked />
                      <Label htmlFor="check1">Opción seleccionada</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="check2" />
                      <Label htmlFor="check2">Opción no seleccionada</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="check3" disabled />
                      <Label htmlFor="check3" className="text-muted-foreground">Opción deshabilitada</Label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Switches</h4>
                    <div className="flex items-center space-x-2">
                      <Switch id="switch1" defaultChecked />
                      <Label htmlFor="switch1">Activado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="switch2" />
                      <Label htmlFor="switch2">Desactivado</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="switch3" disabled />
                      <Label htmlFor="switch3" className="text-muted-foreground">Deshabilitado</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Cards</CardTitle>
                <CardDescription>Contenedores con diferentes estructuras</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Título de Card</CardTitle>
                      <CardDescription>Descripción opcional de la card</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Contenido de la card aquí.</p>
                    </CardContent>
                  </Card>
                  <Card className="border-l-4 border-l-[#704BFF]">
                    <CardHeader>
                      <CardTitle>Card con Acento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Card con borde lateral de color.</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge className="bg-green-500 text-white">Success</Badge>
                  <Badge className="bg-yellow-500 text-white">Warning</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Bell className="h-4 w-4" />
                  <AlertTitle>Información</AlertTitle>
                  <AlertDescription>Este es un mensaje informativo para el usuario.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <X className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Ha ocurrido un error al procesar la solicitud.</AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback>AB</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-[#21D7FF] to-[#704BFF] text-white">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton</CardTitle>
                <CardDescription>Estados de carga</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accordion</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>¿Qué es BLAST?</AccordionTrigger>
                    <AccordionContent>
                      BLAST (Basic Local Alignment Search Tool) es un algoritmo para comparar secuencias biológicas.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>¿Cómo funciona?</AccordionTrigger>
                    <AccordionContent>
                      Compara secuencias de nucleótidos o proteínas con bases de datos para encontrar similitudes.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tooltips</CardTitle>
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <div className="flex gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Hover me</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Este es un tooltip</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Table</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Accession</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>E-value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">NM_001234</TableCell>
                      <TableCell>Homo sapiens gene</TableCell>
                      <TableCell>256</TableCell>
                      <TableCell>1e-45</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">NM_005678</TableCell>
                      <TableCell>Mus musculus gene</TableCell>
                      <TableCell>189</TableCell>
                      <TableCell>3e-32</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Icons Tab */}
          <TabsContent value="icons" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Librería de Iconos</CardTitle>
                <CardDescription>Lucide React v0.487.0 - Iconos utilizados en el proyecto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                  {[
                    { icon: Dna, name: 'Dna' },
                    { icon: Pill, name: 'Pill' },
                    { icon: Database, name: 'Database' },
                    { icon: Home, name: 'Home' },
                    { icon: Search, name: 'Search' },
                    { icon: Settings, name: 'Settings' },
                    { icon: User, name: 'User' },
                    { icon: Mail, name: 'Mail' },
                    { icon: Bell, name: 'Bell' },
                    { icon: Calendar, name: 'Calendar' },
                    { icon: Download, name: 'Download' },
                    { icon: Upload, name: 'Upload' },
                    { icon: Edit, name: 'Edit' },
                    { icon: Trash2, name: 'Trash2' },
                    { icon: Plus, name: 'Plus' },
                    { icon: Minus, name: 'Minus' },
                    { icon: Check, name: 'Check' },
                    { icon: X, name: 'X' },
                    { icon: ChevronRight, name: 'ChevronRight' },
                    { icon: ArrowLeft, name: 'ArrowLeft' },
                    { icon: Copy, name: 'Copy' },
                    { icon: ExternalLink, name: 'ExternalLink' },
                  ].map(({ icon: Icon, name }) => (
                    <div key={name} className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-muted transition-colors">
                      <Icon className="h-6 w-6" />
                      <span className="text-xs text-muted-foreground">{name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tamaños de Iconos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <Dna className="h-4 w-4" />
                    <span className="text-xs text-muted-foreground">16px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Dna className="h-5 w-5" />
                    <span className="text-xs text-muted-foreground">20px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Dna className="h-6 w-6" />
                    <span className="text-xs text-muted-foreground">24px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Dna className="h-8 w-8" />
                    <span className="text-xs text-muted-foreground">32px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Dna className="h-12 w-12" />
                    <span className="text-xs text-muted-foreground">48px</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uso de Iconos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`import { Dna, Search, Download } from 'lucide-react';

// Uso básico
<Dna className="h-6 w-6" />

// Con colores
<Search className="h-5 w-5 text-muted-foreground" />

// En botones
<Button>
  <Download className="mr-2 h-4 w-4" />
  Descargar
</Button>`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator className="my-12" />

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground pb-8">
          <p>BLAST UI Design System</p>
          <p className="mt-1">Construido con shadcn/ui + Tailwind CSS + Lucide Icons</p>
        </footer>
      </main>
    </div>
  );
}
