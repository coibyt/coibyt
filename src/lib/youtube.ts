/**
 * Turns a pasted video link into something that can sit inside an <iframe>.
 *
 * Supported:
 *  - YouTube watch / youtu.be / embed links
 *  - VaraClip videos (varaclip.com/v/<id>, or an already embed-style
 *    varaclip.com/embed/v/<id>) so salons can reuse the clips they post on
 *    VaraClip without uploading them to YouTube first.
 *
 * (The function keeps its old name because it is used in many places.)
 */
const VARACLIP_HOSTS = new Set(["varaclip.com", "www.varaclip.com"]);

export function toYoutubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.toLowerCase();

    if (VARACLIP_HOSTS.has(host)) {
      const m = u.pathname.match(/^\/(?:embed\/)?v\/([A-Za-z0-9_-]{8,40})\/?$/);
      return m ? `https://varaclip.com/embed/v/${m[1]}` : null;
    }

    let videoId: string | null = null;
    if (host.includes("youtu.be")) {
      videoId = u.pathname.slice(1);
    } else if (host.includes("youtube.com")) {
      videoId = u.searchParams.get("v") ?? (u.pathname.startsWith("/embed/") ? u.pathname.split("/")[2] : null);
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}
