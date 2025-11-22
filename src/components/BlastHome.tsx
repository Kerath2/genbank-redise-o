import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dna, Pill, ArrowRight, Lock, Database } from 'lucide-react';

interface BlastHomeProps {
  onSelectBlast: (type: 'nucleotide' | 'protein') => void;
  onGoToNuccore?: () => void;
}

export function BlastHome({ onSelectBlast, onGoToNuccore }: BlastHomeProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white border-b border-[#E0E0E0]">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-[#21D7FF] via-[#704BFF] to-[#FC10C3] p-2.5 rounded-lg">
                <Dna className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl text-[#1E1E1E]">BLAST</h1>
                <p className="text-sm text-[#757575]">Basic Local Alignment Search Tool</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {onGoToNuccore && (
                <button
                  onClick={onGoToNuccore}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E0E0E0] hover:border-[#FC10C3] rounded-lg transition-colors group"
                >
                  <Database className="h-4 w-4 text-[#757575] group-hover:text-[#FC10C3]" />
                  <span className="text-sm text-[#757575] group-hover:text-[#FC10C3]">NUCCORE Database</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl text-[#1E1E1E] mb-4">
            Basic Local Alignment Search Tool
          </h2>
          <p className="text-lg text-[#757575] max-w-3xl mx-auto leading-relaxed">
            BLAST finds regions of similarity between biological sequences. The program compares 
            nucleotide or protein sequences to sequence databases and calculates the statistical significance.
          </p>
        </div>

        {/* BLAST Type Selection */}
        <div className="mb-12">
          <h3 className="text-xl text-[#1E1E1E] mb-6">Select BLAST Program</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Nucleotide BLAST */}
            <Card 
              className="bg-white border-[#E0E0E0] shadow-sm hover:shadow-lg hover:border-[#21D7FF] transition-all cursor-pointer group"
              onClick={() => onSelectBlast('nucleotide')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-gradient-to-br from-[#21D7FF] to-[#704BFF] p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Dna className="h-8 w-8 text-white" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#21D7FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardTitle className="text-xl text-[#1E1E1E]">Nucleotide BLAST</CardTitle>
                <CardDescription className="text-[#757575]">
                  nucleotide → nucleotide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#757575] leading-relaxed mb-4">
                  Search nucleotide databases using a nucleotide query. Compare DNA or RNA sequences 
                  to identify similar sequences in the database.
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#E8F5E9] text-[#2E7D32] border-[#81C784]">
                    Available
                  </Badge>
                  <span className="text-xs text-[#757575]">BLASTN</span>
                </div>
              </CardContent>
            </Card>

            {/* Protein BLAST */}
            <Card 
              className="bg-white border-[#E0E0E0] shadow-sm hover:shadow-lg hover:border-[#FC10C3] transition-all cursor-pointer group"
              onClick={() => onSelectBlast('protein')}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-gradient-to-br from-[#C920FF] to-[#FC10C3] p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Pill className="h-8 w-8 text-white" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#FC10C3] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardTitle className="text-xl text-[#1E1E1E]">Protein BLAST</CardTitle>
                <CardDescription className="text-[#757575]">
                  protein → protein
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#757575] leading-relaxed mb-4">
                  Search protein databases using a protein query. Compare amino acid sequences 
                  to find homologs and conserved protein domains.
                </p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#E8F5E9] text-[#2E7D32] border-[#81C784]">
                    Available
                  </Badge>
                  <span className="text-xs text-[#757575]">BLASTP</span>
                </div>
              </CardContent>
            </Card>

            {/* blastx - Disabled */}
            <Card className="bg-[#FAFAFA] border-[#E0E0E0] shadow-sm opacity-60 cursor-not-allowed">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-[#E0E0E0] p-3 rounded-lg">
                    <Dna className="h-8 w-8 text-[#BDBDBD]" />
                  </div>
                  <Lock className="h-5 w-5 text-[#BDBDBD]" />
                </div>
                <CardTitle className="text-xl text-[#BDBDBD]">blastx</CardTitle>
                <CardDescription className="text-[#BDBDBD]">
                  translated nucleotide → protein
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#BDBDBD] leading-relaxed mb-4">
                  Search protein databases using a translated nucleotide query. Useful for finding 
                  protein-coding regions in nucleotide sequences.
                </p>
                <Badge className="bg-[#E0E0E0] text-[#BDBDBD] border-[#BDBDBD]">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>

            {/* tblastn - Disabled */}
            <Card className="bg-[#FAFAFA] border-[#E0E0E0] shadow-sm opacity-60 cursor-not-allowed">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-[#E0E0E0] p-3 rounded-lg">
                    <Pill className="h-8 w-8 text-[#BDBDBD]" />
                  </div>
                  <Lock className="h-5 w-5 text-[#BDBDBD]" />
                </div>
                <CardTitle className="text-xl text-[#BDBDBD]">tblastn</CardTitle>
                <CardDescription className="text-[#BDBDBD]">
                  protein → translated nucleotide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#BDBDBD] leading-relaxed mb-4">
                  Search translated nucleotide databases using a protein query. Find potential 
                  protein-coding regions in genomic sequences.
                </p>
                <Badge className="bg-[#E0E0E0] text-[#BDBDBD] border-[#BDBDBD]">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>

            {/* tblastx - Disabled */}
            <Card className="bg-[#FAFAFA] border-[#E0E0E0] shadow-sm opacity-60 cursor-not-allowed">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-[#E0E0E0] p-3 rounded-lg">
                    <Dna className="h-8 w-8 text-[#BDBDBD]" />
                  </div>
                  <Lock className="h-5 w-5 text-[#BDBDBD]" />
                </div>
                <CardTitle className="text-xl text-[#BDBDBD]">tblastx</CardTitle>
                <CardDescription className="text-[#BDBDBD]">
                  translated nucleotide → translated nucleotide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#BDBDBD] leading-relaxed mb-4">
                  Search translated nucleotide databases using a translated nucleotide query. 
                  Compare coding regions across different species.
                </p>
                <Badge className="bg-[#E0E0E0] text-[#BDBDBD] border-[#BDBDBD]">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>

            {/* PSI-BLAST - Disabled */}
            <Card className="bg-[#FAFAFA] border-[#E0E0E0] shadow-sm opacity-60 cursor-not-allowed">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-[#E0E0E0] p-3 rounded-lg">
                    <Pill className="h-8 w-8 text-[#BDBDBD]" />
                  </div>
                  <Lock className="h-5 w-5 text-[#BDBDBD]" />
                </div>
                <CardTitle className="text-xl text-[#BDBDBD]">PSI-BLAST</CardTitle>
                <CardDescription className="text-[#BDBDBD]">
                  Position-Specific Iterated BLAST
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#BDBDBD] leading-relaxed mb-4">
                  Position-Specific Iterated BLAST. More sensitive searches for distant protein 
                  homologs using iterative profile construction.
                </p>
                <Badge className="bg-[#E0E0E0] text-[#BDBDBD] border-[#BDBDBD]">
                  Coming Soon
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 max-w-4xl mx-auto">
          <h4 className="text-lg text-[#1E1E1E] mb-3">Getting Started</h4>
          <div className="space-y-3 text-sm text-[#757575] leading-relaxed">
            <p>
              <span className="text-[#FC10C3]">•</span> <strong className="text-[#1E1E1E]">Nucleotide BLAST:</strong> Use this when 
              you have a DNA or RNA sequence and want to find similar nucleotide sequences in the database.
            </p>
            <p>
              <span className="text-[#FC10C3]">•</span> <strong className="text-[#1E1E1E]">Protein BLAST:</strong> Use this when 
              you have an amino acid sequence and want to find similar protein sequences or identify protein domains.
            </p>
            <p>
              <span className="text-[#FC10C3]">•</span> Each program provides specialized alignment algorithms optimized 
              for different types of biological sequences and search requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}