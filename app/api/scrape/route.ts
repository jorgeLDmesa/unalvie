import { NextRequest, NextResponse } from 'next/server';
import { tasks, runs } from "@trigger.dev/sdk/v3";
import type { scrapeHermesTask } from "@/trigger/scrape-hermes";

export async function POST(request: NextRequest) {
  try {
    // Verifica que la variable de entorno esté configurada
    if (!process.env.TRIGGER_SECRET_KEY) {
      throw new Error('TRIGGER_SECRET_KEY not configured');
    }

    const { searchTerm } = await request.json();

    // Trigger the background job
    const handle = await tasks.trigger<typeof scrapeHermesTask>(
      "scrape-hermes",
      { searchTerm: searchTerm || 'geografia' }
    );

    return NextResponse.json({
      success: true,
      jobId: handle.id,
      message: 'Scraping job started',
    });

  } catch (error) {
    console.error('Error triggering scraping job:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Get job status
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: 'Job ID required' },
        { status: 400 }
      );
    }

    const run = await runs.retrieve(jobId);

    return NextResponse.json({
      success: true,
      status: run.status,
      output: run.output,
      error: run.error,
    });

  } catch (error) {
    console.error('Error retrieving job status:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
