import React, { useState } from 'react';
import LanguageSelect from './components/LanguageSelect';
import RepoCard from './components/RepoCard';
import LoadingState from './components/LoadingState';
import { getRandomRepo } from './services/github';
import { Button } from './components/ui/button';
import { RefreshCw } from 'react-feather';
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFetchRepo = async () => {
    if (!selectedLanguage) return;
    
    setLoading(true);
    try {
      const repo = await getRandomRepo(selectedLanguage);
      setRepo(repo);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
      setRepo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen dark:bg-gray-900">
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-full max-w-lg mx-4">
            <h1 className="text-3xl font-medium text-center text-gray-800 dark:text-white mb-8">
              GitHub Random Repository Finder
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <LanguageSelect
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                  disabled={loading}
                />
              </div>
              <Button
                onClick={handleFetchRepo}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Find Repo'}
              </Button>
            </div>
            
            {loading ? (
              <LoadingState />
            ) : (
              repo && (
                <div className="mt-8">
                  <RepoCard repo={repo} />
                  <div className="mt-4 flex justify-center">
                    <Button
                      onClick={handleFetchRepo}
                      disabled={loading}
                      variant="outline"
                      className="w-full max-w-[200px]"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          Loading...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Refresh
                        </div>
                      )}
                    </Button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
