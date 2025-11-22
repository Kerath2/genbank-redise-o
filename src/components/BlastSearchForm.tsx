import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Checkbox } from './ui/checkbox';
import {
  Dna,
  Pill,
  Search,
  RotateCcw,
  ChevronDown,
  Lightbulb,
  Info,
  FileText,
  TrendingUp,
  Upload,
  HelpCircle,
  Zap,
  Settings2,
  Save,
  Clock,
  AlertCircle,
  CheckCircle2,
  Home
} from 'lucide-react';

interface BlastSearchFormProps {
  onStartSearch: (data: any) => void;
  initialTab?: 'nucleotide' | 'protein';
  onGoHome?: () => void;
}

export function BlastSearchForm({ onStartSearch, initialTab = 'protein', onGoHome }: BlastSearchFormProps) {
  const [activeTab, setActiveTab] = useState<'nucleotide' | 'protein'>(initialTab);
  const [searchMode, setSearchMode] = useState<'quick' | 'advanced'>('quick'); // R7: Modo rápido vs avanzado
  const [selectedExample, setSelectedExample] = useState<string>('');
  const [sequence, setSequence] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [database, setDatabase] = useState('clustered');
  const [algorithm, setAlgorithm] = useState('blastp');
  const [organism, setOrganism] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false); // R1: Ocultar parámetros avanzados
  const [showValidation, setShowValidation] = useState(false); // R5: Validación previa
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [organismSuggestions, setOrganismSuggestions] = useState<string[]>([]); // R4: Autocompletado
  const [showOrganismSuggestions, setShowOrganismSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<any[]>([]); // R25: Historial
  
  const [maxTargetSeqs, setMaxTargetSeqs] = useState('100');
  const [expectThreshold, setExpectThreshold] = useState('10');
  const [wordSize, setWordSize] = useState('3');
  const [matrix, setMatrix] = useState('BLOSUM62');
  const [gapCosts, setGapCosts] = useState('11-1');

  // New BLASTP parameters
  const [shortQueries, setShortQueries] = useState(false);
  const [maxMatches, setMaxMatches] = useState('0');
  const [compositionalAdjustments, setCompositionalAdjustments] = useState('conditional');
  const [lowComplexityFilter, setLowComplexityFilter] = useState(false);
  const [maskLookup, setMaskLookup] = useState(false);
  const [maskLowerCase, setMaskLowerCase] = useState(false);

  // R4: Lista de organismos comunes para autocompletado
  const commonOrganisms = [
    'Homo sapiens',
    'Mus musculus',
    'Rattus norvegicus',
    'Drosophila melanogaster',
    'Caenorhabditis elegans',
    'Saccharomyces cerevisiae',
    'Escherichia coli',
    'Bacillus subtilis',
    'SARS-CoV-2',
    'Influenza A virus',
    'HIV-1',
    'Arabidopsis thaliana',
    'Oryza sativa',
    'Zea mays'
  ];

  // R4: Filtrar sugerencias de organismos
  useEffect(() => {
    if (organism.length > 0) {
      const filtered = commonOrganisms.filter(org => 
        org.toLowerCase().includes(organism.toLowerCase())
      );
      setOrganismSuggestions(filtered);
      setShowOrganismSuggestions(filtered.length > 0);
    } else {
      setShowOrganismSuggestions(false);
    }
  }, [organism]);

  // R25: Cargar búsquedas recientes del localStorage
  useEffect(() => {
    const saved = localStorage.getItem('blastRecentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const examples = {
    spike: { 
      name: 'SARS-CoV-2 Spike Protein', 
      sequence: 'MFVFLVLLPLVSSQCVNLTTRTQLPPAYTNSFTRGVYYPDKVFRSSVLHSTQDLFLPFFSNVTWFHAIHVSGTNGTKRFDNPVLPFNDGVYFASTEKSNIIRGWIFGTTLDSKTQSLLIVNNATNVVIKVCEFQFCNDPFLGVYYHKNNKSWMESEFRVYSSANNCTFEYVSQPFLMDLEGKQGNFKNLREFVFKNIDGYFKIYSKHTPINLVRDLPQGFSALEPLVDLPIGINITRFQTLLALHRSYLTPGDSSSGWTAGAAAYYVGYLQPRTFLLKYNENGTITDAVDCALDPLSETKCTLKSFTVEKGIYQTSNFRVQPTESIVRFPNITNLCPFGEVFNATRFASVYAWNRKRISNCVADYSVLYNSASFSTFKCYGVSPTKLNDLCFTNVYADSFVIRGDEVRQIAPGQTGKIADYNYKLPDDFTGCVIAWNSNNLDSKVGGNYNYLYRLFRKSNLKPFERDISTEIYQAGSTPCNGVEGFNCYFPLQSYGFQPTNGVGYQPYRVVVLSFELLHAPATVCGPKKSTNLVKNKCVNFNFNGLTGTGVLTESNKKFLPFQQFGRDIADTTDAVRDPQTLEILDITPCSFGGVSVITPGTNTSNQVAVLYQDVNCTEVPVAIHADQLTPTWRVYSTGSNVFQTRAGCLIGAEHVNNSYECDIPIGAGICASYQTQTNSPRRARSVASQSIIAYTMSLGAENSVAYSNNSIAIPTNFTISVTTEILPVSMTKTSVDCTMYICGDSTECSNLLLQYGSFCTQLNRALTGIAVEQDKNTQEVFAQVKQIYKTPPIKDFGGFNFSQILPDPSKPSKRSFIEDLLFNKVTLADAGFIKQYGDCLGDIAARDLICAQKFNGLTVLPPLLTDEMIAQYTSALLAGTITSGWTFGAGAALQIPFAMQMAYRFNGIGVTQNVLYENQKLIANQFNSAIGKIQDSLSSTASALGKLQDVVNQNAQALNTLVKQLSSNFGAISSVLNDILSRLDKVEAEVQIDRLITGRLQSLQTYVTQQLIRAAEIRASANLAATKMSECVLGQSKRVDFCGKGYHLMSFPQSAPHGVVFLHVTYVPAQEKNFTTAPAICHDGKAHFPREGVFVSNGTHWFVTQRNFYEPQIITTDNTFVSGNCDVVIGIVNNTVYDPLQPELDSFKEELDKYFKNHTSPDVDLGDISGINASVVNIQKEIDRLNEVAKNLNESLIDLQELGKYEQYIKWPWYIWLGFIAGLIAIVMVTIMLCCMTSCCSCLKGCCSCGSCCKFDEDDSEPVLKGVKLHYT',
      organism: 'SARS-CoV-2'
    },
    hemoglobin: { 
      name: 'Human Hemoglobin Beta', 
      sequence: 'MVHLTPEEKSAVTALWGKVNVDEVGGEALGRLLVVYPWTQRFFESFGDLSTPDAVMGNPKVKAHGKKVLGAFSDGLAHLDNLKGTFATLSELHCDKLHVDPENFRLLGNVLVCVLAHHFGKEFTPPVQAAYQKVVAGVANALAHKYH',
      organism: 'Homo sapiens'
    },
    insulin: { 
      name: 'Human Insulin', 
      sequence: 'MALWMRLLPLLALLALWGPDPAAAFVNQHLCGSHLVEALYLVCGERGFFYTPKTRREAEDLQVGQVELGGGPGAGSLQPLALEGSLQKRGIVEQCCTSICSLYQLENYCN',
      organism: 'Homo sapiens'
    },
    p53: {
      name: 'Tumor Protein p53',
      sequence: 'MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGPDEAPRMPEAAPPVAPAPAAPTPAAPAPAPSWPLSSSVPSQKTYQGSYGFRLGFLHSGTAKSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHERCSDSDGLAPPQHLIRVEGNLRVEYLDDRNTFRHSVVVPYEPPEVGSDCTTIHYNYMCNSSCMGGMNRRPILTIITLEDSSGNLLGRNSFEVRVCACPGRDRRTEEENLRKKGEPHHELPPGSTKRALPNNTSSSPQPKKKPLDGEYFTLQIRGRERFEMFRELNEALELKDAQAGKEPGGSRAHSSHLKSKKGQSTSRHKKLMFKTEGPDSD',
      organism: 'Homo sapiens'
    }
  };

  const nucleotideExample = {
    name: 'Human TP53 Gene',
    sequence: 'ATGGAGGAGCCGCAGTCAGATCCTAGCGTCGAGCCCCCTCTGAGTCAGGAAACATTTTCAGACCTATGGAAACTACTTCCTGAAAACAACGTTCTGTCCCCCTTGCCGTCCCAAGCAATGGATGATTTGATGCTGTCCCCGGACGATATTGAACAATGGTTCACTGAAGACCCAGGTCCAGATGAAGCTCCCAGAATGCCAGAGGCTGCTCCCCCCGTGGCCCCTGCACCAGCAGCTCCTACACCGGCGGCCCCTGCACCAGCCCCCTCCTGGCCCCTGTCATCTTCT',
    organism: 'Homo sapiens'
  };

  const handleExampleClick = (example: string) => {
    setSelectedExample(example);
    const exampleData = activeTab === 'protein' 
      ? examples[example as keyof typeof examples]
      : nucleotideExample;
    
    setSequence(exampleData.sequence);
    setSearchTitle(exampleData.name);
    setOrganism(exampleData.organism);
  };

  // R5: Validación previa de parámetros
  const validateParameters = () => {
    const errors: string[] = [];
    
    if (!sequence.trim()) {
      errors.push('Query sequence is required');
    } else if (sequence.replace(/\s/g, '').length < 10) {
      errors.push('Sequence must be at least 10 characters long');
    }
    
    const eValue = parseFloat(expectThreshold);
    if (isNaN(eValue) || eValue <= 0) {
      errors.push('E-value must be a positive number');
    }
    
    const maxSeqs = parseInt(maxTargetSeqs);
    if (isNaN(maxSeqs) || maxSeqs < 1 || maxSeqs > 20000) {
      errors.push('Maximum number of sequences must be between 1 and 20,000');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleStartBlast = () => {
    setShowValidation(true);
    
    if (!validateParameters()) {
      return;
    }

    const searchData = {
      type: activeTab,
      sequence,
      searchTitle,
      database,
      algorithm,
      organism,
      maxTargetSeqs,
      expectThreshold,
      wordSize,
      matrix,
      gapCosts,
      shortQueries,
      maxMatches,
      compositionalAdjustments,
      lowComplexityFilter,
      maskLookup,
      maskLowerCase,
      timestamp: new Date().toISOString()
    };

    // R25: Guardar en historial
    const updated = [searchData, ...recentSearches.slice(0, 4)];
    setRecentSearches(updated);
    localStorage.setItem('blastRecentSearches', JSON.stringify(updated));

    onStartSearch(searchData);
  };

  const handleReset = () => {
    setSequence('');
    setSearchTitle('');
    setSelectedExample('');
    setOrganism('');
    setShowValidation(false);
    setValidationErrors([]);
  };

  // R25: Cargar búsqueda del historial
  const loadRecentSearch = (search: any) => {
    setSequence(search.sequence);
    setSearchTitle(search.searchTitle);
    setOrganism(search.organism);
    setDatabase(search.database);
    setAlgorithm(search.algorithm);
    setActiveTab(search.type);
  };

  const detectedLength = sequence.replace(/\s/g, '').length;

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#F5F5F5]">
        {/* Header */}
        <header className="bg-white border-b border-[#E0E0E0]">
          <div className="max-w-[1400px] mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-4">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-[#21D7FF] via-[#704BFF] to-[#FC10C3] p-2.5 rounded-lg">
                    <Dna className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl text-[#1E1E1E]">BLAST Search</h1>
                    <p className="text-sm text-[#757575]">Basic Local Alignment Search Tool</p>
                  </div>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'nucleotide' | 'protein')}>
                <TabsList className="bg-[#F5F5F5] border border-[#E0E0E0]">
                  <TabsTrigger 
                    value="protein" 
                    className="data-[state=active]:bg-white data-[state=active]:text-[#FC10C3] data-[state=active]:border-[#FC10C3] gap-2"
                  >
                    <Pill className="h-4 w-4" />
                    Protein BLAST
                  </TabsTrigger>
                  <TabsTrigger 
                    value="nucleotide" 
                    className="data-[state=active]:bg-white data-[state=active]:text-[#FC10C3] data-[state=active]:border-[#FC10C3] gap-2"
                  >
                    <Dna className="h-4 w-4" />
                    Nucleotide BLAST
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </header>

        {/* R5: Validation Banner */}
        {showValidation && validationErrors.length > 0 && (
          <div className="bg-[#FFF4F4] border-b border-[#F44336]">
            <div className="max-w-[1400px] mx-auto px-6 py-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-[#F44336] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[#D32F2F] font-medium mb-2">Por favor, corrige los siguientes errores:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {validationErrors.map((error, idx) => (
                      <li key={idx} className="text-sm text-[#D32F2F]">{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* R21: Panel lateral de ayuda contextual */}
            <div className="lg:col-span-1 space-y-4">
              {/* R7: Modo rápido vs avanzado */}
              <Card className="bg-white border-[#E0E0E0] shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-[#FC10C3]" />
                    <CardTitle className="text-sm text-[#1E1E1E]">Modo de Búsqueda</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={searchMode === 'quick' ? 'default' : 'outline'}
                    size="sm"
                    className={`w-full justify-start gap-2 ${
                      searchMode === 'quick'
                        ? 'bg-[#FC10C3] hover:bg-[#E010B3] text-white'
                        : 'border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]'
                    }`}
                    onClick={() => {
                      setSearchMode('quick');
                      setIsAdvancedOpen(false);
                    }}
                  >
                    <Zap className="h-4 w-4" />
                    Búsqueda Rápida
                  </Button>
                  <Button
                    variant={searchMode === 'advanced' ? 'default' : 'outline'}
                    size="sm"
                    className={`w-full justify-start gap-2 ${
                      searchMode === 'advanced'
                        ? 'bg-[#FC10C3] hover:bg-[#E010B3] text-white'
                        : 'border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]'
                    }`}
                    onClick={() => {
                      setSearchMode('advanced');
                      setIsAdvancedOpen(true);
                    }}
                  >
                    <Settings2 className="h-4 w-4" />
                    Modo Avanzado
                  </Button>
                </CardContent>
              </Card>

              {/* R25: Historial de búsquedas recientes */}
              {recentSearches.length > 0 && (
                <Card className="bg-white border-[#E0E0E0] shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#FC10C3]" />
                      <CardTitle className="text-sm text-[#1E1E1E]">Búsquedas Recientes</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {recentSearches.slice(0, 3).map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => loadRecentSearch(search)}
                        className="w-full text-left p-2 rounded-lg hover:bg-[#F5F5F5] border border-[#E0E0E0] transition-colors"
                      >
                        <p className="text-xs text-[#1E1E1E] truncate">{search.searchTitle || 'Sin título'}</p>
                        <p className="text-xs text-[#757575] mt-1">
                          {new Date(search.timestamp).toLocaleDateString()}
                        </p>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}

              <Card className="bg-white border-[#E0E0E0] shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-[#FC10C3]" />
                    <CardTitle className="text-sm text-[#1E1E1E]">Consejos</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#757575] leading-relaxed">
                    {searchMode === 'quick' 
                      ? 'Modo rápido usa configuraciones optimizadas automáticamente. Ideal para búsquedas estándar.'
                      : 'Modo avanzado te permite ajustar todos los parámetros. Recomendado para usuarios experimentados.'}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-[#E0E0E0] shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-[#FC10C3]" />
                    <CardTitle className="text-sm text-[#1E1E1E]">
                      ¿Qué es {activeTab === 'protein' ? 'BLASTP' : 'BLASTN'}?
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#757575] leading-relaxed">
                    {activeTab === 'protein' 
                      ? 'BLASTP compara tu secuencia de aminoácidos contra bases de datos de proteínas para encontrar homólogos y dominios conservados.'
                      : 'BLASTN compara secuencias de nucleótidos para identificar secuencias similares en bases de datos de ADN/ARN.'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* R3: Example Selection */}
              <Card className="bg-white border-[#E0E0E0] shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-[#FC10C3]" />
                    <CardTitle className="text-base text-[#1E1E1E]">Ejemplos Predefinidos</CardTitle>
                  </div>
                  <CardDescription className="text-[#757575]">
                    Carga un ejemplo preconfigurado para empezar rápidamente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {activeTab === 'protein' ? (
                      <>
                        <Button
                          variant={selectedExample === 'spike' ? 'default' : 'outline'}
                          onClick={() => handleExampleClick('spike')}
                          size="sm"
                          className={selectedExample === 'spike' ? 'bg-[#FC10C3] hover:bg-[#E010B3] text-white' : 'text-[#757575] border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]'}
                        >
                          SARS-CoV-2 Spike
                        </Button>
                        <Button
                          variant={selectedExample === 'hemoglobin' ? 'default' : 'outline'}
                          onClick={() => handleExampleClick('hemoglobin')}
                          size="sm"
                          className={selectedExample === 'hemoglobin' ? 'bg-[#FC10C3] hover:bg-[#E010B3] text-white' : 'text-[#757575] border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]'}
                        >
                          Hemoglobina
                        </Button>
                        <Button
                          variant={selectedExample === 'insulin' ? 'default' : 'outline'}
                          onClick={() => handleExampleClick('insulin')}
                          size="sm"
                          className={selectedExample === 'insulin' ? 'bg-[#FC10C3] hover:bg-[#E010B3] text-white' : 'text-[#757575] border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]'}
                        >
                          Insulina
                        </Button>
                        <Button
                          variant={selectedExample === 'p53' ? 'default' : 'outline'}
                          onClick={() => handleExampleClick('p53')}
                          size="sm"
                          className={selectedExample === 'p53' ? 'bg-[#FC10C3] hover:bg-[#E010B3] text-white' : 'text-[#757575] border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]'}
                        >
                          p53 Protein
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant={selectedExample === 'tp53' ? 'default' : 'outline'}
                        onClick={() => handleExampleClick('tp53')}
                        size="sm"
                        className={selectedExample === 'tp53' ? 'bg-[#FC10C3] hover:bg-[#E010B3] text-white' : 'text-[#757575] border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]'}
                      >
                        Gen TP53 Humano
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Sequence Input */}
              <Card className="bg-white border-[#E0E0E0] shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base text-[#1E1E1E]">
                      Secuencia {activeTab === 'protein' ? 'de Proteína' : 'de Nucleótidos'}
                    </CardTitle>
                    {/* R2: Tooltip */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                        <p>Ingresa tu secuencia en formato FASTA o como texto plano. Se aceptan secuencias de {activeTab === 'protein' ? 'aminoácidos (letras A-Z)' : 'nucleótidos (A, T, G, C, U)'}.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <CardDescription className="text-[#757575]">
                    Ingresa tu secuencia en formato FASTA o pega la secuencia directamente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="sequence" className="text-sm text-[#1E1E1E]">
                      Secuencia de Consulta <span className="text-[#FC10C3]">*</span>
                    </Label>
                    <Textarea
                      id="sequence"
                      placeholder={
                        activeTab === 'protein'
                          ? 'Ingresa la secuencia de aminoácidos (ej: MEEPQSDPSV...)...'
                          : 'Ingresa la secuencia de nucleótidos (ej: ATGGAGGAGC...)...'
                      }
                      value={sequence}
                      onChange={(e) => setSequence(e.target.value)}
                      className="min-h-[180px] font-mono text-sm border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]"
                      required
                    />
                    {detectedLength > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <Badge variant="secondary" className="bg-[#E8F5E9] text-[#2E7D32] border-[#81C784]">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Detectado: {detectedLength} {activeTab === 'protein' ? 'aminoácidos' : 'nucleótidos'}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm text-[#1E1E1E]">Título de la Búsqueda (Opcional)</Label>
                    <Input
                      id="title"
                      placeholder="ej: Análisis de Proteína X"
                      value={searchTitle}
                      onChange={(e) => setSearchTitle(e.target.value)}
                      className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Configuration */}
              <Card className="bg-white border-[#E0E0E0] shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base text-[#1E1E1E]">Search Configuration</CardTitle>
                  <CardDescription className="text-[#757575]">
                    Configure database and algorithm parameters
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* R2: Database con tooltip */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="database" className="text-sm text-[#1E1E1E]">Database</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                            <p>Select the database against which your sequence will be compared. ClusteredNR is recommended for most searches.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Select value={database} onValueChange={setDatabase}>
                        <SelectTrigger id="database" className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {activeTab === 'protein' ? (
                            <>
                              <SelectItem value="clustered">ClusteredNR (Recommended)</SelectItem>
                              <SelectItem value="nr">Non-redundant (nr)</SelectItem>
                              <SelectItem value="refseq">RefSeq Proteins</SelectItem>
                              <SelectItem value="refseq_protein">Reference proteins (refseq_protein)</SelectItem>
                              <SelectItem value="swissprot">UniProtKB/Swiss-Prot</SelectItem>
                              <SelectItem value="pdb">PDB Proteins</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="nr_nt">Nucleotide collection (nr/nt)</SelectItem>
                              <SelectItem value="nt">Nucleotide Collection (nt)</SelectItem>
                              <SelectItem value="refseq_rna">RefSeq RNA</SelectItem>
                              <SelectItem value="refseq_genomic">RefSeq Genomic</SelectItem>
                              <SelectItem value="est">EST Database</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* R2: Algorithm con tooltip */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="algorithm" className="text-sm text-[#1E1E1E]">Algorithm</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                            <p>{activeTab === 'protein' ? 'BLASTP is the standard algorithm for proteins. PSI-BLAST is more sensitive for distant homologs.' : 'BLASTN is the standard algorithm. Megablast is faster for very similar sequences.'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Select value={algorithm} onValueChange={setAlgorithm}>
                        <SelectTrigger id="algorithm" className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {activeTab === 'protein' ? (
                            <>
                              <SelectItem value="blastp">BLASTP (Standard)</SelectItem>
                              <SelectItem value="psi-blast">PSI-BLAST</SelectItem>
                              <SelectItem value="phi-blast">PHI-BLAST</SelectItem>
                              <SelectItem value="delta-blast">DELTA-BLAST</SelectItem>
                              <SelectItem value="protein-protein">protein-protein BLAST</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="blastn">blastn</SelectItem>
                              <SelectItem value="blastn-short">short blastn</SelectItem>
                              <SelectItem value="megablast">megablast</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* R4: Organism con autocompletado */}
                    <div className="space-y-2 relative">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="organism" className="text-sm text-[#1E1E1E]">Organism (Optional)</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                            <p>Limit the search to a specific organism. Start typing to see suggestions.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id="organism"
                        placeholder="e.g.: Homo sapiens"
                        value={organism}
                        onChange={(e) => setOrganism(e.target.value)}
                        onFocus={() => organism.length > 0 && setShowOrganismSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowOrganismSuggestions(false), 200)}
                        className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]"
                      />
                      {/* R4: Autocompletado dropdown */}
                      {showOrganismSuggestions && organismSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-[#E0E0E0] rounded-lg shadow-lg max-h-60 overflow-auto">
                          {organismSuggestions.map((org, idx) => (
                            <button
                              key={idx}
                              className="w-full text-left px-3 py-2 hover:bg-[#F5F5F5] text-sm text-[#1E1E1E] border-b border-[#F5F5F5] last:border-b-0"
                              onClick={() => {
                                setOrganism(org);
                                setShowOrganismSuggestions(false);
                              }}
                            >
                              <span className="italic">{org}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* R1: Advanced Parameters - Siempre visible */}
                  <Collapsible 
                    open={isAdvancedOpen} 
                    onOpenChange={(open) => {
                      setIsAdvancedOpen(open);
                      // Cuando se abren los parámetros avanzados, cambiar a modo avanzado
                      if (open) {
                        setSearchMode('advanced');
                      }
                    }}
                  >
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]" 
                        type="button"
                      >
                        <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                        Advanced Parameters
                        {isAdvancedOpen && (
                          <Badge className="ml-auto bg-[#FC10C3] text-white border-0">
                            Expert Mode
                          </Badge>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4 mt-4 pt-4 border-t border-[#E0E0E0]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="max-seqs" className="text-sm text-[#1E1E1E]">Max target sequences</Label>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                                <p>Select the maximum number of aligned sequences to display</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Input
                            id="max-seqs"
                            type="number"
                            value={maxTargetSeqs}
                            onChange={(e) => setMaxTargetSeqs(e.target.value)}
                            className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="expect" className="text-sm text-[#1E1E1E]">Expect threshold</Label>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                                <p>Expected number of chance matches in a random model. This number should be give between 0 and 1000</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Input
                            id="expect"
                            type="number"
                            step="0.001"
                            value={expectThreshold}
                            onChange={(e) => setExpectThreshold(e.target.value)}
                            className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="word-size" className="text-sm text-[#1E1E1E]">Word size</Label>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                                <p>Length of initial exact match</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Select value={wordSize} onValueChange={setWordSize}>
                            <SelectTrigger id="word-size" className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {activeTab === 'protein' ? (
                                <>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="6">6</SelectItem>
                                </>
                              ) : (
                                <>
                                  <SelectItem value="7">7</SelectItem>
                                  <SelectItem value="11">11</SelectItem>
                                  <SelectItem value="15">15</SelectItem>
                                  <SelectItem value="28">28</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {activeTab === 'protein' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="matrix" className="text-sm text-[#1E1E1E]">Matrix</Label>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                                  <p>Assigns a score for aligning pairs of residues, and determines overall alignment score</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Select value={matrix} onValueChange={setMatrix}>
                              <SelectTrigger id="matrix" className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="BLOSUM62">BLOSUM62</SelectItem>
                                <SelectItem value="BLOSUM45">BLOSUM45</SelectItem>
                                <SelectItem value="BLOSUM80">BLOSUM80</SelectItem>
                                <SelectItem value="PAM30">PAM30</SelectItem>
                                <SelectItem value="PAM70">PAM70</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="gap-costs" className="text-sm text-[#1E1E1E]">Gap Costs</Label>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                                  <p>Cost to create and extend a gap in an alignment</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Select value={gapCosts} onValueChange={setGapCosts}>
                              <SelectTrigger id="gap-costs" className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="11-1">Existence: 11 Extension: 1</SelectItem>
                                <SelectItem value="10-1">Existence: 10 Extension: 1</SelectItem>
                                <SelectItem value="9-2">Existence: 9 Extension: 2</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      {activeTab === 'protein' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="short-queries" className="text-sm text-[#1E1E1E]">Short queries</Label>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                                  <p>Automatically adjust parameters for short input sequences</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Select value={shortQueries ? 'true' : 'false'} onValueChange={(v) => setShortQueries(v === 'true')}>
                              <SelectTrigger id="short-queries" className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">Yes</SelectItem>
                                <SelectItem value="false">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="max-matches" className="text-sm text-[#1E1E1E]">Max matches in a query range</Label>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                                  <p>Limit the number of matches to a query range. 0 MEANS default behavior.</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Input
                              id="max-matches"
                              type="number"
                              value={maxMatches}
                              onChange={(e) => setMaxMatches(e.target.value)}
                              className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]"
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="compositional-adjustments" className="text-sm text-[#1E1E1E]">Compositional adjustments</Label>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                                  <p>Matrix adjustment method to compensate for amino acid composition of sequences</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Select value={compositionalAdjustments} onValueChange={setCompositionalAdjustments}>
                              <SelectTrigger id="compositional-adjustments" className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="conditional">Conditional compositional score matrix adjustment</SelectItem>
                                <SelectItem value="always">Composition-based statistics</SelectItem>
                                <SelectItem value="never">No composition-based statistics</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="low-complexity-filter" className="text-sm text-[#1E1E1E]">Filter Low complexity regions</Label>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                                  <p>Filter regions of low compositional complexity</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Select value={lowComplexityFilter ? 'true' : 'false'} onValueChange={(v) => setLowComplexityFilter(v === 'true')}>
                              <SelectTrigger id="low-complexity-filter" className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">Yes</SelectItem>
                                <SelectItem value="false">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="mask-lookup" className="text-sm text-[#1E1E1E]">Mask for lookup table only</Label>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                                  <p>Mask regions only for purposes of constructing the lookup table</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Select value={maskLookup ? 'true' : 'false'} onValueChange={(v) => setMaskLookup(v === 'true')}>
                              <SelectTrigger id="mask-lookup" className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">Yes</SelectItem>
                                <SelectItem value="false">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="mask-lower-case" className="text-sm text-[#1E1E1E]">Mask lower case letters</Label>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="h-4 w-4 text-[#757575] cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs bg-[#1E1E1E] text-white">
                                  <p>Mask off segments of the query sequence that are in lowercase</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <Select value={maskLowerCase ? 'true' : 'false'} onValueChange={(v) => setMaskLowerCase(v === 'true')}>
                              <SelectTrigger id="mask-lower-case" className="border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="true">Yes</SelectItem>
                                <SelectItem value="false">No</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1 border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
                  size="lg"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reiniciar Formulario
                </Button>
                <Button
                  onClick={handleStartBlast}
                  disabled={!sequence.trim()}
                  className="flex-1 bg-[#FC10C3] hover:bg-[#E010B3] text-white disabled:bg-[#E0E0E0] disabled:text-[#BDBDBD]"
                  size="lg"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Ejecutar Búsqueda BLAST
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}