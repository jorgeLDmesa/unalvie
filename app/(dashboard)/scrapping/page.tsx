'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';

type JobStatus = 'QUEUED' | 'EXECUTING' | 'COMPLETED' | 'FAILED';

type ScrapeResult = {
  searchTerm: string;
  title: string;
  url: string;
  timestamp: string;
  results?: Array<{
    text: string;
    href?: string;
  }>;
  screenshotBase64?: string;
};

export default function ScrappingPage() {
  const [searchTerm, setSearchTerm] = useState('geografia');
  const [isLoading, setIsLoading] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [result, setResult] = useState<ScrapeResult | null>(null);

  // Poll for job status
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/scrape?jobId=${jobId}`);
        const data = await response.json();

        if (data.success) {
          setJobStatus(data.status);

          if (data.status === 'COMPLETED') {
            setResult(data.output);
            setIsLoading(false);
            toast.success('Web scraping completado exitosamente');
            clearInterval(interval);
          } else if (data.status === 'FAILED') {
            setIsLoading(false);
            toast.error(`Error: ${data.error?.message || 'Unknown error'}`);
            clearInterval(interval);
          }
        }
      } catch (error) {
        console.error('Error checking job status:', error);
      }
    }, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, [jobId]);

  const handleScrape = async () => {
    setIsLoading(true);
    setResult(null);
    setJobId(null);
    setJobStatus(null);

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      });

      const data = await response.json();

      if (data.success) {
        setJobId(data.jobId);
        setJobStatus('QUEUED');
        toast.success('Job iniciado, procesando...');
      } else {
        toast.error(`Error: ${data.error}`);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Error al iniciar el scraping');
      console.error(error);
      setIsLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!jobStatus) return null;

    const statusConfig = {
      QUEUED: { icon: Clock, label: 'En cola', variant: 'secondary' as const },
      EXECUTING: { icon: Loader2, label: 'Ejecutando', variant: 'default' as const },
      COMPLETED: { icon: CheckCircle2, label: 'Completado', variant: 'default' as const },
      FAILED: { icon: XCircle, label: 'Fallido', variant: 'destructive' as const },
    };

    const config = statusConfig[jobStatus];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Web Scraping</h1>
        <p className="text-muted-foreground mt-2">
          Extrae informacion de Hermes UNAL con Trigger.dev
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar en Hermes</CardTitle>
          <CardDescription>
            Ingresa un termino de busqueda. El scraping se ejecuta en background sin timeouts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <Input
              type="text"
              placeholder="Termino de busqueda..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleScrape}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                'Iniciar Scraping'
              )}
            </Button>
            {getStatusBadge()}
          </div>

          {jobId && (
            <div className="text-sm text-muted-foreground">
              Job ID: <code className="bg-muted px-2 py-1 rounded">{jobId}</code>
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h3 className="font-semibold text-lg">Resultado del Scraping</h3>
                <div className="text-sm space-y-2">
                  <p><span className="font-medium">Termino buscado:</span> {result.searchTerm}</p>
                  <p><span className="font-medium">Titulo de pagina:</span> {result.title}</p>
                  <p><span className="font-medium">URL:</span> {result.url}</p>
                  <p><span className="font-medium">Timestamp:</span> {new Date(result.timestamp).toLocaleString()}</p>
                </div>
              </div>

              {result.results && result.results.length > 0 && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Resultados encontrados ({result.results.length}):</h4>
                  <ul className="space-y-2 text-sm">
                    {result.results.map((item, index) => (
                      <li key={index} className="border-l-2 border-primary pl-3">
                        {item.text}
                        {item.href && (
                          <span className="text-muted-foreground ml-2">
                            ({item.href})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.screenshotBase64 && (
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Screenshot:</h4>
                  <img
                    src={`data:image/png;base64,${result.screenshotBase64}`}
                    alt="Screenshot"
                    className="w-full rounded border"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
