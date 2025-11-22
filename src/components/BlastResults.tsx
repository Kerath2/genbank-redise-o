import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import {
  CheckCircle2,
  Download,
  Save,
  Edit,
  ArrowLeft,
  BarChart3,
  List,
  AlignLeft,
  PieChart,
  Filter,
  Settings,
  FileDown,
  GitBranch,
  Table as TableIcon,
  Eye,
  ArrowUp,
  ArrowDown,
  Copy,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  AlertCircle,
  Star,
  FileText,
  Dna,
  Home
} from 'lucide-react';

interface BlastResultsProps {
  searchData: any;
  onNewSearch: () => void;
  onEditSearch: () => void;
  onGoHome?: () => void;
}

export function BlastResults({ searchData, onNewSearch, onEditSearch, onGoHome }: BlastResultsProps) {
  const [currentTab, setCurrentTab] = useState('descriptions');
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [showScores, setShowScores] = useState(true);
  const [showEValues, setShowEValues] = useState(true);
  const [minIdentity, setMinIdentity] = useState([0]);
  const [minCoverage, setMinCoverage] = useState([0]);
  const [maxEValueInput, setMaxEValueInput] = useState('10');
  const [sortBy, setSortBy] = useState<'score' | 'evalue' | 'identity' | 'coverage'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [selectedSeqs, setSelectedSeqs] = useState<Set<string>>(new Set());
  const [alignmentView, setAlignmentView] = useState<'pairwise' | 'pairwise-dots' | 'query-anchored'>('pairwise');

  const isNucleotide = searchData?.type === 'nucleotide';

  // Mock results data - Nucleotide
  const mockNucleotideResults = [
    {
      id: 'OZ286483.1',
      accession: 'OZ286483.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt342c1g genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 468,
      totalScore: 468,
      coverage: 100,
      evalue: 6e-128,
      identity: 100.00,
      accLen: 29812
    },
    {
      id: 'OZ286480.1',
      accession: 'OZ286480.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt342c4g genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 468,
      totalScore: 468,
      coverage: 100,
      evalue: 6e-128,
      identity: 100.00,
      accLen: 29796
    },
    {
      id: 'OZ286454.1',
      accession: 'OZ286454.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt470 genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 468,
      totalScore: 468,
      coverage: 100,
      evalue: 6e-128,
      identity: 100.00,
      accLen: 29799
    },
    {
      id: 'OZ286452.1',
      accession: 'OZ286452.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt441cc genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 468,
      totalScore: 468,
      coverage: 100,
      evalue: 6e-128,
      identity: 100.00,
      accLen: 29799
    },
    {
      id: 'OZ286445.1',
      accession: 'OZ286445.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt342cc genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 468,
      totalScore: 468,
      coverage: 100,
      evalue: 6e-128,
      identity: 100.00,
      accLen: 29799
    },
    {
      id: 'OZ286442.1',
      accession: 'OZ286442.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt466 genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 445,
      totalScore: 445,
      coverage: 92,
      evalue: 2e-120,
      identity: 99.50,
      accLen: 29796
    },
    {
      id: 'OZ286440.1',
      accession: 'OZ286440.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt475 genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 420,
      totalScore: 420,
      coverage: 88,
      evalue: 1e-112,
      identity: 98.75,
      accLen: 29780
    },
    {
      id: 'OZ286435.1',
      accession: 'OZ286435.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt474 genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 398,
      totalScore: 398,
      coverage: 85,
      evalue: 3e-105,
      identity: 97.80,
      accLen: 29809
    },
    {
      id: 'OZ286431.1',
      accession: 'OZ286431.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt469 genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 375,
      totalScore: 375,
      coverage: 82,
      evalue: 5e-98,
      identity: 96.50,
      accLen: 29796
    },
    {
      id: 'OZ286425.1',
      accession: 'OZ286425.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt473 genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 352,
      totalScore: 352,
      coverage: 78,
      evalue: 1e-90,
      identity: 95.20,
      accLen: 29789
    },
    {
      id: 'OZ286420.1',
      accession: 'OZ286420.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt468 genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 330,
      totalScore: 330,
      coverage: 75,
      evalue: 8e-85,
      identity: 94.10,
      accLen: 29795
    },
    {
      id: 'OZ286415.1',
      accession: 'OZ286415.1',
      description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt472 genome assembly, complete genome: monopartite',
      scientificName: 'Severe acute respiratory syndrome coronavirus 2',
      maxScore: 310,
      totalScore: 310,
      coverage: 72,
      evalue: 2e-78,
      identity: 93.00,
      accLen: 29810
    }
  ];

  // Mock results data - Protein
  const mockProteinResults = [
    {
      id: 'YP_009724390.1',
      name: 'surface glycoprotein',
      organism: 'Severe acute respiratory syndrome coronavirus 2',
      identity: 97.62,
      coverage: 50,
      score: 173,
      totalScore: 214,
      evalue: 5e-48,
      length: 1273,
      accession: 'YP_009724390.1',
      definition: 'surface glycoprotein [Severe acute respiratory syndrome coronavirus 2]',
      source: 'Severe acute respiratory syndrome coronavirus 2',
      organism_full: 'Severe acute respiratory syndrome coronavirus 2',
      taxid: '2697049'
    },
    {
      id: 'YP_009825051.1',
      name: 'spike glycoprotein',
      organism: 'SARS coronavirus Tor2',
      identity: 52.05,
      coverage: 44,
      score: 69.7,
      totalScore: 108,
      evalue: 3e-12,
      length: 1255,
      accession: 'YP_009825051.1',
      definition: 'spike glycoprotein [SARS coronavirus Tor2]',
      source: 'SARS coronavirus Tor2',
      organism_full: 'SARS coronavirus Tor2',
      taxid: '227859'
    },
    {
      id: 'NP_150077.1',
      name: 'spike structural protein',
      organism: 'Bovine coronavirus',
      identity: 76.19,
      coverage: 17,
      score: 67.4,
      totalScore: 67.4,
      evalue: 2e-11,
      length: 1363,
      accession: 'NP_150077.1',
      definition: 'spike structural protein [Bovine coronavirus]',
      source: 'Bovine coronavirus',
      organism_full: 'Bovine coronavirus',
      taxid: '11128'
    },
    {
      id: 'YP_209233.1',
      name: 'spike glycoprotein',
      organism: 'Murine hepatitis virus strain JHM',
      identity: 69.39,
      coverage: 19,
      score: 66.2,
      totalScore: 66.2,
      evalue: 4e-11,
      length: 1376,
      accession: 'YP_209233.1',
      definition: 'spike glycoprotein [Murine hepatitis virus strain JHM]',
      source: 'Murine hepatitis virus strain JHM',
      organism_full: 'Murine hepatitis virus strain JHM',
      taxid: '11138'
    },
    {
      id: 'NP_045300.1',
      name: 'spike protein',
      organism: 'Murine hepatitis virus',
      identity: 69.39,
      coverage: 19,
      score: 66.2,
      totalScore: 66.2,
      evalue: 4e-11,
      length: 1324,
      accession: 'NP_045300.1',
      definition: 'spike protein [Murine hepatitis virus]',
      source: 'Murine hepatitis virus',
      organism_full: 'Murine hepatitis virus',
      taxid: '11138'
    },
    {
      id: 'YP_009824982.1',
      name: 'spike glycoprotein',
      organism: 'Murine hepatitis virus',
      identity: 69.39,
      coverage: 19,
      score: 66.2,
      totalScore: 66.2,
      evalue: 4e-11,
      length: 1324,
      accession: 'YP_009824982.1',
      definition: 'spike glycoprotein [Murine hepatitis virus]',
      source: 'Murine hepatitis virus',
      organism_full: 'Murine hepatitis virus',
      taxid: '11138'
    },
    {
      id: 'YP_009555241.1',
      name: 'spike surface glycoprotein',
      organism: 'Human coronavirus OC43',
      identity: 65.96,
      coverage: 19,
      score: 66.2,
      totalScore: 66.2,
      evalue: 5e-11,
      length: 1353,
      accession: 'YP_009555241.1',
      definition: 'spike surface glycoprotein [Human coronavirus OC43]',
      source: 'Human coronavirus OC43',
      organism_full: 'Human coronavirus OC43',
      taxid: '31631'
    },
    {
      id: 'YP_005454245.1',
      name: 'spike protein',
      organism: 'Rabbit coronavirus HKU14',
      identity: 71.43,
      coverage: 17,
      score: 64.7,
      totalScore: 64.7,
      evalue: 1e-10,
      length: 1362,
      accession: 'YP_005454245.1',
      definition: 'spike protein [Rabbit coronavirus HKU14]',
      source: 'Rabbit coronavirus HKU14',
      organism_full: 'Rabbit coronavirus HKU14',
      taxid: '1001669'
    },
    {
      id: 'YP_003029848.1',
      name: 'spike protein',
      organism: 'Rat coronavirus Parker',
      identity: 76.92,
      coverage: 15,
      score: 62.8,
      totalScore: 62.8,
      evalue: 6e-10,
      length: 1360,
      accession: 'YP_003029848.1',
      definition: 'spike protein [Rat coronavirus Parker]',
      source: 'Rat coronavirus Parker',
      organism_full: 'Rat coronavirus Parker',
      taxid: '694863'
    },
    {
      id: 'YP_173238.1',
      name: 'spike glycoprotein',
      organism: 'Human coronavirus HKU1',
      identity: 69.77,
      coverage: 17,
      score: 62.8,
      totalScore: 62.8,
      evalue: 7e-10,
      length: 1356,
      accession: 'YP_173238.1',
      definition: 'spike glycoprotein [Human coronavirus HKU1]',
      source: 'Human coronavirus HKU1',
      organism_full: 'Human coronavirus HKU1',
      taxid: '290028'
    },
    {
      id: 'YP_009755834.1',
      name: 'spike glycoprotein',
      organism: 'Rodent coronavirus',
      identity: 69.05,
      coverage: 17,
      score: 60.8,
      totalScore: 60.8,
      evalue: 2e-09,
      length: 1361,
      accession: 'YP_009755834.1',
      definition: 'spike glycoprotein [Rodent coronavirus]',
      source: 'Rodent coronavirus',
      organism_full: 'Rodent coronavirus',
      taxid: '1980083'
    },
    {
      id: 'YP_009113025.1',
      name: 'spike glycoprotein',
      organism: 'Betacoronavirus HKU24',
      identity: 58.70,
      coverage: 18,
      score: 58.9,
      totalScore: 58.9,
      evalue: 1e-08,
      length: 1358,
      accession: 'YP_009113025.1',
      definition: 'spike glycoprotein [Betacoronavirus HKU24]',
      source: 'Betacoronavirus HKU24',
      organism_full: 'Betacoronavirus HKU24',
      taxid: '1508227'
    },
    {
      id: 'YP_003858584.1',
      name: 'spike protein',
      organism: 'Bat coronavirus BM48-31/BGR/2008',
      identity: 35.80,
      coverage: 47,
      score: 47.4,
      totalScore: 87.4,
      evalue: 8e-05,
      length: 1259,
      accession: 'YP_003858584.1',
      definition: 'spike protein [Bat coronavirus BM48-31/BGR/2008]',
      source: 'Bat coronavirus BM48-31/BGR/2008',
      organism_full: 'Bat coronavirus BM48-31/BGR/2008',
      taxid: '693998'
    },
    {
      id: 'YP_009072440.1',
      name: 'spike protein',
      organism: 'Bat Hp-betacoronavirus/Zhejiang2013',
      identity: 51.28,
      coverage: 15,
      score: 44.7,
      totalScore: 44.7,
      evalue: 6e-04,
      length: 1317,
      accession: 'YP_009072440.1',
      definition: 'spike protein [Bat Hp-betacoronavirus/Zhejiang2013]',
      source: 'Bat Hp-betacoronavirus/Zhejiang2013',
      organism_full: 'Bat Hp-betacoronavirus/Zhejiang2013',
      taxid: '1415852'
    },
    {
      id: 'YP_009824990.1',
      name: 'spike protein',
      organism: 'Bat coronavirus',
      identity: 44.68,
      coverage: 19,
      score: 42.4,
      totalScore: 42.4,
      evalue: 0.003,
      length: 1269,
      accession: 'YP_009824990.1',
      definition: 'spike protein [Bat coronavirus]',
      source: 'Bat coronavirus',
      organism_full: 'Bat coronavirus',
      taxid: '1508220'
    }
  ];

  const currentResults = isNucleotide ? mockNucleotideResults : mockProteinResults;

  // R8: Función de ordenamiento
  const sortedResults = [...currentResults].sort((a: any, b: any) => {
    let comparison = 0;
    const scoreA = isNucleotide ? a.maxScore : a.score;
    const scoreB = isNucleotide ? b.maxScore : b.score;
    
    switch (sortBy) {
      case 'score':
        comparison = scoreA - scoreB;
        break;
      case 'evalue':
        comparison = (a.evalue || 0) - (b.evalue || 0);
        break;
      case 'identity':
        comparison = a.identity - b.identity;
        break;
      case 'coverage':
        comparison = a.coverage - b.coverage;
        break;
    }
    return sortOrder === 'desc' ? -comparison : comparison;
  });

  // Parse E-value input (supports scientific notation like 1e-50)
  const parseEValue = (input: string): number => {
    try {
      const parsed = parseFloat(input);
      return isNaN(parsed) ? 10 : parsed;
    } catch {
      return 10;
    }
  };

  // R13: Filtros rápidos
  const filteredResults = sortedResults.filter((result: any) => 
    result.identity >= minIdentity[0] && 
    result.coverage >= minCoverage[0] &&
    result.evalue <= parseEValue(maxEValueInput)
  );

  const formatEValue = (eValue: number) => {
    if (eValue === 0) return '0.0';
    if (eValue < 0.001) return eValue.toExponential(0);
    return eValue.toFixed(3);
  };

  const getScoreColor = (score: number) => {
    if (score >= 200) return 'bg-[#FC10C3]';
    if (score >= 80) return 'bg-[#704BFF]';
    if (score >= 50) return 'bg-[#21D7FF]';
    if (score >= 40) return 'bg-[#C920FF]';
    return 'bg-[#BDBDBD]';
  };

  // R8: Toggle sort
  const toggleSort = (field: 'score' | 'evalue' | 'identity' | 'coverage') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // R11: Exportar a CSV
  const exportToCSV = () => {
    let headers: string[];
    let rows: any[][];
    
    if (isNucleotide) {
      headers = ['Accession', 'Description', 'Scientific Name', 'Max Score', 'Total Score', 'Query Cover', 'E-value', 'Per. Ident', 'Acc. Len'];
      rows = filteredResults.map((r: any) => [
        r.accession,
        r.description,
        r.scientificName,
        r.maxScore,
        r.totalScore,
        r.coverage + '%',
        formatEValue(r.evalue),
        r.identity + '%',
        r.accLen
      ]);
    } else {
      headers = ['Accession', 'Description', 'Organism', 'Score', 'E-value', 'Identity %', 'Coverage %'];
      rows = filteredResults.map((r: any) => [
        r.accession,
        r.name,
        r.organism,
        r.score,
        formatEValue(r.evalue),
        r.identity,
        r.coverage
      ]);
    }
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blast_results.csv';
    a.click();
  };

  // R11: Exportar a FASTA
  const exportToFASTA = () => {
    const mockSequence = 'MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFT';
    const fasta = filteredResults.map((r: any) => 
      `>${isNucleotide ? r.accession : r.accession} ${isNucleotide ? r.description : r.definition}\n${mockSequence}`
    ).join('\n\n');
    
    const blob = new Blob([fasta], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blast_results.fasta';
    a.click();
  };

  // R26: Toggle favorito
  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
    localStorage.setItem('blastFavorites', JSON.stringify(Array.from(newFavorites)));
  };

  // Toggle selección de secuencia
  const toggleSeqSelection = (id: string) => {
    const newSelected = new Set(selectedSeqs);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedSeqs(newSelected);
  };

  // Generate alignment data for selected sequences
  const getAlignmentData = (resultId: string) => {
    // Mock alignment data based on the result ID
    const alignments: any = {
      'OZ286483.1': {
        sequenceId: 'OZ286483.1',
        description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt342c1g genome assembly, complete genome: monopartite',
        length: 29812,
        numMatches: 1,
        score: 468,
        expect: '6e-128',
        identities: '253/253(100%)',
        gaps: '0/253(0%)',
        strand: 'Plus/Plus',
        queryStart: 1,
        queryEnd: 240,
        querySeq: 'ATGTTTGTTTTCTTGTTTTATTGCCACTAGTCTCTAGTCAGTGTGTTAATCTTACAACCAGAACTCAATTACCCCCTGCATACACTAATTCTTTCACACGTGGTGTTTATTACCCTGACAAAGTTTTCAGATCCTCAGTTTTACATTCAACTCAGGACTTGTTCTTACCTTTCTTTTCCAATGTTACTTGGTTCCATGCTATACATGTCTCTGGGACCAATGGTACTAAGAGGTTTGATAACCCTGTCCTAC',
        subjectStart: 21508,
        subjectEnd: 21760,
        subjectSeq: 'ATGTTTGTTTTCTTGTTTTATTGCCACTAGTCTCTAGTCAGTGTGTTAATCTTACAACCAGAACTCAATTACCCCCTGCATACACTAATTCTTTCACACGTGGTGTTTATTACCCTGACAAAGTTTTCAGATCCTCAGTTTTACATTCAACTCAGGACTTGTTCTTACCTTTCTTTTCCAATGTTACTTGGTTCCATGCTATACATGTCTCTGGGACCAATGGTACTAAGAGGTTTGATAACCCTGTCCTAC',
        middleSeq: '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'
      },
      'OZ286480.1': {
        sequenceId: 'OZ286480.1',
        description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt342c4g genome assembly, complete genome: monopartite',
        length: 29796,
        numMatches: 1,
        score: 468,
        expect: '6e-128',
        identities: '253/253(100%)',
        gaps: '0/253(0%)',
        strand: 'Plus/Plus',
        queryStart: 1,
        queryEnd: 240,
        querySeq: 'ATGTTTGTTTTCTTGTTTTATTGCCACTAGTCTCTAGTCAGTGTGTTAATCTTACAACCAGAACTCAATTACCCCCTGCATACACTAATTCTTTCACACGTGGTGTTTATTACCCTGACAAAGTTTTCAGATCCTCAGTTTTACATTCAACTCAGGACTTGTTCTTACCTTTCTTTTCCAATGTTACTTGGTTCCATGCTATACATGTCTCTGGGACCAATGGTACTAAGAGGTTTGATAACCCTGTCCTAC',
        subjectStart: 21508,
        subjectEnd: 21760,
        subjectSeq: 'ATGTTTGTTTTCTTGTTTTATTGCCACTAGTCTCTAGTCAGTGTGTTAATCTTACAACCAGAACTCAATTACCCCCTGCATACACTAATTCTTTCACACGTGGTGTTTATTACCCTGACAAAGTTTTCAGATCCTCAGTTTTACATTCAACTCAGGACTTGTTCTTACCTTTCTTTTCCAATGTTACTTGGTTCCATGCTATACATGTCTCTGGGACCAATGGTACTAAGAGGTTTGATAACCCTGTCCTAC',
        middleSeq: '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'
      },
      'OZ286454.1': {
        sequenceId: 'OZ286454.1',
        description: 'Severe acute respiratory syndrome coronavirus 2 isolate Madrid-Pt470 genome assembly, complete genome: monopartite',
        length: 29799,
        numMatches: 1,
        score: 468,
        expect: '6e-128',
        identities: '253/253(100%)',
        gaps: '0/253(0%)',
        strand: 'Plus/Plus',
        queryStart: 1,
        queryEnd: 240,
        querySeq: 'ATGTTTGTTTTCTTGTTTTATTGCCACTAGTCTCTAGTCAGTGTGTTAATCTTACAACCAGAACTCAATTACCCCCTGCATACACTAATTCTTTCACACGTGGTGTTTATTACCCTGACAAAGTTTTCAGATCCTCAGTTTTACATTCAACTCAGGACTTGTTCTTACCTTTCTTTTCCAATGTTACTTGGTTCCATGCTATACATGTCTCTGGGACCAATGGTACTAAGAGGTTTGATAACCCTGTCCTAC',
        subjectStart: 21525,
        subjectEnd: 21777,
        subjectSeq: 'ATGTTTGTTTTCTTGTTTTATTGCCACTAGTCTCTAGTCAGTGTGTTAATCTTACAACCAGAACTCAATTACCCCCTGCATACACTAATTCTTTCACACGTGGTGTTTATTACCCTGACAAAGTTTTCAGATCCTCAGTTTTACATTCAACTCAGGACTTGTTCTTACCTTTCTTTTCCAATGTTACTTGGTTCCATGCTATACATGTCTCTGGGACCAATGGTACTAAGAGGTTTGATAACCCTGTCCTAC',
        middleSeq: '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'
      },
      // Protein alignments
      'YP_009724390.1': {
        sequenceId: 'YP_009724390.1',
        description: 'surface glycoprotein [Severe acute respiratory syndrome coronavirus 2]',
        length: 1273,
        numMatches: 1,
        score: 173,
        expect: '5e-48',
        identities: '82/84(97%)',
        positives: '83/84(98%)',
        gaps: '0/84(0%)',
        strand: 'N/A',
        queryStart: 1,
        queryEnd: 84,
        querySeq: 'MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNP',
        subjectStart: 1,
        subjectEnd: 84,
        subjectSeq: 'MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNP',
        middleSeq: 'MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNP'
      },
      'YP_009825051.1': {
        sequenceId: 'YP_009825051.1',
        description: 'spike glycoprotein [SARS coronavirus Tor2]',
        length: 1255,
        numMatches: 1,
        score: 69.7,
        expect: '3e-12',
        identities: '38/73(52%)',
        positives: '50/73(68%)',
        gaps: '2/73(2%)',
        strand: 'N/A',
        queryStart: 13,
        queryEnd: 84,
        querySeq: 'LVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNP',
        subjectStart: 13,
        subjectEnd: 85,
        subjectSeq: 'LTTTCSDLDKDLDSFTQA-NFIQVSVYYPSKVFRSDELQHGTQDLLPFFSNVTWFHTVSGTNGTKRFINPDP',
        middleSeq: 'L + +C +L T+ +  ++   N+  V+YP+KVFRS +L+H+TQD LPFFSN+TWFH +  GTNGTKRF+N P'
      },
      'NP_150077.1': {
        sequenceId: 'NP_150077.1',
        description: 'spike structural protein [Bovine coronavirus]',
        length: 1363,
        numMatches: 1,
        score: 45.8,
        expect: '1e-05',
        identities: '32/84(38%)',
        positives: '48/84(57%)',
        gaps: '6/84(7%)',
        strand: 'N/A',
        queryStart: 1,
        queryEnd: 84,
        querySeq: 'MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNP',
        subjectStart: 1,
        subjectEnd: 78,
        subjectSeq: 'MFLILLISLPTAFAVIGDLKCTTVSINDVDTGVPSISTLSVPNDISIPNFDSEI--TWFKDGSVELLNQTSAVRFKKFNP',
        middleSeq: 'MF +L L+ P++   +  +  T ++  +   S  + ++P+  F +S+   +  +     F N+TW   +    +N T+ RF++NP'
      },
      'QHR63290.2': {
        sequenceId: 'QHR63290.2',
        description: 'spike glycoprotein [Bat coronavirus BtRt-BetaCoV/GX2018]',
        length: 1273,
        numMatches: 1,
        score: 71.2,
        expect: '9e-13',
        identities: '40/84(47%)',
        positives: '52/84(61%)',
        gaps: '3/84(3%)',
        strand: 'N/A',
        queryStart: 1,
        queryEnd: 84,
        querySeq: 'MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNP',
        subjectStart: 1,
        subjectEnd: 81,
        subjectSeq: 'MFVLLILLPVVSHCVNLTTGTKLPPSAYNSFATRSVYYPNKI-RSSELHSTQNVYVPFFSNVTWFHNIHTAGKNGSKRFKNP',
        middleSeq: 'MFV L LLP+VS CVN+TT T LPP+AYNSF TR VYY +K+ RSS LH+TQ +++PFFSNVTWFH IH   +NG KRFKNP'
      },
      'YP_009555241.1': {
        sequenceId: 'YP_009555241.1',
        description: 'spike protein [Middle East respiratory syndrome-related coronavirus]',
        length: 1353,
        numMatches: 1,
        score: 42.4,
        expect: '7e-04',
        identities: '27/77(35%)',
        positives: '43/77(55%)',
        gaps: '5/77(6%)',
        strand: 'N/A',
        queryStart: 8,
        queryEnd: 84,
        querySeq: 'LPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNP',
        subjectStart: 8,
        subjectEnd: 80,
        subjectSeq: 'LPFVSAPRCVGKFRKCSTY-TNFTRGSLFYVYKDVFQSSALLSIEMETSFKPYSVLTLQRGEYKSLYLVHVPFKNP',
        middleSeq: 'LP V+  +CV  + + +    N TRG++ Y ++VF+SS L+S +  ++F+  ++  + +  +  +  L  +VP +NP'
      }
    };
    
    return alignments[resultId];
  };

  // Format alignment sequences for display
  const formatAlignmentLines = (query: string, middle: string, subject: string, queryStart: number, subjectStart: number, isDots: boolean) => {
    const lineLength = 60;
    const lines = [];

    for (let i = 0; i < query.length; i += lineLength) {
      const qChunk = query.substring(i, i + lineLength);
      const mChunk = middle.substring(i, i + lineLength);
      const sChunk = subject.substring(i, i + lineLength);

      const qStart = queryStart + i;
      const qEnd = qStart + qChunk.length - 1;
      const sStart = subjectStart + i;
      const sEnd = sStart + sChunk.length - 1;

      // Convert subject sequence to dots for identical positions if needed
      const displaySubject = isDots ? sChunk.split('').map((c, idx) =>
        qChunk[idx] === sChunk[idx] ? '.' : c
      ).join('') : sChunk;

      lines.push({
        query: qChunk,
        middle: mChunk,
        subject: displaySubject,
        queryRange: `${qStart}-${qEnd}`,
        subjectRange: `${sStart}-${sEnd}`,
        queryEnd: qEnd,
        subjectEnd: sEnd
      });
    }

    return lines;
  };

  // Toggle todas las secuencias
  const toggleAllSeqs = () => {
    if (selectedSeqs.size === filteredResults.length) {
      setSelectedSeqs(new Set());
    } else {
      setSelectedSeqs(new Set(filteredResults.map((r: any) => r.id)));
    }
  };

  // R17: Copiar secuencia
  const copySequence = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // R15: Toggle sección colapsable
  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const requestId = 'BLAST' + Math.random().toString(36).substring(2, 11).toUpperCase();
  const mockSequence = 'MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFT';

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#F5F5F5]">
        {/* Header */}
        <header className="bg-white border-b border-[#E0E0E0]">
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            <div className="flex items-center gap-3 mb-4">
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
              <Button
                variant="ghost"
                onClick={onNewSearch}
                className="text-[#757575] hover:text-[#FC10C3] -ml-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Nueva Búsqueda
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl text-[#1E1E1E] mb-2">Resultados BLAST</h1>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-[#F5F5F5] text-[#757575] border-[#E0E0E0]">
                    {searchData?.searchTitle || 'Análisis de Proteína Spike'}
                  </Badge>
                  <Badge variant="secondary" className="bg-[#F5F5F5] text-[#757575] border-[#E0E0E0]">
                    RID: {requestId}
                  </Badge>
                  <Badge variant="secondary" className="bg-[#E8F5E9] text-[#2E7D32] border-[#81C784] gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Completado
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEditSearch}
                  className="border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Búsqueda
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Guardar
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* R14: Resumen inteligente del resultado */}
        <div className="bg-[#E8F5E9] border-b border-[#81C784]">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#2E7D32]" />
              <div>
                <p className="text-[#1B5E20]">
                  Búsqueda completada exitosamente: <span className="font-medium">{filteredResults.length} secuencias</span> con similitud significativa encontradas
                </p>
                <p className="text-sm text-[#2E7D32] mt-1">
                  {isNucleotide 
                    ? `Top hit: ${mockNucleotideResults[0].scientificName} (${mockNucleotideResults[0].identity}% identidad)`
                    : `Top hit: ${mockProteinResults[0].organism} (${mockProteinResults[0].identity}% identidad) • Principal organismo: Homo sapiens`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-white border-b border-[#E0E0E0]">
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div>
                <p className="text-xs text-[#757575] uppercase tracking-wider mb-1 flex items-center gap-1">
                  Longitud Query
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-[#1E1E1E] text-white">
                      <p>Longitud de la secuencia de consulta</p>
                    </TooltipContent>
                  </Tooltip>
                </p>
                <p className="text-xl text-[#1E1E1E]">
                  {isNucleotide ? '240' : '87'} <span className="text-sm text-[#757575]">{isNucleotide ? 'nucleótidos' : 'aminoácidos'}</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-[#757575] uppercase tracking-wider mb-1">Base de Datos</p>
                <p className="text-xl text-[#1E1E1E]">{isNucleotide ? 'nr/nt' : 'ClusteredNR'}</p>
              </div>
              <div>
                <p className="text-xs text-[#757575] uppercase tracking-wider mb-1">Algoritmo</p>
                <p className="text-xl text-[#1E1E1E]">{isNucleotide ? 'blastn' : 'BLASTP'}</p>
              </div>
              <div>
                <p className="text-xs text-[#757575] uppercase tracking-wider mb-1">Alineamientos</p>
                <p className="text-xl text-[#FC10C3]">{filteredResults.length}</p>
              </div>
              <div>
                <p className="text-xs text-[#757575] uppercase tracking-wider mb-1">Tiempo</p>
                <p className="text-xl text-[#1E1E1E]">45s</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* R13: Quick Filters */}
              <Card className="bg-white border-[#E0E0E0] shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-[#FC10C3]" />
                    <CardTitle className="text-sm text-[#1E1E1E]">Filtros Rápidos</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                    onClick={() => setMinIdentity([90])}
                  >
                    Alta Identidad ({'>'}90%)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                    onClick={() => setMinIdentity([50])}
                  >
                    Moderada (50-90%)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                    onClick={() => {
                      setMinIdentity([30]);
                      setMaxEValueInput('1e-10');
                    }}
                  >
                    Significant (I≥30%, E≤1e-10)
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                    onClick={() => setMinCoverage([95])}
                  >
                    Query Cover {'>'} 95%
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                    onClick={() => {
                      setMinIdentity([0]);
                      setMinCoverage([0]);
                      setMaxEValueInput('10');
                    }}
                  >
                    Limpiar Filtros
                  </Button>
                </CardContent>
              </Card>

              {/* Custom Filters */}
              <Card className="bg-white border-[#E0E0E0] shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-[#FC10C3]" />
                    <CardTitle className="text-sm text-[#1E1E1E]">Custom Filters</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="evalue-filter" className="text-xs text-[#1E1E1E]">E-value: ≤</Label>
                    <Input
                      id="evalue-filter"
                      type="text"
                      value={maxEValueInput}
                      onChange={(e) => setMaxEValueInput(e.target.value)}
                      placeholder="e.g., 1e-50, 0.001, 10"
                      className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3] text-sm"
                    />
                    <div className="flex flex-wrap gap-1">
                      {['10', '1e-5', '1e-10', '1e-50', '1e-100'].map((value) => (
                        <button
                          key={value}
                          onClick={() => setMaxEValueInput(value)}
                          className="text-xs px-2 py-1 rounded bg-[#F5F5F5] hover:bg-[#FC10C3] hover:text-white transition-colors border border-[#E0E0E0]"
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-[#1E1E1E]">Query Cover: ≥ {minCoverage[0]}%</Label>
                    <Slider
                      value={minCoverage}
                      onValueChange={setMinCoverage}
                      max={100}
                      step={5}
                      className="[&_[role=slider]]:bg-[#FC10C3] [&_[role=slider]]:border-[#FC10C3]"
                    />
                    <div className="flex justify-between text-xs text-[#757575]">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-[#1E1E1E]">Per. Ident: ≥ {minIdentity[0]}%</Label>
                    <Slider
                      value={minIdentity}
                      onValueChange={setMinIdentity}
                      max={100}
                      step={5}
                      className="[&_[role=slider]]:bg-[#FC10C3] [&_[role=slider]]:border-[#FC10C3]"
                    />
                    <div className="flex justify-between text-xs text-[#757575]">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* R11: Quick Actions */}
              <Card className="bg-white border-[#E0E0E0] shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <FileDown className="h-4 w-4 text-[#FC10C3]" />
                    <CardTitle className="text-sm text-[#1E1E1E]">Exportar Resultados</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start gap-2 border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                    onClick={exportToCSV}
                  >
                    <TableIcon className="h-4 w-4" />
                    Descargar CSV
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start gap-2 border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                    onClick={exportToFASTA}
                  >
                    <FileDown className="h-4 w-4" />
                    Descargar FASTA
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start gap-2 border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                  >
                    <GitBranch className="h-4 w-4" />
                    Árbol Filogenético
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start gap-2 border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                  >
                    <AlignLeft className="h-4 w-4" />
                    Alineamiento Múltiple
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="bg-white border-[#E0E0E0] shadow-sm">
                <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                  <CardHeader>
                    <TabsList className="grid w-full grid-cols-4 bg-[#F5F5F5] border border-[#E0E0E0]">
                      <TabsTrigger value="descriptions" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-[#FC10C3]">
                        <List className="h-4 w-4" />
                        Descripciones
                      </TabsTrigger>
                      <TabsTrigger value="graphic" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-[#FC10C3]">
                        <BarChart3 className="h-4 w-4" />
                        Vista Gráfica
                      </TabsTrigger>
                      <TabsTrigger value="alignments" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-[#FC10C3]">
                        <AlignLeft className="h-4 w-4" />
                        Alineamientos
                      </TabsTrigger>
                      <TabsTrigger value="taxonomy" className="gap-2 data-[state=active]:bg-white data-[state=active]:text-[#FC10C3]">
                        <PieChart className="h-4 w-4" />
                        Taxonomía
                      </TabsTrigger>
                    </TabsList>
                  </CardHeader>

                  <CardContent>
                    {/* R12: Mensaje cuando no hay resultados */}
                    {filteredResults.length === 0 ? (
                      <div className="text-center py-12">
                        <AlertCircle className="h-16 w-16 text-[#BDBDBD] mx-auto mb-4" />
                        <h3 className="text-lg text-[#1E1E1E] mb-2">No se encontraron resultados</h3>
                        <p className="text-sm text-[#757575] mb-4">
                          No hay secuencias que coincidan con los filtros aplicados.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setMinIdentity([0]);
                            setMinCoverage([0]);
                          }}
                          className="border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                        >
                          Limpiar Filtros
                        </Button>
                      </div>
                    ) : (
                      <>
                        {/* Descriptions Tab - Nucleotide */}
                        {isNucleotide ? (
                          <TabsContent value="descriptions" className="mt-0">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-[#757575]">
                                  Mostrando <span className="text-[#1E1E1E]">{filteredResults.length}</span> de <span className="text-[#1E1E1E]">150</span> resultados
                                </p>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                                    onClick={toggleAllSeqs}
                                  >
                                    {selectedSeqs.size === filteredResults.length ? 'Deseleccionar' : 'Seleccionar'} Todo
                                  </Button>
                                </div>
                              </div>

                              <div className="border border-[#E0E0E0] rounded-lg overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead className="bg-[#F5F5F5] border-b border-[#E0E0E0]">
                                    <tr>
                                      <th className="text-left p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        Select
                                      </th>
                                      <th className="text-left p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        Description
                                      </th>
                                      <th className="text-left p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        Scientific Name
                                      </th>
                                      <th className="text-right p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        <button 
                                          className="flex items-center gap-1 hover:text-[#FC10C3] ml-auto"
                                          onClick={() => toggleSort('score')}
                                        >
                                          Max Score
                                          {sortBy === 'score' && (sortOrder === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />)}
                                        </button>
                                      </th>
                                      <th className="text-right p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        Total Score
                                      </th>
                                      <th className="text-right p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        <button 
                                          className="flex items-center gap-1 hover:text-[#FC10C3] ml-auto"
                                          onClick={() => toggleSort('coverage')}
                                        >
                                          Query Cover
                                          {sortBy === 'coverage' && (sortOrder === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />)}
                                        </button>
                                      </th>
                                      <th className="text-right p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        <button 
                                          className="flex items-center gap-1 hover:text-[#FC10C3] ml-auto"
                                          onClick={() => toggleSort('evalue')}
                                        >
                                          E value
                                          {sortBy === 'evalue' && (sortOrder === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />)}
                                        </button>
                                      </th>
                                      <th className="text-right p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        <button 
                                          className="flex items-center gap-1 hover:text-[#FC10C3] ml-auto"
                                          onClick={() => toggleSort('identity')}
                                        >
                                          Per. Ident
                                          {sortBy === 'identity' && (sortOrder === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />)}
                                        </button>
                                      </th>
                                      <th className="text-right p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        Acc. Len
                                      </th>
                                      <th className="text-left p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        Accession
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#E0E0E0]">
                                    {filteredResults.map((result: any, index) => (
                                      <tr key={index} className="hover:bg-[#F5F5F5] transition-colors">
                                        <td className="p-3">
                                          <Checkbox 
                                            checked={selectedSeqs.has(result.id)}
                                            onCheckedChange={() => toggleSeqSelection(result.id)}
                                          />
                                        </td>
                                        <td className="p-3 max-w-md">
                                          <p className="text-sm text-[#1E1E1E] truncate">{result.description}</p>
                                        </td>
                                        <td className="p-3">
                                          <p className="text-sm text-[#757575] italic">{result.scientificName}</p>
                                        </td>
                                        <td className="p-3 text-right">
                                          <Badge className={`${getScoreColor(result.maxScore)} text-white border-0`}>
                                            {result.maxScore}
                                          </Badge>
                                        </td>
                                        <td className="p-3 text-right text-sm text-[#1E1E1E]">{result.totalScore}</td>
                                        <td className="p-3 text-right">
                                          <Badge variant="secondary" className="bg-[#F5F5F5] text-[#757575] border-[#E0E0E0]">
                                            {result.coverage}%
                                          </Badge>
                                        </td>
                                        <td className="p-3 text-right text-sm text-[#1E1E1E]">{formatEValue(result.evalue)}</td>
                                        <td className="p-3 text-right">
                                          <Badge variant={result.identity >= 95 ? 'default' : 'secondary'} className={result.identity >= 95 ? 'bg-[#FC10C3] text-white border-0' : 'bg-[#F5F5F5] text-[#757575] border-[#E0E0E0]'}>
                                            {result.identity}%
                                          </Badge>
                                        </td>
                                        <td className="p-3 text-right text-sm text-[#1E1E1E]">{result.accLen.toLocaleString()}</td>
                                        <td className="p-3">
                                          <div className="flex items-center gap-2">
                                            <p className="text-sm text-[#FC10C3] hover:underline cursor-pointer">{result.accession}</p>
                                            <button
                                              onClick={() => toggleFavorite(result.id)}
                                              className={`p-1 hover:bg-[#F5F5F5] rounded ${favorites.has(result.id) ? 'text-[#FC10C3]' : 'text-[#BDBDBD]'}`}
                                            >
                                              <Star className={`h-3 w-3 ${favorites.has(result.id) ? 'fill-current' : ''}`} />
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </TabsContent>
                        ) : (
                          // Descriptions Tab - Protein (existing code)
                          <TabsContent value="descriptions" className="mt-0">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <p className="text-sm text-[#757575]">
                                  Mostrando <span className="text-[#1E1E1E]">{filteredResults.length}</span> de <span className="text-[#1E1E1E]">150</span> resultados
                                </p>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                                    onClick={toggleAllSeqs}
                                  >
                                    {selectedSeqs.size === filteredResults.length ? 'Deseleccionar' : 'Seleccionar'} Todo
                                  </Button>
                                </div>
                              </div>

                              <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
                                <table className="w-full">
                                  <thead className="bg-[#F5F5F5] border-b border-[#E0E0E0]">
                                    <tr>
                                      <th className="text-left p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        Select
                                      </th>
                                      <th className="text-left p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        <div className="flex items-center gap-1">
                                          Descripción
                                        </div>
                                      </th>
                                      <th className="text-right p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        <button 
                                          className="flex items-center gap-1 hover:text-[#FC10C3] ml-auto"
                                          onClick={() => toggleSort('score')}
                                        >
                                          Score
                                          {sortBy === 'score' && (sortOrder === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />)}
                                        </button>
                                      </th>
                                      <th className="text-right p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        <button 
                                          className="flex items-center gap-1 hover:text-[#FC10C3] ml-auto"
                                          onClick={() => toggleSort('evalue')}
                                        >
                                          E-value
                                          {sortBy === 'evalue' && (sortOrder === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />)}
                                        </button>
                                      </th>
                                      <th className="text-right p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        <button 
                                          className="flex items-center gap-1 hover:text-[#FC10C3] ml-auto"
                                          onClick={() => toggleSort('identity')}
                                        >
                                          Identidad
                                          {sortBy === 'identity' && (sortOrder === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />)}
                                        </button>
                                      </th>
                                      <th className="text-right p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        <button 
                                          className="flex items-center gap-1 hover:text-[#FC10C3] ml-auto"
                                          onClick={() => toggleSort('coverage')}
                                        >
                                          Cobertura
                                          {sortBy === 'coverage' && (sortOrder === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />)}
                                        </button>
                                      </th>
                                      <th className="text-center p-3 text-xs uppercase tracking-wider text-[#757575]">
                                        Acciones
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#E0E0E0]">
                                    {filteredResults.map((result: any, index) => (
                                      <tr key={index} className="hover:bg-[#F5F5F5] transition-colors">
                                        <td className="p-3 text-center">
                                          <Checkbox
                                            checked={selectedSeqs.has(result.id)}
                                            onCheckedChange={() => toggleSeqSelection(result.id)}
                                            className="border-[#E0E0E0] data-[state=checked]:bg-[#FC10C3] data-[state=checked]:border-[#FC10C3]"
                                          />
                                        </td>
                                        <td className="p-3">
                                          <p className="text-sm text-[#FC10C3] hover:underline cursor-pointer">
                                            {result.name}
                                          </p>
                                          <p className="text-xs text-[#757575] italic mt-1">{result.organism}</p>
                                          <p className="text-xs text-[#BDBDBD] mt-1">{result.id}</p>
                                        </td>
                                        <td className="p-3 text-right">
                                          <Badge className={`${getScoreColor(result.score)} text-white border-0`}>
                                            {result.score}
                                          </Badge>
                                        </td>
                                        <td className="p-3 text-right text-sm text-[#1E1E1E]">{formatEValue(result.evalue)}</td>
                                        <td className="p-3 text-right">
                                          <Badge variant={result.identity >= 95 ? 'default' : 'secondary'} className={result.identity >= 95 ? 'bg-[#FC10C3] text-white border-0' : 'bg-[#F5F5F5] text-[#757575] border-[#E0E0E0]'}>
                                            {result.identity}%
                                          </Badge>
                                        </td>
                                        <td className="p-3 text-right">
                                          <Badge variant={result.coverage >= 90 ? 'default' : 'secondary'} className={result.coverage >= 90 ? 'bg-[#FC10C3] text-white border-0' : 'bg-[#F5F5F5] text-[#757575] border-[#E0E0E0]'}>
                                            {result.coverage}%
                                          </Badge>
                                        </td>
                                        <td className="p-3">
                                          <div className="flex items-center justify-center gap-1">
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <button
                                                  onClick={() => toggleFavorite(result.id)}
                                                  className={`p-1 hover:bg-[#F5F5F5] rounded ${favorites.has(result.id) ? 'text-[#FC10C3]' : 'text-[#BDBDBD]'}`}
                                                >
                                                  <Star className={`h-4 w-4 ${favorites.has(result.id) ? 'fill-current' : ''}`} />
                                                </button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>{favorites.has(result.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}</p>
                                              </TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <button className="p-1 hover:bg-[#F5F5F5] rounded text-[#757575]">
                                                  <ExternalLink className="h-4 w-4" />
                                                </button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>Ver en GenBank</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </TabsContent>
                        )}

                        {/* Graphic View Tab - Works for both */}
                        <TabsContent value="graphic" className="mt-0">
                          <div className="space-y-6">
                            {/* Query Info */}
                            <div className="bg-[#FFF4F9] border border-[#FC10C3]/20 rounded-lg p-4">
                              <p className="text-sm text-[#1E1E1E] mb-1">Secuencia de Consulta</p>
                              <p className="text-sm text-[#757575]">
                                lcl|Query_{requestId.slice(-6)} | Longitud: {searchData?.sequence?.replace(/\s/g, '').length || (isNucleotide ? 240 : 87)} {isNucleotide ? 'nucleótidos' : 'aminoácidos'}
                              </p>
                            </div>

                            {/* Score Legend */}
                            <div className="bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg p-4">
                              <p className="text-sm text-[#1E1E1E] mb-3">Leyenda de Score (bits)</p>
                              <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-3 bg-[#FC10C3] rounded" />
                                  <span className="text-[#757575]">≥200 (Excelente)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-3 bg-[#704BFF] rounded" />
                                  <span className="text-[#757575]">80-200 (Muy Bueno)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-3 bg-[#21D7FF] rounded" />
                                  <span className="text-[#757575]">50-80 (Bueno)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-3 bg-[#C920FF] rounded" />
                                  <span className="text-[#757575]">40-50 (Regular)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-3 bg-[#BDBDBD] rounded" />
                                  <span className="text-[#757575]">{'<'}40 (Débil)</span>
                                </div>
                              </div>
                            </div>

                            {/* Alignments */}
                            <div className="space-y-4">
                              {(selectedSeqs.size > 0 
                                ? filteredResults.filter((r: any) => selectedSeqs.has(r.id)) 
                                : filteredResults.slice(0, 8)
                              ).map((result: any, index) => {
                                const score = isNucleotide ? result.maxScore : result.score;
                                return (
                                  <div key={index} className="border border-[#E0E0E0] rounded-lg p-4 hover:border-[#FC10C3] transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                      <div>
                                        <p className="text-sm text-[#1E1E1E]">
                                          {isNucleotide ? result.description : result.name}
                                        </p>
                                        <p className="text-xs text-[#757575] mt-1">
                                          {result.id} | {isNucleotide ? result.scientificName : result.organism} 
                                          {!isNucleotide && ` | Longitud: ${result.length}aa`}
                                        </p>
                                      </div>
                                      <div className="text-right flex items-start gap-2">
                                        <div>
                                          <Badge className={`${getScoreColor(score)} text-white border-0 mb-1`}>
                                            {score} bits
                                          </Badge>
                                          <p className="text-xs text-[#757575]">E: {formatEValue(result.evalue)}</p>
                                        </div>
                                        <button
                                          onClick={() => toggleFavorite(result.id)}
                                          className={`p-1 hover:bg-[#F5F5F5] rounded ${favorites.has(result.id) ? 'text-[#FC10C3]' : 'text-[#BDBDBD]'}`}
                                        >
                                          <Star className={`h-4 w-4 ${favorites.has(result.id) ? 'fill-current' : ''}`} />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Coverage bar */}
                                    <div className="relative">
                                      <div className="h-6 bg-[#F5F5F5] rounded-lg overflow-hidden border border-[#E0E0E0]">
                                        <div
                                          className={`h-full ${getScoreColor(score)} opacity-80`}
                                          style={{ width: `${result.coverage}%` }}
                                        />
                                        <div className="absolute inset-0 flex items-center px-2 text-xs text-[#1E1E1E]">
                                          <span>Query: 1-{isNucleotide ? 240 : 87}</span>
                                          <span className="ml-auto">Identidad: {result.identity}% | Cobertura: {result.coverage}%</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </TabsContent>

                        {/* Alignments Tab */}
                        <TabsContent value="alignments" className="mt-0">
                          {selectedSeqs.size === 0 ? (
                            <div className="text-center py-12">
                              <AlignLeft className="h-16 w-16 text-[#BDBDBD] mx-auto mb-4" />
                              <h3 className="text-lg text-[#1E1E1E] mb-2">Vista de Alineamientos</h3>
                              <p className="text-sm text-[#757575] mb-2">
                                Selecciona una o más secuencias desde la tabla de resultados para ver los alineamientos detallados
                              </p>
                              <p className="text-xs text-[#757575]">
                                Haz clic en el checkbox al inicio de cada fila para seleccionar
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              {/* Alignment View Selector */}
                              <div className="flex items-center gap-4 pb-4 border-b border-[#E0E0E0]">
                                <Label className="text-sm text-[#757575]">Alignment view:</Label>
                                <Select value={alignmentView} onValueChange={(value: any) => setAlignmentView(value)}>
                                  <SelectTrigger className="w-[280px] border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pairwise">Pairwise</SelectItem>
                                    {isNucleotide ? (
                                      <SelectItem value="pairwise-dots">Pairwise with dots for identities</SelectItem>
                                    ) : (
                                      <SelectItem value="query-anchored">Query-anchored with dots for identities</SelectItem>
                                    )}
                                  </SelectContent>
                                </Select>
                                <div className="flex items-center gap-2 ml-auto">
                                  <Badge variant="outline" className="bg-[#F5F5F5] border-[#E0E0E0] text-[#757575]">
                                    {selectedSeqs.size} {selectedSeqs.size === 1 ? 'secuencia seleccionada' : 'secuencias seleccionadas'}
                                  </Badge>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedSeqs(new Set())}
                                    className="border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                                  >
                                    Limpiar selección
                                  </Button>
                                </div>
                              </div>

                              {/* Display alignments based on view type */}
                              {alignmentView === 'query-anchored' ? (
                                /* Query-anchored view - shows all sequences aligned together with dots */
                                <div className="border border-[#E0E0E0] rounded-lg overflow-hidden">
                                  <div className="bg-[#F5F5F5] px-4 py-3 border-b border-[#E0E0E0]">
                                    <div className="flex items-center gap-2">
                                      <Download className="h-4 w-4 text-[#FC10C3]" />
                                      <h3 className="text-sm text-[#1E1E1E]">Download</h3>
                                    </div>
                                  </div>
                                  <div className="bg-white px-4 py-4">
                                    <div className="font-mono text-xs space-y-6 overflow-x-auto">
                                      {/* Query range 1: 1 to 60 */}
                                      <div className="space-y-2">
                                        <p className="text-[#1E1E1E] mb-2"><span className="text-[#0066CC] hover:underline cursor-pointer">▼ Next</span> <span className="text-[#BDBDBD]">▲ Previous</span> <span className="text-[#0066CC] hover:underline cursor-pointer">▲ First Range</span></p>
                                        <p className="text-[#1E1E1E] mb-3">Query range 1: 1 to 60</p>
                                        <div className="space-y-0.5">
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#1E1E1E]">Query</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">1</span>
                                            <span className="text-[#1E1E1E]">MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFS</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">60</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">YP_009724390.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">1</span>
                                            <span className="text-[#1E1E1E]">........................................................</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">60</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">YP_009825051.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">1</span>
                                            <span className="text-[#1E1E1E]">....L.T.T.T.CSDLDK.TFDQA.N..Q.SN.......EI...DT.YL........</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">64</span>
                                          </div>
                                          <div className="mt-4 flex justify-center text-[#1E1E1E]">
                                            <span>)</span>
                                            <span className="ml-16">)</span>
                                          </div>
                                          <div className="flex justify-center text-[#1E1E1E] -mt-1">
                                            <span className="text-sm">DV</span>
                                            <span className="ml-10 text-sm">HT</span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Query range 2: 61 to 120 */}
                                      <div className="space-y-2">
                                        <p className="text-[#1E1E1E] mb-2"><span className="text-[#0066CC] hover:underline cursor-pointer">▼ Next</span> <span className="text-[#0066CC] hover:underline cursor-pointer">▲ Previous</span> <span className="text-[#0066CC] hover:underline cursor-pointer">▲ First Range</span></p>
                                        <p className="text-[#1E1E1E] mb-3">Query range 2: 61 to 120</p>
                                        <div className="space-y-0.5">
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#1E1E1E]">Query</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">61</span>
                                            <span className="text-[#1E1E1E]">NVTWFHAIHVSGTNGTKRFTNLVLLQNGQAELTSRNSALEDLLFVSKVVLSDGVFVEAYN</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">120</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">YP_009724390.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">61</span>
                                            <span className="text-[#1E1E1E]">................D.P..</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">82</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">YP_009825051.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">813</span>
                                            <span className="text-[#1E1E1E]">                        .KR.FI.....N..T.A.A..IKQ.GD</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">839</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">NP_150077.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">795</span>
                                            <span className="text-[#1E1E1E]">                        .IKR.FI.....N..T.A.A..NKQ.GE</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">821</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">YP_209233.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">65</span>
                                            <span className="text-[#1E1E1E]">...G..T.N</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">73</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">NP_045300.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">911</span>
                                            <span className="text-[#1E1E1E]">                        .SR..I.....Q................</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">937</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">YP_209233.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">913</span>
                                            <span className="text-[#1E1E1E]">                        ..PSAIRG.--.I.....D................</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">945</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">NP_045300.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">861</span>
                                            <span className="text-[#1E1E1E]">                        ..PSAIRG.--.I.....D................</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">893</span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Query range 3: 121 to 135 */}
                                      <div className="space-y-2">
                                        <p className="text-[#1E1E1E] mb-2"><span className="text-[#BDBDBD]">▼ Next</span> <span className="text-[#0066CC] hover:underline cursor-pointer">▲ Previous</span> <span className="text-[#0066CC] hover:underline cursor-pointer">▲ First Range</span></p>
                                        <p className="text-[#1E1E1E] mb-3">Query range 3: 121 to 135</p>
                                        <div className="space-y-0.5">
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#1E1E1E]">Query</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">121</span>
                                            <span className="text-[#1E1E1E]">CTGGAEVSVGNL.TAQS</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">135</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">YP_009724390.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">840</span>
                                            <span className="text-[#1E1E1E]">.L.DIAARDLIC..K</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">854</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">YP_009825051.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">822</span>
                                            <span className="text-[#1E1E1E]">.L.DINARDLIC..</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">835</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">NP_150077.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">938</span>
                                            <span className="text-[#1E1E1E]">......IRDLICV..</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">952</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">YP_209233.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">946</span>
                                            <span className="text-[#1E1E1E]">....Q..RDL.CV..</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">960</span>
                                          </div>
                                          <div className="flex">
                                            <span className="w-32 flex-shrink-0 text-[#0066CC] hover:underline cursor-pointer">NP_045300.1</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] mr-2">894</span>
                                            <span className="text-[#1E1E1E]">....Q..RDL.CV..</span>
                                            <span className="w-8 flex-shrink-0 text-right text-[#1E1E1E] ml-2">908</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                /* Pairwise view - shows each sequence separately */
                                Array.from(selectedSeqs).map((seqId) => {
                                  const alignment = getAlignmentData(seqId);
                                  if (!alignment) return null;

                                  const alignmentLines = formatAlignmentLines(
                                    alignment.querySeq,
                                    alignment.middleSeq,
                                    alignment.subjectSeq,
                                    alignment.queryStart,
                                    alignment.subjectStart,
                                    alignmentView === 'pairwise-dots'
                                  );

                                  return (
                                    <div key={seqId} className="border border-[#E0E0E0] rounded-lg overflow-hidden">
                                      {/* Header */}
                                      <div className="bg-[#F5F5F5] px-4 py-3 border-b border-[#E0E0E0]">
                                        <div className="flex items-start justify-between">
                                          <div className="flex-1">
                                            <h3 className="text-sm text-[#1E1E1E] mb-1">{alignment.description}</h3>
                                            <div className="flex items-center gap-4 text-xs text-[#757575]">
                                              <span>Sequence ID: <span className="text-[#FC10C3]">{alignment.sequenceId}</span></span>
                                              <span>Length: {alignment.length}</span>
                                              <span>Number of Matches: {alignment.numMatches}</span>
                                            </div>
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleSeqSelection(seqId)}
                                            className="text-[#757575] hover:text-[#FC10C3]"
                                          >
                                            Deseleccionar
                                          </Button>
                                        </div>
                                      </div>

                                      {/* Range Info */}
                                      <div className="bg-white px-4 py-3 border-b border-[#E0E0E0]">
                                        <div className="text-sm space-y-1">
                                          <div className="flex items-center gap-6">
                                            <span className="text-[#757575]">Range 1: {alignment.queryStart} to {alignment.queryEnd}</span>
                                            <span className="text-[#0066CC] hover:underline cursor-pointer">GetSeq</span>
                                            <span className="text-[#0066CC] hover:underline cursor-pointer">Graphics</span>
                                          </div>
                                          <div className="grid grid-cols-3 gap-x-8 gap-y-2 mt-2 text-xs">
                                            <div>
                                              <span className="text-[#757575]">Score</span>
                                              <p className="text-[#1E1E1E]">{alignment.score} bits({Math.round(alignment.score * 0.54)})</p>
                                            </div>
                                            <div>
                                              <span className="text-[#757575]">Expect</span>
                                              <p className="text-[#1E1E1E]">{alignment.expect}</p>
                                            </div>
                                            <div>
                                              <span className="text-[#757575]">Method</span>
                                              <p className="text-[#1E1E1E]">Compositional matrix adjust.</p>
                                            </div>
                                            <div>
                                              <span className="text-[#757575]">Identities</span>
                                              <p className="text-[#1E1E1E]">{alignment.identities}</p>
                                            </div>
                                            <div>
                                              <span className="text-[#757575]">Positives</span>
                                              <p className="text-[#1E1E1E]">{alignment.positives || alignment.identities}</p>
                                            </div>
                                            <div>
                                              <span className="text-[#757575]">Gaps</span>
                                              <p className="text-[#1E1E1E]">{alignment.gaps}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Alignment Display */}
                                      <div className="bg-white px-4 py-4">
                                        <div className="font-mono text-xs space-y-3 overflow-x-auto">
                                          {alignmentLines.map((line, idx) => (
                                            <div key={idx} className="space-y-0.5">
                                              <div className="flex items-start">
                                                <span className="text-[#757575] w-16 flex-shrink-0">Query</span>
                                                <span className="text-[#1E1E1E] w-8 flex-shrink-0 text-right mr-2">{line.queryRange}</span>
                                                <span className="text-[#1E1E1E] whitespace-pre">{line.query}</span>
                                                <span className="text-[#1E1E1E] w-8 flex-shrink-0 text-right ml-2">{line.queryEnd}</span>
                                              </div>
                                              <div className="flex items-start">
                                                <span className="w-16 flex-shrink-0"></span>
                                                <span className="w-8 flex-shrink-0 mr-2"></span>
                                                <span className="text-[#757575] whitespace-pre">{line.middle}</span>
                                              </div>
                                              <div className="flex items-start">
                                                <span className="text-[#757575] w-16 flex-shrink-0">Sbjct</span>
                                                <span className="text-[#1E1E1E] w-8 flex-shrink-0 text-right mr-2">{line.subjectRange}</span>
                                                <span className="text-[#1E1E1E] whitespace-pre">{line.subject}</span>
                                                <span className="text-[#1E1E1E] w-8 flex-shrink-0 text-right ml-2">{line.subjectEnd}</span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="taxonomy" className="mt-0">
                          <div className="space-y-4">
                            <Card className="border-[#E0E0E0]">
                              <CardHeader>
                                <CardTitle className="text-base text-[#1E1E1E]">Distribución Taxonómica</CardTitle>
                                <CardDescription className="text-[#757575]">
                                  Resultados agrupados por taxonomía del organismo
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3">
                                  {isNucleotide ? (
                                    <div className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg border border-[#E0E0E0]">
                                      <div>
                                        <p className="text-sm text-[#1E1E1E] italic">Severe acute respiratory syndrome coronavirus 2</p>
                                        <p className="text-xs text-[#757575]">Coronaviridae</p>
                                      </div>
                                      <Badge className="bg-[#FC10C3] text-white border-0">{filteredResults.length} hits</Badge>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg border border-[#E0E0E0]">
                                        <div>
                                          <p className="text-sm text-[#1E1E1E] italic">Homo sapiens</p>
                                          <p className="text-xs text-[#757575]">Primates</p>
                                        </div>
                                        <Badge className="bg-[#FC10C3] text-white border-0">2 hits</Badge>
                                      </div>
                                      <div className="flex items-center justify-between p-3 bg-[#F5F5F5] rounded-lg border border-[#E0E0E0]">
                                        <div>
                                          <p className="text-sm text-[#1E1E1E] italic">Pan troglodytes</p>
                                          <p className="text-xs text-[#757575]">Primates</p>
                                        </div>
                                        <Badge className="bg-[#FC10C3] text-white border-0">1 hit</Badge>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </TabsContent>
                      </>
                    )}
                  </CardContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
