import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Raw GitHub URL for the resume
    const resumeUrl = 'https://raw.githubusercontent.com/kuldeep54/resume/main/Kuldeep%20Malviya%20Resume%20(1).pdf';
    
    // Fetch the PDF from GitHub
    const response = await fetch(resumeUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Kuldeep_Malviya_Resume.pdf"',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('Error fetching resume from GitHub:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to download resume' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
