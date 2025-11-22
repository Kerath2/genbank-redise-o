import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Download,
  Share2,
  Copy,
  Check,
  HelpCircle,
  ExternalLink,
  FileText,
  Search,
  AlertCircle,
  Info,
  Dna,
  Home
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface NuccoreDetailProps {
  accession: string;
  onBack: () => void;
  onGoHome?: () => void;
}

export function NuccoreDetail({ accession, onBack, onGoHome }: NuccoreDetailProps) {
  // R15 - Secciones colapsables mejoradas
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['locus', 'definition', 'features', 'origin'])
  );
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [helpTopic, setHelpTopic] = useState<string>('');

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  // R17 - Copiar secuencias fácilmente
  const copyToClipboard = (text: string, section: string) => {
    // Limpiar el texto de números de línea y espacios extra
    const cleanText = text
      .split('\n')
      .map(line => line.replace(/^\s*\d+\s+/, '').trim())
      .filter(line => line.length > 0)
      .join('');

    navigator.clipboard.writeText(cleanText);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // R16 - Íconos de ayuda
  const showHelp = (topic: string) => {
    setHelpTopic(topic);
    setShowHelpDialog(true);
  };

  const helpContent: Record<string, { title: string; description: string }> = {
    locus: {
      title: 'LOCUS',
      description: 'The LOCUS line contains the accession number, sequence length, molecule type (DNA/RNA), topology (linear/circular), division code, and modification date.'
    },
    definition: {
      title: 'DEFINITION',
      description: 'A brief description of the sequence, including the organism and any relevant details about the sequenced region or gene.'
    },
    accession: {
      title: 'ACCESSION',
      description: 'A unique identifier assigned to this sequence record. This is the primary way to cite and retrieve this sequence.'
    },
    version: {
      title: 'VERSION',
      description: 'The accession number with version suffix. The version number increments when the sequence is updated.'
    },
    source: {
      title: 'SOURCE',
      description: 'The biological source of the sequence, including the organism name.'
    },
    organism: {
      title: 'ORGANISM',
      description: 'The scientific name of the organism and its taxonomic lineage.'
    },
    features: {
      title: 'FEATURES',
      description: 'Annotations about specific regions of the sequence, including genes, coding sequences (CDS), regulatory elements, and other biological features.'
    },
    cds: {
      title: 'CDS (Coding Sequence)',
      description: 'A region that codes for a protein. Includes information about the protein product and translation.'
    },
    mat_peptide: {
      title: 'mat_peptide (Mature Peptide)',
      description: 'The final protein product after post-translational processing and cleavage of signal peptides.'
    },
    origin: {
      title: 'ORIGIN',
      description: 'The actual nucleotide sequence. Numbers indicate the position in the sequence.'
    },
    bioproject: {
      title: 'BioProject',
      description: 'A collection of biological data related to a single initiative, such as a genome sequencing project.'
    },
    biosample: {
      title: 'BioSample',
      description: 'A description of the biological source material used to generate experimental data.'
    }
  };

  // Mock sequence data extendido
  const sequenceData = {
    locus: 'OF023917',
    length: '1435 bp',
    molType: 'RNA',
    topology: 'linear',
    division: 'PAT',
    modDate: '04-Aug-2021',
    definition: 'KR 1020200085238-A/10. Recombinant Influenza A virus and Vaccine Composition for H5 Serotype Influenza A virus belonging to clade 2.3.4.4B comprising the same',
    accession: 'OF023917.1',
    version: 'OF023917.1.3',
    keywords: 'OF023917.1;A/10.',
    source: 'Influenza A virus',
    organism: 'Influenza A virus',
    taxonomy: 'Viruses; Riboviria; Orthornavirae; Negarnaviricota; Polyploviricotina; Insthoviricetes; Articulavirales; Orthomyxoviridae; Alphainfluenzavirus',

    // R19 - Metadatos estructurados
    metadata: {
      isolate: 'A/H5N8/clade2.3.4.4B',
      country: 'South Korea',
      collection_date: '2020-06-15',
      host: 'Homo sapiens',
      tissue: 'respiratory tract',
      note: 'Vaccine strain candidate'
    },

    // R18 - Enlaces cruzados
    crossLinks: {
      protein: ['YP_009118626.1', 'YP_009118627.1'],
      gene: ['HA', 'NA'],
      pubmed: ['34567890', '34567891'],
      bioproject: 'PRJNA123456',
      biosample: 'SAMN12345678',
      sra: ['SRR123456', 'SRR123457']
    },

    references: [
      {
        number: 1,
        authors: 'Kim,Y., Lee,Y., Lee,Y.J., Kang,M., Choi,S., Kim,Y., Lee,Y., and Lee,M.',
        title: 'Recombinant Influenza A virus and Vaccine Composition for H5 Serotype Influenza A virus belonging to clade 2.3.4.4B comprising the same',
        journal: 'Patent: KR 1020200085238-A 10 14-JUL-2020',
        pubmed: 'REPUBLIC OF KOREA(Animal and Plant Quarantine Agency)',
      }
    ],
    comment: [
      'KR 1020200085238-A/10:',
      'AN  KR 1020200085238-A/10',
      'TI  2020-07-14',
      'PN  KR 1020200085238',
      'PD  2020-07-14',
      'OS  Influenza A virus'
    ],
    features: [
      {
        key: 'source',
        location: '1..1435',
        qualifiers: {
          organism: 'Influenza A virus',
          mol_type: 'unassigned RNA',
          db_xref: 'taxon:11320',
          isolate: 'A/H5N8/clade2.3.4.4B',
          country: 'South Korea',
          collection_date: '2020-06-15'
        }
      },
      {
        key: 'CDS',
        location: '1..1435',
        qualifiers: {
          gene: 'HA',
          product: 'hemagglutinin',
          protein_id: 'YP_009118626.1',
          translation: 'MKTIIALSYILCLVFAQKLP...'
        }
      }
    ],
    origin: `
        1 gaaaatggat tcaaatacat agtctactgt tcatttgcca caattggtgg accttagaag
       61 agtgatccct ctgagagtga atattggcat ctgatcactt gttacagatg agaaatggtg
      121 ggtttccttc tctggtgaga atttagtcat tttggggaat ggcataaagt ttctcatgca
      181 aatggaaaca tttctgacat atgagggggg ccataatcag ctactcaatt ccattgagag
      241 ggagaacaga ttttatggaa tggcaggggc aacttacatg ggggacgaag tcaaagacag
      301 gctcagggtg gataatactg acggcggcag gtgtatggct tgtggacatt ccattgccct
      361 agtatattca ccttgggatg gcgaatttca gcataagatc atggagggct tcagatgcat
      421 acctaagaga cgcaggatca gctatgcagc acaaacacca atccaaccaa aggagtatga
      481 caaaggagga acttaataaa attacccata gagtcccccc agaggtcatt tctggtccag
      541 ctagcaaatt aaaaaggatg aatgggaaca tgttagtcaa cataagggaa atgaaaccta
      601 caacatccag ctcaccgttg ggggaaccca gcaacctaga ttggatgcat tctcaccaag
      661 caacagatgg ctagatgcag gtgattaata cctgggccca gattgccaga gacctatcat
      721 agtatagaca gcgaactgac acgtaggaca ggagatagat atacacatag cggggggttg
      781 gtgggaacag acagcgacaa gaatcccatg aaggagacag gaccttgtta gtcacacaag
      841 ctcagaggaa accagaaaaa tcaatagtcc ggaaagcaca ccacagagag atgggtataa
      901 gtaccaataa atgaagaaag tagacagaga taacaacaac atcagtgcca ggtcacgggg
      961 ctagccataa aagtatccaa gatctatcag ccaactagat caggggctat cacataccca
     1021 gccatacggg caagggtcaa atgacttcgt cctccaacac atgattaaaa cagggtttgt
     1081 gactcagtta agccaagatc ctcccagcag aaaacgtata tggacagaga tagaactaac
     1141 caaagtagct gtcttgaatg gtttggttga agaacaaaac gagcctatag acccaaaaat
     1201 cttccgggat cagagggaga accaggagca gatcctagat gtgcttacca attatagtag
     1261 ctcaacaaac acatgtttta gtgttcgaga gcttagttgt tgtgtctcat ttaggatctt
     1321 gtggacttca ttaataaatg gttatggagg taaaggccta ggctgcaaaa gaagacaact
     1381 ctgttaagaa agacaaaaaa ctttacccaa tgagaggata caaaaa
`.trim()
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b border-[#E0E0E0] bg-white sticky top-0 z-10">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-[#0066CC] hover:text-[#FC10C3] hover:bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Results
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="nucleotide">
                <SelectTrigger className="w-[180px] border-[#E0E0E0] focus:border-[#FC10C3] focus:ring-[#FC10C3]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nucleotide">Nucleotide</SelectItem>
                  <SelectItem value="protein">Protein</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1" />
              <Button variant="outline" size="sm" className="border-[#E0E0E0] hover:border-[#FC10C3]">
                Advanced
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="col-span-9">
              <div className="mb-4">
                <h1 className="text-lg text-[#1E1E1E] mb-2">
                  {sequenceData.definition}
                </h1>
                <div className="text-sm text-[#757575]">
                  GenBank: <span className="text-[#FC10C3] font-mono">{sequenceData.accession}</span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  {/* R17 - Copiar fácilmente */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(sequenceData.origin, 'sequence')}
                        className="border-[#E0E0E0]"
                      >
                        {copiedSection === 'sequence' ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy Sequence
                          </>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Copy clean sequence without line numbers
                    </TooltipContent>
                  </Tooltip>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#E0E0E0]"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download FASTA
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#E0E0E0]"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              {/* R24 - Navegación por pestañas simplificada */}
              <Tabs defaultValue="genbank" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="genbank">
                    <FileText className="h-3 w-3 mr-1" />
                    GenBank
                  </TabsTrigger>
                  <TabsTrigger value="fasta">FASTA</TabsTrigger>
                  <TabsTrigger value="metadata">
                    <Info className="h-3 w-3 mr-1" />
                    Metadata
                  </TabsTrigger>
                  <TabsTrigger value="graphics">Graphics</TabsTrigger>
                </TabsList>

                {/* GenBank View */}
                <TabsContent value="genbank" className="space-y-4">
                  {/* R15 - Secciones colapsables mejoradas */}

                  {/* LOCUS Section */}
                  <Card className="border-[#E0E0E0]">
                    <CardHeader className="pb-3">
                      <button
                        onClick={() => toggleSection('locus')}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm font-mono">LOCUS</CardTitle>
                          {/* R16 - Ícono de ayuda */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showHelp('locus');
                                }}
                                className="text-[#757575] hover:text-[#FC10C3]"
                              >
                                <HelpCircle className="h-3 w-3" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Click for help about LOCUS</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        {expandedSections.has('locus') ? (
                          <ChevronDown className="h-4 w-4 text-[#757575]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#757575]" />
                        )}
                      </button>
                    </CardHeader>
                    {expandedSections.has('locus') && (
                      <CardContent className="font-mono text-xs">
                        <div className="flex items-start gap-4">
                          <span className="text-[#757575]">LOCUS</span>
                          <span>
                            {sequenceData.locus} {sequenceData.length} {sequenceData.molType}{' '}
                            {sequenceData.topology} {sequenceData.division} {sequenceData.modDate}
                          </span>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* DEFINITION Section */}
                  <Card className="border-[#E0E0E0]">
                    <CardHeader className="pb-3">
                      <button
                        onClick={() => toggleSection('definition')}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm font-mono">DEFINITION</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showHelp('definition');
                                }}
                                className="text-[#757575] hover:text-[#FC10C3]"
                              >
                                <HelpCircle className="h-3 w-3" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Click for help about DEFINITION</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        {expandedSections.has('definition') ? (
                          <ChevronDown className="h-4 w-4 text-[#757575]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#757575]" />
                        )}
                      </button>
                    </CardHeader>
                    {expandedSections.has('definition') && (
                      <CardContent className="font-mono text-xs">
                        <div className="flex items-start gap-4">
                          <span className="text-[#757575]">DEFINITION</span>
                          <span>{sequenceData.definition}</span>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* SOURCE & ORGANISM Section */}
                  <Card className="border-[#E0E0E0]">
                    <CardHeader className="pb-3">
                      <button
                        onClick={() => toggleSection('source')}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm font-mono">SOURCE & ORGANISM</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showHelp('organism');
                                }}
                                className="text-[#757575] hover:text-[#FC10C3]"
                              >
                                <HelpCircle className="h-3 w-3" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Click for help about ORGANISM</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        {expandedSections.has('source') ? (
                          <ChevronDown className="h-4 w-4 text-[#757575]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#757575]" />
                        )}
                      </button>
                    </CardHeader>
                    {expandedSections.has('source') && (
                      <CardContent className="font-mono text-xs space-y-2">
                        <div className="flex items-start gap-4">
                          <span className="text-[#757575] w-20">SOURCE</span>
                          <span>{sequenceData.source}</span>
                        </div>
                        <div className="flex items-start gap-4">
                          <span className="text-[#757575] w-20">ORGANISM</span>
                          <div>
                            <div className="italic mb-1">{sequenceData.organism}</div>
                            <div className="text-[#757575]">{sequenceData.taxonomy}</div>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* R19 - Metadatos estructurados como tabla */}
                  <Card className="border-[#E0E0E0]">
                    <CardHeader className="pb-3">
                      <button
                        onClick={() => toggleSection('metadata')}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <CardTitle className="text-sm">Sample Metadata</CardTitle>
                        {expandedSections.has('metadata') ? (
                          <ChevronDown className="h-4 w-4 text-[#757575]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#757575]" />
                        )}
                      </button>
                    </CardHeader>
                    {expandedSections.has('metadata') && (
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/3">Field</TableHead>
                              <TableHead>Value</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Object.entries(sequenceData.metadata).map(([key, value]) => (
                              <TableRow key={key}>
                                <TableCell className="font-medium text-xs">{key}</TableCell>
                                <TableCell className="text-xs">{value}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    )}
                  </Card>

                  {/* FEATURES Section */}
                  <Card className="border-[#E0E0E0]">
                    <CardHeader className="pb-3">
                      <button
                        onClick={() => toggleSection('features')}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm font-mono">FEATURES</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showHelp('features');
                                }}
                                className="text-[#757575] hover:text-[#FC10C3]"
                              >
                                <HelpCircle className="h-3 w-3" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Click for help about FEATURES</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        {expandedSections.has('features') ? (
                          <ChevronDown className="h-4 w-4 text-[#757575]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#757575]" />
                        )}
                      </button>
                    </CardHeader>
                    {expandedSections.has('features') && (
                      <CardContent className="font-mono text-xs">
                        <div className="space-y-4">
                          <div className="flex items-start gap-4 text-[#757575]">
                            <span className="w-20">FEATURES</span>
                            <span>Location/Qualifiers</span>
                          </div>
                          {sequenceData.features.map((feature, idx) => (
                            <div key={idx} className="border-l-2 border-[#E0E0E0] pl-4 space-y-1">
                              <div className="flex items-start gap-4">
                                <Badge variant="outline" className="text-[10px] font-mono">
                                  {feature.key}
                                </Badge>
                                <span>{feature.location}</span>
                              </div>
                              <div className="ml-4 space-y-1">
                                {Object.entries(feature.qualifiers).map(([key, value]) => (
                                  <div key={key} className="text-[#757575]">
                                    /{key}="{value}"
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    )}
                  </Card>

                  {/* ORIGIN Section */}
                  <Card className="border-[#E0E0E0]">
                    <CardHeader className="pb-3">
                      <button
                        onClick={() => toggleSection('origin')}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-sm font-mono">ORIGIN</CardTitle>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showHelp('origin');
                                }}
                                className="text-[#757575] hover:text-[#FC10C3]"
                              >
                                <HelpCircle className="h-3 w-3" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Click for help about ORIGIN</p>
                            </TooltipContent>
                          </Tooltip>

                          {/* R17 - Botón copiar */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 ml-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(sequenceData.origin, 'origin');
                            }}
                          >
                            {copiedSection === 'origin' ? (
                              <>
                                <Check className="h-3 w-3 mr-1" />
                                <span className="text-xs">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 mr-1" />
                                <span className="text-xs">Copy</span>
                              </>
                            )}
                          </Button>
                        </div>
                        {expandedSections.has('origin') ? (
                          <ChevronDown className="h-4 w-4 text-[#757575]" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-[#757575]" />
                        )}
                      </button>
                    </CardHeader>
                    {expandedSections.has('origin') && (
                      <CardContent>
                        <div className="bg-[#F5F5F5] p-4 rounded font-mono text-[10px] leading-relaxed overflow-x-auto">
                          <pre className="whitespace-pre">{sequenceData.origin}</pre>
                        </div>
                        <p className="text-xs text-[#757575] mt-2">
                          Sequence displayed with line numbers. Use "Copy" button above to get clean sequence.
                        </p>
                      </CardContent>
                    )}
                  </Card>
                </TabsContent>

                {/* FASTA View */}
                <TabsContent value="fasta">
                  <Card className="border-[#E0E0E0]">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">FASTA Format</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(
                            `>${sequenceData.accession} ${sequenceData.definition}\n${sequenceData.origin}`,
                            'fasta'
                          )}
                        >
                          {copiedSection === 'fasta' ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-[#F5F5F5] p-4 rounded font-mono text-xs overflow-x-auto">
                        <div className="text-blue-600">&gt;{sequenceData.accession} {sequenceData.definition}</div>
                        <pre className="whitespace-pre-wrap mt-2">
                          {sequenceData.origin.split('\n').map(line =>
                            line.replace(/^\s*\d+\s+/, '').trim()
                          ).join('').match(/.{1,60}/g)?.join('\n')}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Metadata View - R19 */}
                <TabsContent value="metadata">
                  <Card className="border-[#E0E0E0]">
                    <CardHeader>
                      <CardTitle className="text-sm">Structured Metadata</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-sm mb-2">Sample Information</h3>
                          <Table>
                            <TableBody>
                              {Object.entries(sequenceData.metadata).map(([key, value]) => (
                                <TableRow key={key}>
                                  <TableCell className="font-medium text-xs capitalize">
                                    {key.replace('_', ' ')}
                                  </TableCell>
                                  <TableCell className="text-xs">{value}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        {/* R18 - Enlaces cruzados */}
                        <div>
                          <h3 className="font-semibold text-sm mb-2">Cross-References</h3>
                          <div className="space-y-3">
                            {sequenceData.crossLinks.protein.length > 0 && (
                              <div>
                                <h4 className="text-xs font-medium text-[#757575] mb-1">Related Proteins</h4>
                                {sequenceData.crossLinks.protein.map(id => (
                                  <a
                                    key={id}
                                    href="#"
                                    className="block text-xs text-[#0066CC] hover:underline"
                                  >
                                    <ExternalLink className="h-3 w-3 inline mr-1" />
                                    {id}
                                  </a>
                                ))}
                              </div>
                            )}

                            {sequenceData.crossLinks.gene.length > 0 && (
                              <div>
                                <h4 className="text-xs font-medium text-[#757575] mb-1">Related Genes</h4>
                                {sequenceData.crossLinks.gene.map(gene => (
                                  <a
                                    key={gene}
                                    href="#"
                                    className="block text-xs text-[#0066CC] hover:underline"
                                  >
                                    <ExternalLink className="h-3 w-3 inline mr-1" />
                                    {gene}
                                  </a>
                                ))}
                              </div>
                            )}

                            {sequenceData.crossLinks.pubmed.length > 0 && (
                              <div>
                                <h4 className="text-xs font-medium text-[#757575] mb-1">PubMed Articles</h4>
                                {sequenceData.crossLinks.pubmed.map(pmid => (
                                  <a
                                    key={pmid}
                                    href="#"
                                    className="block text-xs text-[#0066CC] hover:underline"
                                  >
                                    <ExternalLink className="h-3 w-3 inline mr-1" />
                                    PMID: {pmid}
                                  </a>
                                ))}
                              </div>
                            )}

                            <div>
                              <h4 className="text-xs font-medium text-[#757575] mb-1">External Databases</h4>
                              <div className="space-y-1">
                                <a href="#" className="block text-xs text-[#0066CC] hover:underline">
                                  <ExternalLink className="h-3 w-3 inline mr-1" />
                                  BioProject: {sequenceData.crossLinks.bioproject}
                                </a>
                                <a href="#" className="block text-xs text-[#0066CC] hover:underline">
                                  <ExternalLink className="h-3 w-3 inline mr-1" />
                                  BioSample: {sequenceData.crossLinks.biosample}
                                </a>
                                {sequenceData.crossLinks.sra.map(sra => (
                                  <a
                                    key={sra}
                                    href="#"
                                    className="block text-xs text-[#0066CC] hover:underline"
                                  >
                                    <ExternalLink className="h-3 w-3 inline mr-1" />
                                    SRA: {sra}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Graphics View - R20 Placeholder */}
                <TabsContent value="graphics">
                  <Card className="border-[#E0E0E0]">
                    <CardHeader>
                      <CardTitle className="text-sm">Sequence Graphics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-100 p-8 rounded text-center">
                        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-[#757575]">
                          Graphical view of sequence features and alignments
                        </p>
                        <p className="text-xs text-[#757575] mt-2">
                          This feature would show a visual representation of the sequence with annotations
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-3 space-y-4">
              {/* Change region shown */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Change region shown</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full border-[#E0E0E0] hover:border-[#FC10C3]">
                    Customize view
                  </Button>
                </CardContent>
              </Card>

              {/* R18 - Analyze this sequence */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Analyze this sequence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="link"
                    className="text-[#0066CC] hover:text-[#FC10C3] p-0 h-auto text-xs justify-start w-full"
                  >
                    <Search className="h-3 w-3 mr-2" />
                    Run BLAST
                  </Button>
                  <Button
                    variant="link"
                    className="text-[#0066CC] hover:text-[#FC10C3] p-0 h-auto text-xs justify-start w-full"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Pick Primers
                  </Button>
                  <Button
                    variant="link"
                    className="text-[#0066CC] hover:text-[#FC10C3] p-0 h-auto text-xs justify-start w-full"
                  >
                    <Search className="h-3 w-3 mr-2" />
                    Find in this Sequence
                  </Button>
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

              {/* Related Information */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Related Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant="link"
                    className="text-[#0066CC] hover:text-[#FC10C3] p-0 h-auto text-xs justify-start w-full"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Taxonomy
                  </Button>
                  <Button
                    variant="link"
                    className="text-[#0066CC] hover:text-[#FC10C3] p-0 h-auto text-xs justify-start w-full"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    BioProject: {sequenceData.crossLinks.bioproject}
                  </Button>
                  <Button
                    variant="link"
                    className="text-[#0066CC] hover:text-[#FC10C3] p-0 h-auto text-xs justify-start w-full"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    BioSample: {sequenceData.crossLinks.biosample}
                  </Button>
                </CardContent>
              </Card>

              {/* Recent activity */}
              <Card className="border-[#E0E0E0]">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm">Recent activity</CardTitle>
                  <Button variant="link" className="text-[#0066CC] hover:text-[#FC10C3] p-0 h-auto text-xs">
                    Turn Off
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div>
                    <a href="#" className="text-[#0066CC] hover:underline">
                      KR 1020200085238-A/10: Recombinant Influenza A virus...
                    </a>
                    <div className="text-[#757575] text-[10px]">Nucleotide</div>
                  </div>
                  <div>
                    <a href="#" className="text-[#0066CC] hover:underline">
                      Influenza A virus (1450742)
                    </a>
                    <div className="text-[#757575] text-[10px]">Nucleotide</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* R16 - Dialog de ayuda */}
        <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{helpContent[helpTopic]?.title || 'Help'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <p className="text-sm text-[#757575]">
                {helpContent[helpTopic]?.description || 'No help available for this topic.'}
              </p>
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <h4 className="font-semibold text-xs mb-2 flex items-center gap-2">
                  <Info className="h-3 w-3 text-blue-600" />
                  Additional Resources
                </h4>
                <ul className="text-xs space-y-1">
                  <li>
                    <a href="#" className="text-[#0066CC] hover:underline">
                      NCBI GenBank Format Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#0066CC] hover:underline">
                      Feature Table Definition
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#0066CC] hover:underline">
                      Sequence Submission Guidelines
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
