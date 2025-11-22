# Especificación de Pantallas y Arquitectura de Navegación

## Índice

1. [Resumen del Sistema](#resumen-del-sistema)
2. [Arquitectura de Navegación](#arquitectura-de-navegación)
3. [Diagrama de Flujo](#diagrama-de-flujo)
4. [Especificación de Pantallas](#especificación-de-pantallas)
5. [Estados de Vista](#estados-de-vista)
6. [Transiciones y Acciones](#transiciones-y-acciones)

---

## Resumen del Sistema

**BLAST UI** es una aplicación web para realizar búsquedas de alineamiento de secuencias biológicas. El sistema replica la funcionalidad del NCBI BLAST con una interfaz moderna construida en React.

### Stack Tecnológico
- **Framework**: React 18.3.1 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Estilos**: Tailwind CSS 4.1.3
- **Componentes**: shadcn/ui + Radix UI
- **Iconos**: Lucide React

---

## Arquitectura de Navegación

### Sistema de Rutas

El sistema utiliza **navegación basada en estado** (state-based routing) sin librerías externas como React Router.

```typescript
type ViewState =
  | 'home'           // Página principal
  | 'form'           // Formulario de búsqueda
  | 'searching'      // Estado de búsqueda en progreso
  | 'results'        // Resultados de BLAST
  | 'nuccore'        // Búsqueda en base de datos NUCCORE
  | 'nuccore-detail' // Detalle de registro NUCCORE
  | 'components';    // Documentación de componentes UI
```

### Rutas URL Soportadas

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | `home` | Página principal con selección de tipo BLAST |
| `/components` | `components` | Documentación del Design System |

> **Nota**: Las demás vistas se manejan internamente sin cambios de URL.

---

## Diagrama de Flujo

```
                                    ┌─────────────────────┐
                                    │   /components       │
                                    │   (Design System)   │
                                    └──────────┬──────────┘
                                               │ onGoHome
                                               ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                              ┌─────────────┐                                 │
│                              │    HOME     │                                 │
│                              │  (landing)  │                                 │
│                              └──────┬──────┘                                 │
│                                     │                                        │
│                    ┌────────────────┼────────────────┐                       │
│                    │                │                │                       │
│                    ▼                ▼                ▼                       │
│         ┌──────────────┐   ┌──────────────┐   ┌──────────────┐              │
│         │  Nucleotide  │   │   Protein    │   │   NUCCORE    │              │
│         │    BLAST     │   │    BLAST     │   │   Database   │              │
│         └──────┬───────┘   └──────┬───────┘   └──────┬───────┘              │
│                │                  │                  │                       │
│                └────────┬─────────┘                  │                       │
│                         ▼                            ▼                       │
│                ┌─────────────────┐          ┌─────────────────┐             │
│                │      FORM       │          │  NUCCORE SEARCH │             │
│                │  (search form)  │          │    (listing)    │             │
│                └────────┬────────┘          └────────┬────────┘             │
│                         │                            │                       │
│                         ▼                            ▼                       │
│                ┌─────────────────┐          ┌─────────────────┐             │
│                │   SEARCHING     │          │  NUCCORE DETAIL │             │
│                │   (progress)    │          │   (GenBank)     │             │
│                └────────┬────────┘          └─────────────────┘             │
│                         │                                                    │
│                         ▼                                                    │
│                ┌─────────────────┐                                          │
│                │    RESULTS      │                                          │
│                │  (alignments)   │                                          │
│                └─────────────────┘                                          │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Especificación de Pantallas

### 1. HOME (Página Principal)

**Componente**: `BlastHome.tsx`
**Ruta**: `/`
**Estado**: `home`

#### Descripción
Página de bienvenida que presenta las opciones de búsqueda BLAST disponibles.

#### Estructura Visual

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ ┌─────────┐                                    ┌──────────────┐ │
│ │ 🧬 Logo │  BLAST                             │ NUCCORE DB   │ │
│ └─────────┘  Basic Local Alignment...          └──────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                 Basic Local Alignment Search Tool               │
│                                                                 │
│          BLAST finds regions of similarity between...           │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │                 │  │                 │  │                 │ │
│  │  🧬 Nucleotide  │  │  💊 Protein     │  │  🔒 blastx      │ │
│  │     BLAST       │  │     BLAST       │  │   (disabled)    │ │
│  │                 │  │                 │  │                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐                      │
│  │  🔒 tblastn     │  │  🔒 tblastx     │                      │
│  │   (disabled)    │  │   (disabled)    │                      │
│  └─────────────────┘  └─────────────────┘                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Elementos

| Elemento | Descripción | Interacción |
|----------|-------------|-------------|
| Header Logo | Icono DNA con gradiente + título | - |
| Botón NUCCORE | Acceso a base de datos | Navega a `nuccore` |
| Card Nucleotide BLAST | Selección BLASTN | Navega a `form` con tipo `nucleotide` |
| Card Protein BLAST | Selección BLASTP | Navega a `form` con tipo `protein` |
| Cards blastx/tblastn/tblastx | Opciones deshabilitadas | Muestra badge "Coming Soon" |

#### Acciones Disponibles

| Acción | Handler | Resultado |
|--------|---------|-----------|
| Seleccionar Nucleotide | `onSelectBlast('nucleotide')` | Vista `form`, tab nucleotide |
| Seleccionar Protein | `onSelectBlast('protein')` | Vista `form`, tab protein |
| Ir a NUCCORE | `onGoToNuccore()` | Vista `nuccore` |

---

### 2. FORM (Formulario de Búsqueda)

**Componente**: `BlastSearchForm.tsx`
**Estado**: `form`

#### Descripción
Formulario completo para configurar y ejecutar una búsqueda BLAST.

#### Estructura Visual

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ ← Back    🧬 BLASTP - Protein Search              [Quick][Adv]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─ TABS ─────────────────────────────────────────────────────┐ │
│  │  [Nucleotide]  [Protein]                                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─ QUERY SECTION ────────────────────────────────────────────┐ │
│  │  Search Title: [________________________]                   │ │
│  │                                                             │ │
│  │  Enter Query Sequence:                                      │ │
│  │  ┌─────────────────────────────────────────────────────┐   │ │
│  │  │ >sequence_name                                       │   │ │
│  │  │ MKWVTFISLLFLFSSAYS...                               │   │ │
│  │  └─────────────────────────────────────────────────────┘   │ │
│  │                                                             │ │
│  │  [Upload File]  [Use Example: Human insulin]               │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─ DATABASE SECTION ─────────────────────────────────────────┐ │
│  │  Database: [Clustered nr ▼]                                 │ │
│  │  Organism: [Homo sapiens___] (autocomplete)                │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─ ADVANCED PARAMETERS (collapsible) ────────────────────────┐ │
│  │  ▼ Algorithm Parameters                                     │ │
│  │    Max Target Sequences: [100]                              │ │
│  │    Expect Threshold: [10]                                   │ │
│  │    Word Size: [3]                                           │ │
│  │    Matrix: [BLOSUM62 ▼]                                     │ │
│  │    Gap Costs: [Existence: 11, Extension: 1 ▼]              │ │
│  │                                                             │ │
│  │  ▼ Filters and Masking                                      │ │
│  │    [ ] Low complexity regions                               │ │
│  │    [ ] Mask for lookup table only                          │ │
│  │    [ ] Mask lower case letters                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─ ACTIONS ──────────────────────────────────────────────────┐ │
│  │     [Reset]        [BLAST Search 🔍]                        │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Modos de Búsqueda

| Modo | Descripción |
|------|-------------|
| **Quick** | Muestra solo parámetros esenciales |
| **Advanced** | Muestra todos los parámetros disponibles |

#### Campos del Formulario

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| Search Title | Input text | No | Nombre descriptivo de la búsqueda |
| Query Sequence | Textarea | Sí | Secuencia en formato FASTA |
| Database | Select | Sí | Base de datos objetivo |
| Organism | Input + autocomplete | No | Filtrar por organismo |
| Max Target Sequences | Input number | No | Límite de resultados |
| Expect Threshold | Input number | No | E-value máximo |
| Word Size | Input number | No | Tamaño de palabra |
| Matrix | Select | No | Matriz de sustitución |
| Gap Costs | Select | No | Penalización de gaps |

#### Validaciones

- Secuencia no puede estar vacía
- Secuencia debe estar en formato FASTA válido
- Se valida antes de enviar (indicadores visuales)

#### Acciones Disponibles

| Acción | Handler | Resultado |
|--------|---------|-----------|
| Iniciar búsqueda | `onStartSearch(data)` | Vista `searching` |
| Reset | Interno | Limpia el formulario |
| Volver | `onGoHome()` | Vista `home` |

---

### 3. SEARCHING (Estado de Búsqueda)

**Componente**: `BlastSearchStatus.tsx`
**Estado**: `searching`

#### Descripción
Pantalla de progreso mientras se ejecuta la búsqueda BLAST.

#### Estructura Visual

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ ← Back to Search                                                │
│ ⏳ BLAST Search In Progress                                     │
│    Request ID: BLAST7X9K2M...    [BLASTP]                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─ SEARCH INFO ──────────────────────────────────────────────┐ │
│  │  📄 Human Insulin Protein Search                            │ │
│  │                                                             │ │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░  75%                         │ │
│  │                                                             │ │
│  │  ⏱️ Elapsed: 0:45                                           │ │
│  │  📅 Submitted: Nov 22, 14:30:00                             │ │
│  │  🗄️ Database: Clustered nr                                  │ │
│  │  ⚡ Algorithm: BLASTP                                        │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─ SEQUENCE PREVIEW ─────────────────────────────────────────┐ │
│  │  📄 Query Sequence (first 50 aa)                            │ │
│  │  MKWVTFISLLFLFSSAYSRGVFRRDAHKSEVAHRFKDLGE...               │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─ ACTIONS ──────────────────────────────────────────────────┐ │
│  │     [Cancel Search]        [New Search]                     │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Elementos Dinámicos

| Elemento | Comportamiento |
|----------|----------------|
| Progress Bar | Se actualiza cada segundo (+2.5% hasta 95%) |
| Elapsed Time | Contador en formato mm:ss |
| Request ID | Generado aleatoriamente |
| Spinner | Animación continua en header |

#### Acciones Disponibles

| Acción | Handler | Resultado |
|--------|---------|-----------|
| Cancelar | `onCancel()` | Vista `form` |
| Nueva búsqueda | `onNewSearch()` | Vista `home` |

> **Nota**: Después de ~3 segundos, navega automáticamente a `results`.

---

### 4. RESULTS (Resultados)

**Componente**: `BlastResults.tsx`
**Estado**: `results`

#### Descripción
Visualización completa de los resultados de la búsqueda BLAST.

#### Estructura Visual

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ ✓ Search Complete                        [Download ▼] [Edit]   │
│   Request ID: BLAST7X9K2M...  [BLASTP]   [Save] [New Search]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─ TABS ─────────────────────────────────────────────────────┐ │
│  │ [Descriptions] [Graphic Summary] [Alignments] [Taxonomy]   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─ FILTERS PANEL ────────────────────────────────────────────┐ │
│  │  Identity: [0%────────100%]  Coverage: [0%────────100%]    │ │
│  │  Max E-value: [10]           Sort: [Score ▼] [↓ Desc]      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─ RESULTS TABLE ────────────────────────────────────────────┐ │
│  │  [ ] ☆ Accession    Description           Score  E-value   │ │
│  │  ─────────────────────────────────────────────────────────  │ │
│  │  [ ] ☆ NP_001308... Insulin precursor     256    1e-45     │ │
│  │  [ ] ☆ XP_002485... Insulin-like prot...  189    3e-32     │ │
│  │  [ ] ☆ AAH05478...  Insulin isoform 1     175    8e-28     │ │
│  │  ...                                                        │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─ ALIGNMENTS (expandable) ──────────────────────────────────┐ │
│  │  ▼ NP_001308421.1 - Insulin precursor                       │ │
│  │    Score: 256 bits  E-value: 1e-45  Identity: 98%          │ │
│  │                                                             │ │
│  │    Query  1    MKWVTFISLLFLFSSAYSRGVFRR  24                 │ │
│  │                MKWVTFISLLFLFSSAYSRGVFRR                     │ │
│  │    Sbjct  1    MKWVTFISLLFLFSSAYSRGVFRR  24                 │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Tabs de Resultados

| Tab | Descripción |
|-----|-------------|
| **Descriptions** | Tabla resumen de todos los hits |
| **Graphic Summary** | Visualización gráfica de alineamientos |
| **Alignments** | Alineamientos detallados expandibles |
| **Taxonomy** | Distribución taxonómica de resultados |

#### Filtros y Ordenamiento

| Filtro | Tipo | Descripción |
|--------|------|-------------|
| Min Identity | Slider | Filtrar por % identidad mínima |
| Min Coverage | Slider | Filtrar por % cobertura mínima |
| Max E-value | Input | Filtrar por E-value máximo |
| Sort By | Select | Ordenar por score/evalue/identity/coverage |
| Sort Order | Toggle | Ascendente/Descendente |

#### Acciones Disponibles

| Acción | Handler | Resultado |
|--------|---------|-----------|
| Descargar | Interno | Exporta en varios formatos |
| Guardar | Interno | Guarda en historial |
| Editar búsqueda | `onEditSearch()` | Vista `form` |
| Nueva búsqueda | `onNewSearch()` | Vista `home` |
| Favoritos | Interno | Marca/desmarca resultado |
| Seleccionar | Interno | Selección múltiple |

---

### 5. NUCCORE SEARCH (Búsqueda de Base de Datos)

**Componente**: `NuccoreSearch.tsx`
**Estado**: `nuccore`

#### Descripción
Interfaz de búsqueda en la base de datos NUCCORE (nucleotide sequences).

#### Estructura Visual

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ 🧬 NUCCORE Database                              [🏠 Home]      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─ SEARCH BAR ───────────────────────────────────────────────┐ │
│  │  [Nucleotide ▼] [Influenza A virus_____________] [Search]  │ │
│  │                                                             │ │
│  │  Recent: Influenza A virus | SARS-CoV-2 | HIV-1            │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─ SIDEBAR FILTERS ──────┐  ┌─ RESULTS ─────────────────────┐ │
│  │                        │  │                                │ │
│  │  ▼ Record Type         │  │  Results: 1-20 of 2,847       │ │
│  │    [ ] RefSeq          │  │  [List] [Table] [Combined]    │ │
│  │    [✓] GenBank         │  │                                │ │
│  │                        │  │  ┌─────────────────────────┐  │ │
│  │  ▼ Molecule Type       │  │  │ OF023917.1              │  │ │
│  │    [ ] DNA             │  │  │ Influenza A virus...    │  │ │
│  │    [ ] RNA             │  │  │ 1,701 bp | RNA | 2024   │  │ │
│  │                        │  │  └─────────────────────────┘  │ │
│  │  ▼ Sequence Length     │  │                                │ │
│  │    Min: [____]         │  │  ┌─────────────────────────┐  │ │
│  │    Max: [____]         │  │  │ OF023916.1              │  │ │
│  │                        │  │  │ Influenza A virus...    │  │ │
│  │  ▼ Release Date        │  │  │ 1,683 bp | RNA | 2024   │  │ │
│  │    From: [____]        │  │  └─────────────────────────┘  │ │
│  │    To:   [____]        │  │                                │ │
│  │                        │  │  ...                           │ │
│  └────────────────────────┘  └────────────────────────────────┘ │
│                                                                 │
│  ┌─ PAGINATION ───────────────────────────────────────────────┐ │
│  │  Per page: [20 ▼]    [< Prev] 1 2 3 ... 142 [Next >]       │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Filtros Disponibles

| Filtro | Tipo | Descripción |
|--------|------|-------------|
| Record Type | Checkbox group | RefSeq, GenBank |
| Molecule Type | Checkbox group | DNA, RNA |
| Sequence Length | Range inputs | Min/Max longitud |
| Release Date | Date range | Rango de fechas |
| Country | Text input | País de origen |
| Complete Genome | Checkbox | Solo genomas completos |

#### Modos de Vista

| Modo | Descripción |
|------|-------------|
| **List** | Cards con información expandida |
| **Table** | Vista tabular compacta |
| **Combined** | Híbrido lista + detalles |

#### Acciones Disponibles

| Acción | Handler | Resultado |
|--------|---------|-----------|
| Ver detalle | `onViewDetail(accession)` | Vista `nuccore-detail` |
| Búsqueda | Interno | Filtra resultados |
| Favoritos | Interno | Marca registros |
| Descargar | Interno | Exporta selección |
| Home | `onGoHome()` | Vista `home` |

---

### 6. NUCCORE DETAIL (Detalle de Registro)

**Componente**: `NuccoreDetail.tsx`
**Estado**: `nuccore-detail`

#### Descripción
Vista detallada de un registro de secuencia en formato GenBank.

#### Estructura Visual

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER                                                          │
│ ← Back to Results    OF023917.1            [Download ▼] [Share]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─ SUMMARY BAR ──────────────────────────────────────────────┐ │
│  │  1,701 bp  |  RNA  |  Linear  |  2024-03-15  |  GenBank    │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌─ GENBANK FORMAT (collapsible sections) ────────────────────┐ │
│  │                                                             │ │
│  │  ▼ LOCUS                                         [?] [📋]  │ │
│  │    OF023917    1701 bp    RNA    linear    VRL 15-MAR-2024 │ │
│  │                                                             │ │
│  │  ▼ DEFINITION                                    [?] [📋]  │ │
│  │    Influenza A virus (A/swine/Spain/AR1150/2024(H3N2))     │ │
│  │    segment 4 hemagglutinin (HA) gene, complete cds.        │ │
│  │                                                             │ │
│  │  ▼ ACCESSION                                     [?] [📋]  │ │
│  │    OF023917                                                 │ │
│  │                                                             │ │
│  │  ▼ VERSION                                       [?] [📋]  │ │
│  │    OF023917.1                                               │ │
│  │                                                             │ │
│  │  ▼ SOURCE                                        [?] [📋]  │ │
│  │    Influenza A virus (A/swine/Spain/AR1150/2024(H3N2))     │ │
│  │      ORGANISM  Influenza A virus                           │ │
│  │                Viruses; Riboviria; ...                     │ │
│  │                                                             │ │
│  │  ▼ FEATURES                                      [?] [📋]  │ │
│  │    source          1..1701                                  │ │
│  │                    /organism="Influenza A virus"           │ │
│  │                    /mol_type="viral cRNA"                  │ │
│  │    gene            16..1713                                 │ │
│  │                    /gene="HA"                              │ │
│  │    CDS             16..1713                                 │ │
│  │                    /gene="HA"                              │ │
│  │                    /codon_start=1                          │ │
│  │                    /product="hemagglutinin"                │ │
│  │                    /protein_id="WPG71270.1"                │ │
│  │                    /translation="MKTIIALSYILC..."          │ │
│  │                                                             │ │
│  │  ▼ ORIGIN                                        [?] [📋]  │ │
│  │         1 agcaaaagca ggggataatt ctattaacca tgaagactat       │ │
│  │        61 cattgctttg agctacattt tatgtctggt tttcgctcaa       │ │
│  │       121 aaacttcccg gaaatgacaa cagcacagca acgctgtgcc       │ │
│  │       ...                                                   │ │
│  │                                                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Secciones GenBank

| Sección | Descripción | Expandida por defecto |
|---------|-------------|----------------------|
| LOCUS | Identificador, longitud, tipo | ✓ |
| DEFINITION | Descripción completa | ✓ |
| ACCESSION | Número de acceso | ✗ |
| VERSION | Versión del registro | ✗ |
| KEYWORDS | Palabras clave | ✗ |
| SOURCE | Organismo fuente | ✗ |
| REFERENCE | Referencias bibliográficas | ✗ |
| FEATURES | Anotaciones biológicas | ✓ |
| ORIGIN | Secuencia nucleotídica | ✓ |

#### Acciones por Sección

| Acción | Icono | Descripción |
|--------|-------|-------------|
| Ayuda | `?` | Muestra diálogo explicativo |
| Copiar | `📋` | Copia contenido al portapapeles |

#### Acciones Disponibles

| Acción | Handler | Resultado |
|--------|---------|-----------|
| Volver | `onBack()` | Vista `nuccore` |
| Home | `onGoHome()` | Vista `home` |
| Descargar | Interno | Exporta en GenBank/FASTA |
| Compartir | Interno | Genera enlace |

---

### 7. COMPONENTS (Documentación UI)

**Componente**: `ComponentsDocumentation.tsx`
**Ruta**: `/components`
**Estado**: `components`

#### Descripción
Página de documentación del Design System con ejemplos interactivos de todos los componentes UI.

#### Tabs Disponibles

| Tab | Contenido |
|-----|-----------|
| Vista General | Stack tecnológico, principios de diseño |
| Colores | Paleta de colores, gradientes, colores semánticos |
| Tipografía | Fuentes, escala tipográfica, pesos |
| Botones | Variantes, tamaños, estados |
| Formularios | Inputs, selects, checkboxes, switches |
| Componentes | Cards, badges, alerts, tables, tooltips |
| Iconografía | Galería de iconos Lucide, tamaños |

---

## Estados de Vista

### Diagrama de Estados

```
                    ┌──────────────────┐
                    │                  │
           ┌────────►      home        ◄────────┐
           │        │                  │        │
           │        └────────┬─────────┘        │
           │                 │                  │
           │    ┌────────────┼────────────┐     │
           │    │            │            │     │
           │    ▼            ▼            ▼     │
           │ ┌──────┐   ┌──────────┐  ┌───────┐ │
           │ │ form │   │ nuccore  │  │compon.│ │
           │ └──┬───┘   └────┬─────┘  └───────┘ │
           │    │            │                  │
           │    ▼            ▼                  │
           │ ┌──────────┐ ┌──────────────┐      │
           │ │searching │ │nuccore-detail│      │
           │ └────┬─────┘ └──────────────┘      │
           │      │                             │
           │      ▼                             │
           │ ┌─────────┐                        │
           └─┤ results ├────────────────────────┘
             └─────────┘
```

### Transiciones de Estado

| Desde | Hacia | Trigger |
|-------|-------|---------|
| `home` | `form` | Click en card BLAST |
| `home` | `nuccore` | Click en botón NUCCORE |
| `home` | `components` | Navegación URL `/components` |
| `form` | `home` | Click en Home/Back |
| `form` | `searching` | Submit de búsqueda |
| `searching` | `form` | Click en Cancel |
| `searching` | `results` | Timeout (3 segundos) |
| `searching` | `home` | Click en New Search |
| `results` | `home` | Click en New Search |
| `results` | `form` | Click en Edit Search |
| `nuccore` | `home` | Click en Home |
| `nuccore` | `nuccore-detail` | Click en resultado |
| `nuccore-detail` | `nuccore` | Click en Back |
| `nuccore-detail` | `home` | Click en Home |
| `components` | `home` | Click en Back/Home |

---

## Transiciones y Acciones

### Handlers Globales (App.tsx)

```typescript
// Navegación principal
handleSelectBlast(type: 'nucleotide' | 'protein')  // → form
handleNewSearch()                                    // → home
handleGoToNuccore()                                  // → nuccore

// Flujo de búsqueda BLAST
handleStartSearch(data: any)                         // → searching → results
handleCancelSearch()                                 // → form
handleEditSearch()                                   // → form

// Flujo NUCCORE
handleViewNuccoreDetail(accession: string)           // → nuccore-detail
handleBackToNuccore()                                // → nuccore
```

### Navegación con URL

```typescript
// Manejo de rutas URL
navigateTo(view: ViewState, path: string)            // Actualiza URL + estado

// Listener de navegación del navegador
window.addEventListener('popstate', handlePopState)  // Sincroniza estado con URL
```

---

## Apéndice: Props de Componentes

### BlastHome
```typescript
interface BlastHomeProps {
  onSelectBlast: (type: 'nucleotide' | 'protein') => void;
  onGoToNuccore?: () => void;
}
```

### BlastSearchForm
```typescript
interface BlastSearchFormProps {
  onStartSearch: (data: any) => void;
  initialTab?: 'nucleotide' | 'protein';
  onGoHome?: () => void;
}
```

### BlastSearchStatus
```typescript
interface BlastSearchStatusProps {
  searchData: any;
  onCancel: () => void;
  onNewSearch: () => void;
}
```

### BlastResults
```typescript
interface BlastResultsProps {
  searchData: any;
  onNewSearch: () => void;
  onEditSearch: () => void;
  onGoHome?: () => void;
}
```

### NuccoreSearch
```typescript
interface NuccoreSearchProps {
  onViewDetail: (accession: string) => void;
  onGoHome?: () => void;
}
```

### NuccoreDetail
```typescript
interface NuccoreDetailProps {
  accession: string;
  onBack: () => void;
  onGoHome?: () => void;
}
```

### ComponentsDocumentation
```typescript
interface ComponentsDocumentationProps {
  onGoHome: () => void;
}
```

---

*Documento generado para BLAST UI - Noviembre 2024*
