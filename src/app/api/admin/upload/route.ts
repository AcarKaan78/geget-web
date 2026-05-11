import { NextRequest, NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { isAdmin } from '@/lib/auth/guard';

export const runtime = 'nodejs';

// Issues a short-lived upload token. Auth is checked in onBeforeGenerateToken.
// The actual manifest update happens via /api/admin/reports/register after
// the client-side upload completes — that is more reliable across environments
// than relying on the onUploadCompleted webhook.
export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: HandleUploadBody;
  try {
    body = (await req.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: 'Geçersiz istek gövdesi.' }, { status: 400 });
  }

  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        if (!(await isAdmin())) {
          throw new Error('Yetkisiz.');
        }
        return {
          allowedContentTypes: [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'image/webp',
          ],
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // Manifest is registered by /api/admin/reports/register from the client.
      },
    });
    return NextResponse.json(json);
  } catch (err) {
    console.error('[api/admin/upload]', err);
    return NextResponse.json(
      { error: (err as Error).message ?? 'Yükleme başarısız.' },
      { status: 400 },
    );
  }
}
