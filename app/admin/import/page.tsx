'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ImportResult {
  success: boolean;
  url: string;
  product?: {
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    sellingPrice: number;
    margin: number;
  };
  error?: string;
}

interface ImportSummary {
  total: number;
  succeeded: number;
  failed: number;
}

export default function AdminImportPage() {
  const [urls, setUrls] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [results, setResults] = useState<ImportResult[]>([]);
  const [summary, setSummary] = useState<ImportSummary | null>(null);

  const handleImport = async () => {
    // Parse URLs from textarea
    const urlList = urls
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    if (urlList.length === 0) {
      alert('Veuillez entrer au moins un lien');
      return;
    }

    // Validate URLs
    const invalidUrls = urlList.filter(url => !url.includes('aliexpress'));
    if (invalidUrls.length > 0) {
      alert(`Les liens suivants ne sont pas des liens AliExpress:\n${invalidUrls.join('\n')}`);
      return;
    }

    setIsImporting(true);
    setResults([]);
    setSummary(null);

    try {
      const response = await fetch('/api/admin/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlList }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de l\'importation');
      }

      const data = await response.json();
      setResults(data.results);
      setSummary(data.summary);
    } catch (error) {
      console.error('Import error:', error);
      alert(error instanceof Error ? error.message : 'Erreur lors de l\'importation');
    } finally {
      setIsImporting(false);
    }
  };

  const getStatusIcon = (result: ImportResult) => {
    if (result.success) {
      return <span className="text-2xl">✅</span>;
    }
    return <span className="text-2xl">❌</span>;
  };

  const getStatusText = (result: ImportResult) => {
    if (result.success && result.product) {
      return (
        <div className="flex-1">
          <p className="font-medium text-gray-900">{result.product.name}</p>
          <p className="text-sm text-gray-600">
            {result.product.basePrice.toFixed(2)}€ → {result.product.sellingPrice.toFixed(2)}€
            <span className="ml-2 text-green-600 font-medium">
              (+{result.product.margin.toFixed(1)}% marge)
            </span>
          </p>
        </div>
      );
    }
    
    return (
      <div className="flex-1">
        <p className="font-medium text-red-600">Échec d'importation</p>
        <p className="text-sm text-gray-600">{result.error || 'Erreur inconnue'}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">📦 Importer des produits AliExpress</h1>
            <Link href="/admin" className="text-sm hover:underline">
              ← Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Import Form */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              Collez vos liens AliExpress (un par ligne) :
            </h2>
            
            <textarea
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="https://aliexpress.com/item/123.html&#10;https://aliexpress.com/item/456.html&#10;https://aliexpress.com/item/789.html"
              disabled={isImporting}
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed font-mono text-sm"
            />

            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={handleImport}
                disabled={isImporting || urls.trim().length === 0}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
              >
                {isImporting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Importation en cours...
                  </span>
                ) : (
                  <span>🚀 Importer les produits</span>
                )}
              </button>

              {urls.trim().length > 0 && (
                <button
                  onClick={() => setUrls('')}
                  disabled={isImporting}
                  className="text-gray-600 hover:text-gray-800 disabled:text-gray-400"
                >
                  Effacer
                </button>
              )}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              <p>💡 <strong>Conseils :</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Copiez les liens depuis AliExpress</li>
                <li>Un lien par ligne</li>
                <li>Maximum 50 produits par importation</li>
                <li>Les prix sont calculés automatiquement avec marge</li>
              </ul>
            </div>
          </div>

          {/* Progress and Results */}
          {(isImporting || results.length > 0) && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">📊 Progression :</h2>

              {/* Summary */}
              {summary && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-900">{summary.total}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Réussis</p>
                      <p className="text-2xl font-bold text-green-600">{summary.succeeded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Échoués</p>
                      <p className="text-2xl font-bold text-red-600">{summary.failed}</p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-green-500 h-3 transition-all duration-500"
                        style={{
                          width: `${(summary.succeeded / summary.total) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      {summary.succeeded}/{summary.total} produits importés
                    </p>
                  </div>
                </div>
              )}

              {/* Results List */}
              {results.length > 0 && (
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 ${
                        result.success
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      {getStatusIcon(result)}
                      {getStatusText(result)}
                    </div>
                  ))}
                </div>
              )}

              {isImporting && results.length === 0 && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="mt-4 text-gray-600">Importation en cours...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
