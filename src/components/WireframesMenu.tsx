import { Dna, Home, FileText, Search, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface WireframesMenuProps {
  onViewWireframe: (wireframeId: number) => void;
  onGoHome: () => void;
}

export function WireframesMenu({ onViewWireframe, onGoHome }: WireframesMenuProps) {
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
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-[#1E1E1E] mb-4">Wireframe Gallery</h2>
          <p className="text-lg text-[#757575] max-w-3xl mx-auto leading-relaxed">
            Explore the visual design references for the BLAST application. Each wireframe demonstrates
            the layout, components, and styling following the NCBI BLAST design language.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Wireframe 1 - Homepage */}
          <Card
            className="bg-white border-[#E0E0E0] shadow-sm hover:shadow-lg hover:border-[#21D7FF] transition-all cursor-pointer group"
            onClick={() => onViewWireframe(1)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-gradient-to-br from-[#21D7FF] to-[#704BFF] p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl text-[#1E1E1E]">Homepage Wireframe</CardTitle>
              <CardDescription className="text-[#757575]">
                /wireframe/1
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#757575] leading-relaxed mb-4">
                Main landing page featuring BLAST program selection cards, NUCCORE database access button,
                and getting started information. Includes hero section and program descriptions.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#757575] bg-[#F5F5F5] px-2 py-1 rounded">
                  home.html
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Wireframe 2 - Search Form */}
          <Card
            className="bg-white border-[#E0E0E0] shadow-sm hover:shadow-lg hover:border-[#FC10C3] transition-all cursor-pointer group"
            onClick={() => onViewWireframe(2)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-gradient-to-br from-[#C920FF] to-[#FC10C3] p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <Search className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl text-[#1E1E1E]">Search Form Wireframe</CardTitle>
              <CardDescription className="text-[#757575]">
                /wireframe/2
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#757575] leading-relaxed mb-4">
                BLAST search interface with sidebar featuring search modes, contextual help, and recent searches.
                Main form includes query input, database selection, and collapsible advanced parameters.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#757575] bg-[#F5F5F5] px-2 py-1 rounded">
                  blast-search.html
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Wireframe 3 - Results Page */}
          <Card
            className="bg-white border-[#E0E0E0] shadow-sm hover:shadow-lg hover:border-[#704BFF] transition-all cursor-pointer group"
            onClick={() => onViewWireframe(3)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-gradient-to-br from-[#704BFF] to-[#9D4BFF] p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl text-[#1E1E1E]">Results Page Wireframe</CardTitle>
              <CardDescription className="text-[#757575]">
                /wireframe/3
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#757575] leading-relaxed mb-4">
                Search results page with tabbed interface (Descriptions, Graphic View, Alignments, Taxonomy).
                Features alignment visualization bars, score badges, filters, and export options.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#757575] bg-[#F5F5F5] px-2 py-1 rounded">
                  blast-results.html
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-6">
          <h3 className="text-lg text-[#1E1E1E] mb-3">Design System</h3>
          <div className="space-y-2 text-sm text-[#757575] leading-relaxed">
            <p>
              <span className="text-[#FC10C3]">•</span> <strong className="text-[#1E1E1E]">Color Palette:</strong> Neutral background (#f5f5f5),
              white cards, subtle borders (#e0e0e0), and gradient accents (#21D7FF → #704BFF → #FC10C3).
            </p>
            <p>
              <span className="text-[#FC10C3]">•</span> <strong className="text-[#1E1E1E]">Typography:</strong> Clean, readable fonts
              (Arial, Helvetica, sans-serif) with clear hierarchy and consistent sizing.
            </p>
            <p>
              <span className="text-[#FC10C3]">•</span> <strong className="text-[#1E1E1E]">Shadows:</strong> Subtle elevation using
              box-shadow: 0 1px 3px rgba(0,0,0,0.05) for cards and interactive elements.
            </p>
            <p>
              <span className="text-[#FC10C3]">•</span> <strong className="text-[#1E1E1E]">Layout:</strong> Responsive grid system,
              max-width containers (1400px), and consistent spacing using rem units.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
