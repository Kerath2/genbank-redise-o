import { useState, useEffect } from 'react';
import { BlastHome } from './components/BlastHome';
import { BlastSearchForm } from './components/BlastSearchForm';
import { BlastSearchStatus } from './components/BlastSearchStatus';
import { BlastResults } from './components/BlastResults';
import { NuccoreSearch } from './components/NuccoreSearch';
import { NuccoreDetail } from './components/NuccoreDetail';
import { ComponentsDocumentation } from './components/ComponentsDocumentation';

type ViewState = 'home' | 'form' | 'searching' | 'results' | 'nuccore' | 'nuccore-detail' | 'components';

export default function App() {
  const getInitialView = (): ViewState => {
    const path = window.location.pathname;
    if (path === '/components') return 'components';
    return 'home';
  };

  const [currentView, setCurrentView] = useState<ViewState>(getInitialView);
  const [searchData, setSearchData] = useState<any>(null);
  const [blastType, setBlastType] = useState<'nucleotide' | 'protein'>('protein');
  const [selectedAccession, setSelectedAccession] = useState<string>('');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/components') {
        setCurrentView('components');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: ViewState, path: string) => {
    window.history.pushState({}, '', path);
    setCurrentView(view);
  };

  const handleSelectBlast = (type: 'nucleotide' | 'protein') => {
    setBlastType(type);
    setCurrentView('form');
  };

  const handleStartSearch = (data: any) => {
    setSearchData(data);
    setCurrentView('searching');
    
    // Simulate search completion
    setTimeout(() => {
      setCurrentView('results');
    }, 3000);
  };

  const handleNewSearch = () => {
    window.history.pushState({}, '', '/');
    setCurrentView('home');
    setSearchData(null);
  };

  const handleCancelSearch = () => {
    setCurrentView('form');
  };

  const handleEditSearch = () => {
    setCurrentView('form');
  };

  const handleGoToNuccore = () => {
    setCurrentView('nuccore');
  };

  const handleViewNuccoreDetail = (accession: string) => {
    setSelectedAccession(accession);
    setCurrentView('nuccore-detail');
  };

  const handleBackToNuccore = () => {
    setCurrentView('nuccore');
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      {currentView === 'home' && (
        <BlastHome
          onSelectBlast={handleSelectBlast}
          onGoToNuccore={handleGoToNuccore}
        />
      )}
      {currentView === 'form' && (
        <BlastSearchForm
          onStartSearch={handleStartSearch}
          initialTab={blastType}
          onGoHome={handleNewSearch}
        />
      )}
      {currentView === 'searching' && (
        <BlastSearchStatus
          searchData={searchData}
          onCancel={handleCancelSearch}
          onNewSearch={handleNewSearch}
        />
      )}
      {currentView === 'results' && (
        <BlastResults
          searchData={searchData}
          onNewSearch={handleNewSearch}
          onEditSearch={handleEditSearch}
          onGoHome={handleNewSearch}
        />
      )}
      {currentView === 'nuccore' && (
        <NuccoreSearch
          onViewDetail={handleViewNuccoreDetail}
          onGoHome={handleNewSearch}
        />
      )}
      {currentView === 'nuccore-detail' && (
        <NuccoreDetail
          accession={selectedAccession}
          onBack={handleBackToNuccore}
          onGoHome={handleNewSearch}
        />
      )}
      {currentView === 'components' && (
        <ComponentsDocumentation
          onGoHome={handleNewSearch}
        />
      )}
    </div>
  );
}