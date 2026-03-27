// Utility for routing /ai prefix to Perplexity
// Rules:
// - Prefix must be at position 0 (no leading spaces)
// - Accept "/ai", "/ai ", "/ai:", case-insensitive

const AI_PREFIX_RE = /^\/ai(?:\s|:|$)/i;

export const isAiPrefix = (s) => {
  const v = s == null ? '' : String(s);
  return AI_PREFIX_RE.test(v);
};

export const stripAiPrefix = (s) => {
  const v = s == null ? '' : String(s);
  // remove the prefix, then trim left spaces from the remainder
  return v.replace(AI_PREFIX_RE, '').replace(/^\s+/, '');
};

export const buildPerplexityUrl = (q) => {
  const v = q == null ? '' : String(q);
  return `https://www.perplexity.ai/search?q=${encodeURIComponent(v)}`;
};
