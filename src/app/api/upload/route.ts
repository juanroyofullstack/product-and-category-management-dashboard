import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const timestamp = Date.now();
        const extension = path.extname(file.name);
        const filename = `${timestamp}${extension}`;
        const filepath = path.join(process.cwd(), 'public/uploads', filename);

        await writeFile(filepath, buffer);

        return NextResponse.json({ 
            message: 'File uploaded successfully',
            url: `/uploads/${filename}`, 
        });
    } catch {
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
