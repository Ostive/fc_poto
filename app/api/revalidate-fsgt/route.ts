import { updateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Route protégée pour vider manuellement le cache FSGT.
 *
 *   GET  /api/revalidate-fsgt?token=XXX
 *   POST /api/revalidate-fsgt          (avec header Authorization: Bearer XXX)
 *
 * Configurer la variable d'env `FSGT_REVALIDATE_TOKEN` (gitignored).
 * À déclencher après chaque journée par un webhook, un cron Vercel, ou à la main.
 *
 * Next.js 16 : on utilise `updateTag(tag)` (signature à un argument) plutôt
 * que `revalidateTag(tag, profile)` qui exige un profil de cache explicite.
 */

const TAGS = ["fsgt", "fsgt-foot7"] as const;

function check(req: NextRequest) {
  const expected = process.env.FSGT_REVALIDATE_TOKEN;
  if (!expected) return { ok: false, reason: "FSGT_REVALIDATE_TOKEN non configuré" };

  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!token || token !== expected) return { ok: false, reason: "Token invalide" };
  return { ok: true };
}

export async function GET(req: NextRequest) {
  const auth = check(req);
  if (!auth.ok) {
    return NextResponse.json({ revalidated: false, error: auth.reason }, { status: 401 });
  }
  for (const tag of TAGS) updateTag(tag);
  return NextResponse.json({
    revalidated: true,
    tags: TAGS,
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: NextRequest) {
  return GET(req);
}
