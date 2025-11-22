import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Filter,
  Download,
  X,
  ExternalLink,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Star,
  Copy,
  FileText,
  HelpCircle,
  Eye,
  History,
  BookmarkPlus,
  BarChart3,
  Table as TableIcon,
  Info,
  CheckCircle2,
  AlertCircle,
  Dna,
  Home
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface NuccoreSearchProps {
  onViewDetail: (accession: string) => void;
  onGoHome?: () => void;
}

type SortField = 'default' | 'accession' | 'length' | 'date' | 'organism';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'list' | 'table' | 'combined';

interface NuccoreResult {
  id: string;
  accession: string;
  gi: string;
  title: string;
  length: string;
  lengthNum: number;
  type: string;
  date: string;
  dateNum: number;
  taxonomy: string;
  organism: string;
  recordType: 'RefSeq' | 'GenBank';
  country?: string;
  isolate?: string;
  bioproject?: string;
  biosample?: string;
  pubmedIds?: string[];
}

export function NuccoreSearch({ onViewDetail, onGoHome }: NuccoreSearchProps) {
  const [searchQuery, setSearchQuery] = useState('Influenza A virus');
  const [database, setDatabase] = useState('nucleotide');
  const [selectedResults, setSelectedResults] = useState<Set<string>>(new Set());
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set(['species', 'moleculeTypes', 'recordType']));
  const [perPage, setPerPage] = useState('20');
  const [sortField, setSortField] = useState<SortField>('default');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchHistory, setSearchHistory] = useState<string[]>(['Influenza A virus', 'SARS-CoV-2', 'HIV-1']);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [previewAccession, setPreviewAccession] = useState<string | null>(null);
  const [accessionSuggestions, setAccessionSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filtros avanzados (R13)
  const [filters, setFilters] = useState({
    recordType: [] as string[],
    minLength: '',
    maxLength: '',
    country: '',
    dateFrom: '',
    dateTo: '',
    moleculeType: [] as string[],
    completeGenome: false,
  });

  // Mock results data extendido
  const mockResults: NuccoreResult[] = [
    {
      id: 'OF023917.1',
      accession: 'OF023917.1',
      gi: '2077273571',
      title: 'KR 1020200085238-A/10: Recombinant Influenza A virus and Vaccine Composition for H5 Serotype Influenza A virus belonging to clade 2.3.4.4B comprising the same',
      length: '1,435 bp',
      lengthNum: 1435,
      type: 'RNA linear',
      date: 'PAT 04-Aug-2021',
      dateNum: new Date('2021-08-04').getTime(),
      taxonomy: 'Influenza A virus',
      organism: 'Influenza A virus',
      recordType: 'GenBank',
      country: 'South Korea',
      isolate: 'A/H5N8/clade2.3.4.4B',
      bioproject: 'PRJNA123456',
      biosample: 'SAMN12345678',
      pubmedIds: ['34567890']
    },
    {
      id: 'OF023916.1',
      accession: 'OF023916.1',
      gi: '2077273570',
      title: 'KR 1020200085238-A/9: Recombinant Influenza A virus and Vaccine Composition for H5 Serotype Influenza A virus belonging to clade 2.3.4.4B comprising the same',
      length: '1,783 bp',
      lengthNum: 1783,
      type: 'RNA linear',
      date: 'PAT 04-Aug-2021',
      dateNum: new Date('2021-08-04').getTime(),
      taxonomy: 'Influenza A virus',
      organism: 'Influenza A virus',
      recordType: 'GenBank',
      country: 'South Korea',
      bioproject: 'PRJNA123456'
    },
    {
      id: 'NC_045512.2',
      accession: 'NC_045512.2',
      gi: '1798174254',
      title: 'Severe acute respiratory syndrome coronavirus 2 isolate Wuhan-Hu-1, complete genome',
      length: '29,903 bp',
      lengthNum: 29903,
      type: 'RNA linear',
      date: 'RefSeq 13-Jan-2020',
      dateNum: new Date('2020-01-13').getTime(),
      taxonomy: 'SARS-CoV-2',
      organism: 'Severe acute respiratory syndrome coronavirus 2',
      recordType: 'RefSeq',
      country: 'China',
      isolate: 'Wuhan-Hu-1',
      pubmedIds: ['31978945', '32015508']
    },
    {
      id: 'OF023915.1',
      accession: 'OF023915.1',
      gi: '2077273569',
      title: 'KR 1020200085238-A/8: Recombinant Influenza A virus and Vaccine Composition for H5 Serotype Influenza A virus belonging to clade 2.3.4.4B comprising the same',
      length: '861 bp',
      lengthNum: 861,
      type: 'RNA linear',
      date: 'PAT 04-Aug-2021',
      dateNum: new Date('2021-08-04').getTime(),
      taxonomy: 'Influenza A virus',
      organism: 'Influenza A virus',
      recordType: 'GenBank',
      country: 'South Korea'
    },
    {
      id: 'OF023914.1',
      accession: 'OF023914.1',
      gi: '2077273568',
      title: 'KR 1020200085238-A/7: Recombinant Influenza A virus and Vaccine Composition for H5 Serotype Influenza A virus belonging to clade 2.3.4.4B comprising the same',
      length: '1,000 bp',
      lengthNum: 1000,
      type: 'RNA linear',
      date: 'PAT 04-Aug-2021',
      dateNum: new Date('2021-08-04').getTime(),
      taxonomy: 'Influenza A virus',
      organism: 'Influenza A virus',
      recordType: 'GenBank'
    },
    {
      id: 'OF023913.1',
      accession: 'OF023913.1',
      gi: '2077273567',
      title: 'KR 1020200085238-A/6: Recombinant Influenza A virus and Vaccine Composition for H5 Serotype Influenza A virus belonging to clade 2.3.4.4B comprising the same',
      length: '1,497 bp',
      lengthNum: 1497,
      type: 'RNA linear',
      date: 'PAT 04-Aug-2021',
      dateNum: new Date('2021-08-04').getTime(),
      taxonomy: 'Influenza A virus',
      organism: 'Influenza A virus',
      recordType: 'GenBank',
      biosample: 'SAMN98765432'
    }
  ];

  // Autocompletado de accesiones (N1)
  const accessionPrefixes = ['NC_', 'NM_', 'AY_', 'MN_', 'OR_', 'OF_', 'KR_', 'MW_', 'OM_'];

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);

    // Autocompletado de accesiones
    if (value.length >= 2) {
      const suggestions = mockResults
        .filter(r => r.accession.toLowerCase().includes(value.toLowerCase()))
        .map(r => r.accession)
        .slice(0, 5);
      setAccessionSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  // R8 - Ordenamiento dinámico
  const sortedResults = useMemo(() => {
    let sorted = [...mockResults];

    if (sortField !== 'default') {
      sorted.sort((a, b) => {
        let aVal: any, bVal: any;

        switch (sortField) {
          case 'accession':
            aVal = a.accession;
            bVal = b.accession;
            break;
          case 'length':
            aVal = a.lengthNum;
            bVal = b.lengthNum;
            break;
          case 'date':
            aVal = a.dateNum;
            bVal = b.dateNum;
            break;
          case 'organism':
            aVal = a.organism;
            bVal = b.organism;
            break;
          default:
            return 0;
        }

        if (typeof aVal === 'string') {
          return sortDirection === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        } else {
          return sortDirection === 'asc'
            ? aVal - bVal
            : bVal - aVal;
        }
      });
    }

    return sorted;
  }, [sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 ml-1" />;
    return sortDirection === 'asc'
      ? <ArrowUp className="h-3 w-3 ml-1" />
      : <ArrowDown className="h-3 w-3 ml-1" />;
  };

  // R9 - Resaltado de términos clave
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  // R11 - Exportación a CSV/FASTA
  const exportToCSV = () => {
    const selected = sortedResults.filter(r => selectedResults.has(r.id));
    const data = selected.length > 0 ? selected : sortedResults;

    const csv = [
      ['Accession', 'Organism', 'Length', 'Type', 'Date', 'Country', 'BioProject', 'BioSample'].join(','),
      ...data.map(r => [
        r.accession,
        r.organism,
        r.length,
        r.type,
        r.date,
        r.country || 'N/A',
        r.bioproject || 'N/A',
        r.biosample || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nuccore_results_${new Date().toISOString()}.csv`;
    a.click();
  };

  const exportToFASTA = () => {
    const selected = sortedResults.filter(r => selectedResults.has(r.id));
    const data = selected.length > 0 ? selected : sortedResults;

    const fasta = data.map(r =>
      `>${r.accession} ${r.organism} ${r.length}\nATGCTAGCTAGCTAGCTAGC...`
    ).join('\n\n');

    const blob = new Blob([fasta], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nuccore_sequences_${new Date().toISOString()}.fasta`;
    a.click();
  };

  // R26 - Favoritos
  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const toggleFilter = (filterId: string) => {
    const newExpanded = new Set(expandedFilters);
    if (newExpanded.has(filterId)) {
      newExpanded.delete(filterId);
    } else {
      newExpanded.add(filterId);
    }
    setExpandedFilters(newExpanded);
  };

  const toggleSelectAll = () => {
    if (selectedResults.size === sortedResults.length) {
      setSelectedResults(new Set());
    } else {
      setSelectedResults(new Set(sortedResults.map(r => r.id)));
    }
  };

  const toggleResult = (id: string) => {
    const newSelected = new Set(selectedResults);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedResults(newSelected);
  };

  // R12 - Mensajes claros cuando no hay resultados
  const hasResults = sortedResults.length > 0;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        {/* Search Header */}
        <div className="border-b border-[#E0E0E0] bg-white sticky top-0 z-10">
          <div className="max-w-[1600px] mx-auto px-6 py-4">
            <div className="flex items-center gap-4 mb-4">
              {onGoHome && (
                <button
                  onClick={onGoHome}
                  className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E0E0E0] hover:border-[#FC10C3] rounded-lg transition-colors group"
                  title="Back to Home"
                >
                  <div className="bg-gradient-to-br from-[#21D7FF] via-[#704BFF] to-[#FC10C3] p-1.5 rounded">
                    <Dna className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-[#757575] group-hover:text-[#FC10C3]">BLAST Home</span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Select value={database} onValueChange={setDatabase}>
                <SelectTrigger className="w-[180px] border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nucleotide">Nucleotide</SelectItem>
                  <SelectItem value="protein">Protein</SelectItem>
                  <SelectItem value="gene">Gene</SelectItem>
                  <SelectItem value="genome">Genome</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex-1 relative">
                <Input
                  value={searchQuery}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  placeholder="Search by accession, organism, or keywords..."
                  className="pr-10 border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]"
                />
                <Button
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 bg-[#FC10C3] hover:bg-[#E00FB0] text-white"
                  onClick={() => {
                    if (!searchHistory.includes(searchQuery)) {
                      setSearchHistory([searchQuery, ...searchHistory.slice(0, 9)]);
                    }
                  }}
                >
                  Search
                </Button>

                {/* N1 - Autocompletado */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E0E0E0] rounded-md shadow-lg z-50">
                    {accessionSuggestions.map(suggestion => (
                      <div
                        key={suggestion}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                        }}
                      >
                        <span className="font-mono text-[#FC10C3]">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* R25 - Historial */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#E0E0E0]"
                  >
                    <History className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="w-64">
                  <div className="space-y-1">
                    <p className="font-semibold text-xs mb-2">Recent Searches</p>
                    {searchHistory.slice(0, 5).map((query, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-[#0066CC] hover:underline cursor-pointer"
                        onClick={() => setSearchQuery(query)}
                      >
                        {query}
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>

              {/* R23 - Mini tutorial */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTutorial(true)}
                className="border-[#E0E0E0]"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>

              <Button variant="link" className="text-[#0066CC] hover:text-[#FC10C3]">
                Advanced
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1600px] mx-auto px-6 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Filters */}
            <div className="col-span-3 space-y-4">
              {/* R13 - Filtros rápidos */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Quick Filters</CardTitle>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-[#757575]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Refine your search results</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Min Length (bp)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 1000"
                      className="h-8 text-xs"
                      value={filters.minLength}
                      onChange={(e) => setFilters({...filters, minLength: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Max Length (bp)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 50000"
                      className="h-8 text-xs"
                      value={filters.maxLength}
                      onChange={(e) => setFilters({...filters, maxLength: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Country/Region</label>
                    <Input
                      placeholder="e.g., China"
                      className="h-8 text-xs"
                      value={filters.country}
                      onChange={(e) => setFilters({...filters, country: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="completeGenome"
                      checked={filters.completeGenome}
                      onCheckedChange={(checked) =>
                        setFilters({...filters, completeGenome: checked as boolean})
                      }
                    />
                    <label htmlFor="completeGenome" className="text-xs cursor-pointer">
                      Complete genomes only
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Record Type Filter */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <button
                    onClick={() => toggleFilter('recordType')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <CardTitle className="text-sm">Record Type</CardTitle>
                    {expandedFilters.has('recordType') ? (
                      <ChevronDown className="h-4 w-4 text-[#757575]" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-[#757575]" />
                    )}
                  </button>
                </CardHeader>
                {expandedFilters.has('recordType') && (
                  <CardContent className="pt-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="refseq" />
                      <label htmlFor="refseq" className="text-xs text-[#1E1E1E] cursor-pointer">
                        RefSeq (907)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="genbank" />
                      <label htmlFor="genbank" className="text-xs text-[#1E1E1E] cursor-pointer">
                        GenBank (1,450,009)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="complete" />
                      <label htmlFor="complete" className="text-xs text-[#1E1E1E] cursor-pointer">
                        Complete Genome (5,234)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="partial" />
                      <label htmlFor="partial" className="text-xs text-[#1E1E1E] cursor-pointer">
                        Partial Genome (12,456)
                      </label>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Species Filter */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <button
                    onClick={() => toggleFilter('species')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <CardTitle className="text-sm">Species</CardTitle>
                    {expandedFilters.has('species') ? (
                      <ChevronDown className="h-4 w-4 text-[#757575]" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-[#757575]" />
                    )}
                  </button>
                </CardHeader>
                {expandedFilters.has('species') && (
                  <CardContent className="pt-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="animals" />
                      <label htmlFor="animals" className="text-xs text-[#1E1E1E] cursor-pointer">
                        Animals (647)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="plants" />
                      <label htmlFor="plants" className="text-xs text-[#1E1E1E] cursor-pointer">
                        Plants (18)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="fungi" />
                      <label htmlFor="fungi" className="text-xs text-[#1E1E1E] cursor-pointer">
                        Fungi (2)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="bacteria" />
                      <label htmlFor="bacteria" className="text-xs text-[#1E1E1E] cursor-pointer">
                        Bacteria (6,972)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="viruses" defaultChecked />
                      <label htmlFor="viruses" className="text-xs text-[#1E1E1E] cursor-pointer">
                        Viruses (1,439,887)
                      </label>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Molecule Types Filter */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <button
                    onClick={() => toggleFilter('moleculeTypes')}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <CardTitle className="text-sm">Molecule types</CardTitle>
                    {expandedFilters.has('moleculeTypes') ? (
                      <ChevronDown className="h-4 w-4 text-[#757575]" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-[#757575]" />
                    )}
                  </button>
                </CardHeader>
                {expandedFilters.has('moleculeTypes') && (
                  <CardContent className="pt-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="genomic" />
                      <label htmlFor="genomic" className="text-xs text-[#1E1E1E] cursor-pointer">
                        genomic DNA/RNA (1,435,810)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="mrna" />
                      <label htmlFor="mrna" className="text-xs text-[#1E1E1E] cursor-pointer">
                        mRNA (2,683)
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="ncrna" />
                      <label htmlFor="ncrna" className="text-xs text-[#1E1E1E] cursor-pointer">
                        ncRNA (1,234)
                      </label>
                    </div>
                  </CardContent>
                )}
              </Card>

              <Button variant="link" className="text-[#0066CC] hover:text-[#FC10C3] text-xs p-0">
                Clear all filters
              </Button>
            </div>

            {/* Center - Results */}
            <div className="col-span-6 space-y-4">
              {/* R14 - Resumen inteligente */}
              {hasResults && (
                <Card className="border-[#E0E0E0] bg-blue-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">Search Summary</h3>
                        <div className="text-xs space-y-1">
                          <p>Found <strong>{sortedResults.length}</strong> nucleotide sequences for "{searchQuery}"</p>
                          <p className="text-[#757575]">
                            Most common: <span className="italic">{sortedResults[0]?.organism}</span> ({sortedResults.filter(r => r.organism === sortedResults[0]?.organism).length} records)
                          </p>
                          <p className="text-[#757575]">
                            Length range: {Math.min(...sortedResults.map(r => r.lengthNum))} - {Math.max(...sortedResults.map(r => r.lengthNum))} bp
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* R10 - Vista combinada */}
                  <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="w-auto">
                    <TabsList className="h-9">
                      <TabsTrigger value="list" className="text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        List
                      </TabsTrigger>
                      <TabsTrigger value="table" className="text-xs">
                        <TableIcon className="h-3 w-3 mr-1" />
                        Table
                      </TabsTrigger>
                      <TabsTrigger value="combined" className="text-xs">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Combined
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <Select value={perPage} onValueChange={setPerPage}>
                    <SelectTrigger className="w-[120px] h-9 border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 per page</SelectItem>
                      <SelectItem value="20">20 per page</SelectItem>
                      <SelectItem value="50">50 per page</SelectItem>
                      <SelectItem value="100">100 per page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* R11 - Exportación */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#757575]">
                    {selectedResults.size > 0 && `${selectedResults.size} selected`}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#E0E0E0] hover:border-[#FC10C3]"
                    onClick={exportToCSV}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#E0E0E0] hover:border-[#FC10C3]"
                    onClick={exportToFASTA}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    FASTA
                  </Button>
                </div>
              </div>

              {/* Results Count */}
              {hasResults ? (
                <div className="text-sm text-[#1E1E1E] flex items-center justify-between">
                  <span>
                    Items: <span className="font-medium">1 to {Math.min(parseInt(perPage), sortedResults.length)} of {sortedResults.length}</span>
                  </span>
                  <Checkbox
                    checked={selectedResults.size === sortedResults.length}
                    onCheckedChange={toggleSelectAll}
                    className="mr-2"
                  />
                </div>
              ) : (
                // R12 - Mensaje claro cuando no hay resultados
                <Card className="border-[#E0E0E0] bg-yellow-50/50">
                  <CardContent className="p-8 text-center">
                    <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No Results Found</h3>
                    <p className="text-sm text-[#757575] mb-4">
                      No nucleotide sequences match your search criteria for "{searchQuery}"
                    </p>
                    <div className="text-xs text-left bg-white p-4 rounded border border-[#E0E0E0] mb-4">
                      <p className="font-semibold mb-2">Suggestions:</p>
                      <ul className="list-disc list-inside space-y-1 text-[#757575]">
                        <li>Check your spelling</li>
                        <li>Try different keywords or accession numbers</li>
                        <li>Remove some filters to broaden your search</li>
                        <li>Use wildcards (*) for partial matches</li>
                      </ul>
                    </div>
                    <Button className="bg-[#FC10C3] hover:bg-[#E00FB0]">
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Results Display */}
              {hasResults && (
                <>
                  {/* List View */}
                  {viewMode === 'list' && (
                    <div className="space-y-3">
                      {sortedResults.slice(0, parseInt(perPage)).map((result, index) => (
                        <Card key={result.id} className="border-[#E0E0E0] hover:border-[#FC10C3] transition-colors">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="flex items-start gap-3">
                                <Checkbox
                                  checked={selectedResults.has(result.id)}
                                  onCheckedChange={() => toggleResult(result.id)}
                                />
                                <span className="text-sm text-[#757575] w-6">{index + 1}.</span>
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <h3
                                    className="text-sm text-[#0066CC] hover:underline cursor-pointer flex-1"
                                    onClick={() => onViewDetail(result.accession)}
                                  >
                                    {highlightText(result.title, searchQuery)}
                                  </h3>
                                  <div className="flex items-center gap-1">
                                    {/* N2 - Vista previa rápida */}
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-6 w-6 p-0"
                                          onClick={() => setPreviewAccession(result.accession)}
                                        >
                                          <Eye className="h-3 w-3" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Quick preview</TooltipContent>
                                    </Tooltip>

                                    {/* R26 - Favoritos */}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      onClick={() => toggleFavorite(result.id)}
                                    >
                                      <Star
                                        className={`h-3 w-3 ${favorites.has(result.id) ? 'fill-yellow-400 text-yellow-400' : ''}`}
                                      />
                                    </Button>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge variant="outline" className="text-xs">
                                    {highlightText(result.length, searchQuery)}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {result.type}
                                  </Badge>
                                  <Badge
                                    variant={result.recordType === 'RefSeq' ? 'default' : 'secondary'}
                                    className="text-xs"
                                  >
                                    {result.recordType}
                                  </Badge>
                                  {result.country && (
                                    <Badge variant="outline" className="text-xs">
                                      {highlightText(result.country, searchQuery)}
                                    </Badge>
                                  )}
                                </div>

                                <div className="text-xs text-[#1E1E1E]">
                                  <span className="font-medium">Organism:</span>{' '}
                                  <span className="italic">{highlightText(result.organism, searchQuery)}</span>
                                </div>

                                <div className="text-xs text-[#757575]">
                                  Accession: <span className="font-mono text-[#FC10C3]">{result.accession}</span>
                                  {result.gi && <> • GI: {result.gi}</>}
                                  {result.date && <> • {result.date}</>}
                                </div>

                                {(result.bioproject || result.biosample || result.pubmedIds) && (
                                  <div className="text-xs space-x-3">
                                    {result.bioproject && (
                                      <a href="#" className="text-[#0066CC] hover:underline">
                                        BioProject: {result.bioproject}
                                      </a>
                                    )}
                                    {result.biosample && (
                                      <a href="#" className="text-[#0066CC] hover:underline">
                                        BioSample: {result.biosample}
                                      </a>
                                    )}
                                    {result.pubmedIds && result.pubmedIds.length > 0 && (
                                      <a href="#" className="text-[#0066CC] hover:underline">
                                        PubMed ({result.pubmedIds.length})
                                      </a>
                                    )}
                                  </div>
                                )}

                                <div className="flex items-center gap-3 text-xs">
                                  <a href="#" className="text-[#0066CC] hover:underline">GenBank</a>
                                  <a href="#" className="text-[#0066CC] hover:underline">FASTA</a>
                                  <a href="#" className="text-[#0066CC] hover:underline">Graphics</a>
                                  <a href="#" className="text-[#0066CC] hover:underline">Run BLAST</a>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* R8 - Table View con ordenamiento */}
                  {viewMode === 'table' && (
                    <Card className="border-[#E0E0E0]">
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead className="bg-gray-50 border-b border-[#E0E0E0]">
                              <tr>
                                <th className="p-2 text-left">
                                  <Checkbox
                                    checked={selectedResults.size === sortedResults.length}
                                    onCheckedChange={toggleSelectAll}
                                  />
                                </th>
                                <th className="p-2 text-left">#</th>
                                <th
                                  className="p-2 text-left cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleSort('accession')}
                                >
                                  <div className="flex items-center">
                                    Accession
                                    {getSortIcon('accession')}
                                  </div>
                                </th>
                                <th
                                  className="p-2 text-left cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleSort('organism')}
                                >
                                  <div className="flex items-center">
                                    Organism
                                    {getSortIcon('organism')}
                                  </div>
                                </th>
                                <th
                                  className="p-2 text-left cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleSort('length')}
                                >
                                  <div className="flex items-center">
                                    Length
                                    {getSortIcon('length')}
                                  </div>
                                </th>
                                <th
                                  className="p-2 text-left cursor-pointer hover:bg-gray-100"
                                  onClick={() => handleSort('date')}
                                >
                                  <div className="flex items-center">
                                    Date
                                    {getSortIcon('date')}
                                  </div>
                                </th>
                                <th className="p-2 text-left">Type</th>
                                <th className="p-2 text-center">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sortedResults.slice(0, parseInt(perPage)).map((result, index) => (
                                <tr
                                  key={result.id}
                                  className="border-b border-[#E0E0E0] hover:bg-gray-50"
                                >
                                  <td className="p-2">
                                    <Checkbox
                                      checked={selectedResults.has(result.id)}
                                      onCheckedChange={() => toggleResult(result.id)}
                                    />
                                  </td>
                                  <td className="p-2 text-[#757575]">{index + 1}</td>
                                  <td className="p-2">
                                    <button
                                      className="font-mono text-[#0066CC] hover:underline text-left"
                                      onClick={() => onViewDetail(result.accession)}
                                    >
                                      {result.accession}
                                    </button>
                                  </td>
                                  <td className="p-2 italic">{result.organism}</td>
                                  <td className="p-2">{result.length}</td>
                                  <td className="p-2">{result.date}</td>
                                  <td className="p-2">
                                    <Badge variant="outline" className="text-[10px]">
                                      {result.recordType}
                                    </Badge>
                                  </td>
                                  <td className="p-2">
                                    <div className="flex items-center justify-center gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                        onClick={() => setPreviewAccession(result.accession)}
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                        onClick={() => toggleFavorite(result.id)}
                                      >
                                        <Star
                                          className={`h-3 w-3 ${favorites.has(result.id) ? 'fill-yellow-400 text-yellow-400' : ''}`}
                                        />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* R10 - Combined View (gráfico + tabla) */}
                  {viewMode === 'combined' && (
                    <div className="space-y-4">
                      {/* Resumen gráfico */}
                      <Card className="border-[#E0E0E0]">
                        <CardHeader>
                          <CardTitle className="text-sm">Distribution Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-blue-50 rounded">
                              <div className="text-2xl font-bold text-blue-600">
                                {sortedResults.filter(r => r.recordType === 'RefSeq').length}
                              </div>
                              <div className="text-xs text-[#757575]">RefSeq Records</div>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded">
                              <div className="text-2xl font-bold text-green-600">
                                {sortedResults.filter(r => r.recordType === 'GenBank').length}
                              </div>
                              <div className="text-xs text-[#757575]">GenBank Records</div>
                            </div>
                            <div className="text-center p-4 bg-purple-50 rounded">
                              <div className="text-2xl font-bold text-purple-600">
                                {Math.round(sortedResults.reduce((sum, r) => sum + r.lengthNum, 0) / sortedResults.length)}
                              </div>
                              <div className="text-xs text-[#757575]">Avg Length (bp)</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Lista de resultados */}
                      <div className="space-y-3">
                        {sortedResults.slice(0, parseInt(perPage)).map((result, index) => (
                          <Card key={result.id} className="border-[#E0E0E0] hover:border-[#FC10C3] transition-colors">
                            <CardContent className="p-3">
                              <div className="flex gap-3">
                                <Checkbox
                                  checked={selectedResults.has(result.id)}
                                  onCheckedChange={() => toggleResult(result.id)}
                                />
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <button
                                      className="text-xs text-[#0066CC] hover:underline text-left font-medium"
                                      onClick={() => onViewDetail(result.accession)}
                                    >
                                      {result.accession} - {result.organism}
                                    </button>
                                    <div className="flex gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-5 w-5 p-0"
                                        onClick={() => setPreviewAccession(result.accession)}
                                      >
                                        <Eye className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-5 w-5 p-0"
                                        onClick={() => toggleFavorite(result.id)}
                                      >
                                        <Star
                                          className={`h-3 w-3 ${favorites.has(result.id) ? 'fill-yellow-400 text-yellow-400' : ''}`}
                                        />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1 text-[10px] text-[#757575]">
                                    <span>{result.length}</span>
                                    <span>•</span>
                                    <span>{result.recordType}</span>
                                    {result.country && (
                                      <>
                                        <span>•</span>
                                        <span>{result.country}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pagination */}
                  <div className="flex items-center justify-center gap-2 pt-4">
                    <Button variant="outline" size="sm" disabled className="border-[#E0E0E0]">
                      &lt;&lt; First
                    </Button>
                    <Button variant="outline" size="sm" disabled className="border-[#E0E0E0]">
                      &lt; Prev
                    </Button>
                    <span className="text-sm text-[#1E1E1E] px-4">
                      Page <Input value="1" className="w-16 h-8 mx-2 text-center inline-block" /> of {Math.ceil(sortedResults.length / parseInt(perPage))}
                    </span>
                    <Button variant="outline" size="sm" className="border-[#E0E0E0] hover:border-[#FC10C3]">
                      Next &gt;
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#E0E0E0] hover:border-[#FC10C3]">
                      Last &gt;&gt;
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Right Sidebar - R21 Panel de ayuda contextual */}
            <div className="col-span-3 space-y-4">
              {/* R26 - Favoritos */}
              {favorites.size > 0 && (
                <Card className="border-[#FC10C3]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      Favorites ({favorites.size})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {sortedResults
                      .filter(r => favorites.has(r.id))
                      .slice(0, 3)
                      .map(r => (
                        <div key={r.id} className="text-xs">
                          <button
                            className="text-[#0066CC] hover:underline text-left"
                            onClick={() => onViewDetail(r.accession)}
                          >
                            {r.accession}
                          </button>
                        </div>
                      ))}
                    {favorites.size > 3 && (
                      <div className="text-[10px] text-[#757575]">
                        +{favorites.size - 3} more
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* R21 - Ayuda contextual */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    Contextual Help
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div>
                    <h4 className="font-semibold mb-1">Understanding Results</h4>
                    <ul className="space-y-1 text-[#757575]">
                      <li>• <strong>RefSeq:</strong> Curated reference sequences</li>
                      <li>• <strong>GenBank:</strong> Submitted sequences</li>
                      <li>• <strong>bp:</strong> Base pairs (sequence length)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Quick Actions</h4>
                    <ul className="space-y-1 text-[#757575]">
                      <li>• Click <Eye className="h-3 w-3 inline" /> to preview</li>
                      <li>• Click <Star className="h-3 w-3 inline" /> to bookmark</li>
                      <li>• Select items to export</li>
                    </ul>
                  </div>
                  <Button
                    variant="link"
                    className="text-[#0066CC] p-0 h-auto"
                    onClick={() => setShowTutorial(true)}
                  >
                    View full tutorial →
                  </Button>
                </CardContent>
              </Card>

              {/* Results by Taxon */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Results by taxon</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-xs">
                    <a href="#" className="text-[#0066CC] hover:underline">Top Organisms</a>
                    {' '}
                    <a href="#" className="text-[#0066CC] hover:underline">[Tree]</a>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#1E1E1E] italic">Influenza A virus</span>
                      <span className="text-[#757575]">(1439687)</span>
                    </div>
                    <div className="flex items-center justify-between pl-4">
                      <span className="text-[#1E1E1E]">Klebsiella oxytoca</span>
                      <span className="text-[#757575]">(8848)</span>
                    </div>
                    <div className="text-[#0066CC] hover:underline cursor-pointer">
                      All other taxa (520912)
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* NCBI Virus */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">NCBI Virus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-[#1E1E1E]">
                    Retrieve, view, and download influenza virus genomic and protein sequences.
                  </p>
                </CardContent>
              </Card>

              {/* Find Related Data */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Find related data</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select defaultValue="select">
                    <SelectTrigger className="w-full border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="protein">Protein</SelectItem>
                      <SelectItem value="gene">Gene</SelectItem>
                      <SelectItem value="pubmed">PubMed</SelectItem>
                      <SelectItem value="sra">SRA</SelectItem>
                      <SelectItem value="bioproject">BioProject</SelectItem>
                      <SelectItem value="biosample">BioSample</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Search Details */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Search details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-[#F5F5F5] p-2 rounded text-xs font-mono text-[#1E1E1E] mb-2">
                    "{searchQuery}"[Organism] OR {searchQuery}[All Fields]
                  </div>
                  <Button size="sm" className="w-full bg-[#FC10C3] hover:bg-[#E00FB0] text-white">
                    Search
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* R23 - Mini Tutorial Dialog */}
        <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>NUCCORE Search Tutorial</DialogTitle>
              <DialogDescription>
                Learn how to use the enhanced NUCCORE search interface
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  1. Searching
                </h3>
                <p className="text-sm text-[#757575] ml-6">
                  Enter organism names, accession numbers (NC_, NM_, etc.), or keywords.
                  The search bar will suggest matching accessions as you type.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  2. Filtering Results
                </h3>
                <p className="text-sm text-[#757575] ml-6">
                  Use Quick Filters to refine by length, country, record type, and more.
                  Filters are cumulative - apply multiple to narrow results.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  3. View Modes
                </h3>
                <p className="text-sm text-[#757575] ml-6">
                  Switch between List (detailed), Table (sortable), and Combined (overview + list) views.
                  Click column headers in Table view to sort by that field.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  4. Exporting Data
                </h3>
                <p className="text-sm text-[#757575] ml-6">
                  Select specific records or export all results to CSV (metadata) or FASTA (sequences).
                  Use checkboxes to select individual records.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  5. Quick Preview & Favorites
                </h3>
                <p className="text-sm text-[#757575] ml-6">
                  Click the eye icon for a quick preview without leaving the search page.
                  Star important sequences to save them in your Favorites panel.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  6. Understanding Record Types
                </h3>
                <div className="text-sm text-[#757575] ml-6 space-y-1">
                  <p><strong>RefSeq:</strong> Curated reference sequences (higher quality)</p>
                  <p><strong>GenBank:</strong> Researcher-submitted sequences</p>
                  <p><strong>Complete Genome:</strong> Full genomic sequence</p>
                  <p><strong>Partial:</strong> Incomplete or segment sequences</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* N2 - Vista Previa Rápida Dialog */}
        <Dialog open={previewAccession !== null} onOpenChange={(open) => !open && setPreviewAccession(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Preview</DialogTitle>
              <DialogDescription>
                {previewAccession}
              </DialogDescription>
            </DialogHeader>
            {previewAccession && (() => {
              const record = sortedResults.find(r => r.accession === previewAccession);
              return record ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold">Organism</label>
                    <p className="text-sm italic">{record.organism}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold">Length</label>
                      <p className="text-sm">{record.length}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold">Type</label>
                      <p className="text-sm">{record.type}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold">Date</label>
                      <p className="text-sm">{record.date}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold">Record Type</label>
                      <p className="text-sm">
                        <Badge variant={record.recordType === 'RefSeq' ? 'default' : 'secondary'}>
                          {record.recordType}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  {record.country && (
                    <div>
                      <label className="text-xs font-semibold">Country</label>
                      <p className="text-sm">{record.country}</p>
                    </div>
                  )}
                  {(record.bioproject || record.biosample) && (
                    <div className="border-t pt-2">
                      <label className="text-xs font-semibold block mb-1">External Links</label>
                      <div className="space-y-1">
                        {record.bioproject && (
                          <a href="#" className="text-xs text-[#0066CC] hover:underline block">
                            BioProject: {record.bioproject}
                          </a>
                        )}
                        {record.biosample && (
                          <a href="#" className="text-xs text-[#0066CC] hover:underline block">
                            BioSample: {record.biosample}
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-[#FC10C3] hover:bg-[#E00FB0]"
                      onClick={() => {
                        onViewDetail(record.accession);
                        setPreviewAccession(null);
                      }}
                    >
                      View Full Record
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleFavorite(record.id)}
                    >
                      <Star className={favorites.has(record.id) ? 'fill-yellow-400 text-yellow-400' : ''} />
                    </Button>
                  </div>
                </div>
              ) : null;
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
