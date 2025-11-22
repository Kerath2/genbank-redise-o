import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Loader2, 
  Clock, 
  Calendar, 
  Database, 
  Cpu, 
  FileText,
  XCircle,
  Plus,
  ArrowLeft
} from 'lucide-react';

interface BlastSearchStatusProps {
  searchData: any;
  onCancel: () => void;
  onNewSearch: () => void;
}

export function BlastSearchStatus({ searchData, onCancel, onNewSearch }: BlastSearchStatusProps) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      setProgress(prev => Math.min(prev + 2.5, 95));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentDate = new Date();
  const submittedDate = new Date(currentDate.getTime() - elapsedTime * 1000);

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const requestId = 'BLAST' + Math.random().toString(36).substring(2, 11).toUpperCase();

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white border-b border-[#E0E0E0]">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <Button 
            variant="ghost" 
            onClick={onCancel}
            className="mb-4 text-[#757575] hover:text-[#FC10C3] -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-[#21D7FF] via-[#704BFF] to-[#FC10C3] p-3 rounded-lg">
              <Loader2 className="h-7 w-7 text-white animate-spin" />
            </div>
            <div>
              <h1 className="text-2xl text-[#1E1E1E] mb-2">BLAST Search In Progress</h1>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-[#F5F5F5] text-[#757575] border-[#E0E0E0]">
                  Request ID: {requestId}
                </Badge>
                <Badge variant="secondary" className="bg-[#F5F5F5] text-[#757575] border-[#E0E0E0]">
                  {searchData?.type === 'protein' ? 'BLASTP' : 'BLASTN'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Search Info Card */}
          <Card className="bg-white border-[#E0E0E0] shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-[#FC10C3]" />
                  <h2 className="text-lg text-[#1E1E1E]">{searchData?.searchTitle || 'Untitled Search'}</h2>
                </div>
                <p className="text-sm text-[#757575]">
                  Your sequence is being compared against the {searchData?.database || 'selected'} database
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#F5F5F5] rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#757575] mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">Submitted</span>
                  </div>
                  <p className="text-sm text-[#1E1E1E]">{formatDate(submittedDate)}</p>
                </div>

                <div className="bg-[#F5F5F5] rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#757575] mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">Time Elapsed</span>
                  </div>
                  <p className="text-sm text-[#1E1E1E]">{formatTime(elapsedTime)}</p>
                </div>

                <div className="bg-[#F5F5F5] rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#757575] mb-2">
                    <Database className="h-4 w-4" />
                    <span className="text-xs">Database</span>
                  </div>
                  <p className="text-sm text-[#1E1E1E] capitalize">{searchData?.database || 'ClusteredNR'}</p>
                </div>

                <div className="bg-[#F5F5F5] rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#757575] mb-2">
                    <Cpu className="h-4 w-4" />
                    <span className="text-xs">Algorithm</span>
                  </div>
                  <p className="text-sm text-[#1E1E1E] uppercase">{searchData?.algorithm || 'BLASTP'}</p>
                </div>

                <div className="bg-[#F5F5F5] rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#757575] mb-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-xs">Sequence Length</span>
                  </div>
                  <p className="text-sm text-[#1E1E1E]">
                    {searchData?.sequence?.replace(/\s/g, '').length || 87} {searchData?.type === 'protein' ? 'aa' : 'bp'}
                  </p>
                </div>

                <div className="bg-[#F5F5F5] rounded-lg p-4">
                  <div className="flex items-center gap-2 text-[#757575] mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">Current Time</span>
                  </div>
                  <p className="text-sm text-[#1E1E1E]">{formatDate(currentDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Card */}
          <Card className="bg-white border-[#E0E0E0] shadow-sm">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-[#21D7FF] via-[#704BFF] to-[#FC10C3] p-8 rounded-full shadow-lg">
                    <Loader2 className="h-16 w-16 text-white animate-spin" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl text-[#1E1E1E] mb-2">
                    Analyzing your {searchData?.type === 'protein' ? 'protein' : 'nucleotide'} sequence...
                  </h3>
                  <p className="text-[#757575]">
                    Searching for homologous sequences and conserved regions
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <Progress value={progress} className="h-3" />
                  <p className="text-sm text-[#757575]">
                    {progress < 30 && 'Initializing search parameters...'}
                    {progress >= 30 && progress < 60 && 'Querying database...'}
                    {progress >= 60 && progress < 85 && 'Comparing sequences...'}
                    {progress >= 85 && 'Finalizing results...'}
                  </p>
                </div>

                <div className="bg-[#FFF4F9] border border-[#FC10C3]/20 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm">
                    <span className="text-[#FC10C3]">Estimated time:</span>{' '}
                    <span className="text-[#1E1E1E]">30-60 seconds</span>
                  </p>
                  <p className="text-xs text-[#757575] mt-1">
                    Actual time may vary based on sequence length and database size
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={onNewSearch}
              size="lg"
              className="gap-2 border-[#E0E0E0] hover:border-[#FC10C3] hover:text-[#FC10C3]"
            >
              <Plus className="h-4 w-4" />
              Start New Search
            </Button>

            <Button
              onClick={onCancel}
              size="lg"
              className="gap-2 bg-[#FC10C3] hover:bg-[#E010B3] text-white"
            >
              <XCircle className="h-4 w-4" />
              Cancel Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
