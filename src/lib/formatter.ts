/**
 * Formats a guest name from a URL parameter.
 * Decodes URI component, sanitiizes, and converts to Title Case.
 * Falls back to "Bapak/Ibu/Saudara/i" if name is empty or invalid.
 */
export function formatGuestName(name: string | undefined | null): string {
  const DEFAULT_FALLBACK = "Bapak/Ibu/Saudara/i";
  
  if (!name) return DEFAULT_FALLBACK;
  
  try {
    // Decode URL segment
    const decoded = decodeURIComponent(name);
    
    // Basic validation & Sanitization
    // Remove HTML tags and extra spaces
    const sanitized = decoded.replace(/<[^>]*>?/gm, '').trim();
    
    if (!sanitized) return DEFAULT_FALLBACK;

    // Convert to Title Case
    return sanitized
      .split(/\s+/)
      .map(word => {
        if (word.length === 0) return "";
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .filter(Boolean)
      .join(' ');
  } catch (e) {
    console.error("Error formatting guest name:", e);
    return DEFAULT_FALLBACK;
  }
}
