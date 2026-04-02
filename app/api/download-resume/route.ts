import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const resumePath = join(process.cwd(), 'public', 'resume.pdf');
    const buffer = await readFile(resumePath);
    
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Kuldeep_Malviya_Resume.pdf"',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600'
      },
    });
  } catch (error) {
    console.error('Error reading resume file:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to download resume' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
