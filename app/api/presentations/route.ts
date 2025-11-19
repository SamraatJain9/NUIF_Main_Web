import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET() {
  try {
    const presentationsDir = join(process.cwd(), 'public', 'presentations');
    const files = await readdir(presentationsDir);
    
    // Filter PDF files and extract information
    const presentations = files
      .filter(file => file.endsWith('.pdf'))
      .map((file) => {
        // Extract team name and company from filename
        // Format: TeamName_CompanyName_DD-MM-YYYY.pdf
        const withoutExt = file.replace('.pdf', '');
        const parts = withoutExt.split('_');
        
        // Get date from last part (DD-MM-YYYY format)
        const datePart = parts[parts.length - 1];
        
        // Get team name (first part)
        const team = parts[0];
        
        // Get company name (everything between team and date)
        const company = parts.slice(1, -1).join(' ');
        
        // Check if PNG thumbnail exists with same filename
        const thumbnailFileName = `${withoutExt}.png`;
        const thumbnailPath = join(process.cwd(), 'public', 'presentations', thumbnailFileName);
        const hasThumbnail = existsSync(thumbnailPath);
        
        return {
          id: withoutExt.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          team: team.replaceAll('-', ' '),
          company: company.replaceAll('-', ' '),
          title: company.replaceAll('-', ' '),
          subtitle: `Investment Analysis by ${team.replaceAll('-', ' ')}`,
          pdfPath: `/presentations/${file}`,
          thumbnailPath: hasThumbnail ? `/presentations/${thumbnailFileName}` : `/presentations/${withoutExt}.png`,
          dateFormatted: datePart.replaceAll('-', '/'),
          sortDate: datePart
        };
      })
      .sort((a, b) => {
        // Parse DD-MM-YYYY for sorting
        const [dayA, monthA, yearA] = a.sortDate.split('-').map(Number);
        const [dayB, monthB, yearB] = b.sortDate.split('-').map(Number);
        const dateA = new Date(yearA, monthA - 1, dayA).getTime();
        const dateB = new Date(yearB, monthB - 1, dayB).getTime();
        return dateB - dateA; // Sort newest first
      });
    
    // Group by exact date (DD/MM/YYYY)
    const grouped = presentations.reduce((acc, presentation) => {
      const dateKey = presentation.dateFormatted;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(presentation);
      return acc;
    }, {} as Record<string, typeof presentations>);
    
    return NextResponse.json({ presentations, grouped });
  } catch (error) {
    console.error('Error reading presentations:', error);
    return NextResponse.json({ error: 'Failed to read presentations' }, { status: 500 });
  }
}
