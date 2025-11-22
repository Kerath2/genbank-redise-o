import { useState } from 'react';
import { Dna, Home } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface WireframesViewProps {
  onGoHome: () => void;
}

export function WireframesView({ onGoHome }: WireframesViewProps) {
  const [activeTab, setActiveTab] = useState('home');

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
                <h1 className="text-2xl text-[#1E1E1E]">BLAST Wireframes</h1>
                <p className="text-sm text-[#757575]">Visual Design References</p>
              </div>
            </div>
            <button
              onClick={onGoHome}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E0E0E0] hover:border-[#FC10C3] rounded-lg transition-colors group"
            >
              <div className="bg-gradient-to-br from-[#21D7FF] via-[#704BFF] to-[#FC10C3] p-1.5 rounded">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm text-[#757575] group-hover:text-[#FC10C3]">BLAST Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="home">Homepage</TabsTrigger>
            <TabsTrigger value="search">Search Form</TabsTrigger>
            <TabsTrigger value="results">Results Page</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-0">
            <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 shadow-sm">
              <iframe
                src="/wireframes/home.html"
                className="w-full h-[calc(100vh-250px)] border-0"
                title="Homepage Wireframe"
              />
            </div>
          </TabsContent>

          <TabsContent value="search" className="mt-0">
            <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 shadow-sm">
              <iframe
                src="/wireframes/blast-search.html"
                className="w-full h-[calc(100vh-250px)] border-0"
                title="Search Form Wireframe"
              />
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-0">
            <div className="bg-white border border-[#E0E0E0] rounded-lg p-4 shadow-sm">
              <iframe
                src="/wireframes/blast-results.html"
                className="w-full h-[calc(100vh-250px)] border-0"
                title="Results Page Wireframe"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Panel */}
        <div className="mt-6 bg-white border border-[#E0E0E0] rounded-lg p-6">
          <h3 className="text-lg text-[#1E1E1E] mb-3">About These Wireframes</h3>
          <div className="space-y-2 text-sm text-[#757575] leading-relaxed">
            <p>
              <span className="text-[#FC10C3]">•</span> <strong className="text-[#1E1E1E]">Homepage:</strong> Main landing page with BLAST program selection cards, NUCCORE database access, and getting started information.
            </p>
            <p>
              <span className="text-[#FC10C3]">•</span> <strong className="text-[#1E1E1E]">Search Form:</strong> BLAST search interface with sidebar filters, query input, database selection, and advanced parameters.
            </p>
            <p>
              <span className="text-[#FC10C3]">•</span> <strong className="text-[#1E1E1E]">Results Page:</strong> Search results with tabbed views, alignment visualizations, score badges, and export options.
            </p>
            <p className="pt-2 border-t border-[#E0E0E0] mt-4">
              These wireframes follow the NCBI BLAST visual style with neutral colors (#f5f5f5 background), white cards, subtle shadows, and clean typography.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
