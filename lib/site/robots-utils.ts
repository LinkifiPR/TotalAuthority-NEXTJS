export type RobotsQuality = 'missing' | 'valid' | 'incomplete' | 'invalid';

export interface RobotsDirective {
  key: string;
  value: string;
  line: number;
}

export interface RobotsGroup {
  userAgents: string[];
  directives: RobotsDirective[];
}

export interface RobotsParseResult {
  hasContent: boolean;
  groups: RobotsGroup[];
  sitemapUrls: string[];
  invalidLines: string[];
  warnings: string[];
  quality: RobotsQuality;
}

export interface RobotsRecommendation {
  text: string;
  quality: RobotsQuality;
  changes: string[];
  warnings: string[];
}

const BASE_DIRECTIVES = new Set([
  'allow',
  'disallow',
  'crawl-delay',
  'clean-param',
  'request-rate',
  'visit-time',
  'host',
  'noindex',
]);

function normalizeLine(line: string): string {
  const withoutComment = line.split('#')[0]?.trim() ?? '';
  return withoutComment;
}

function normalizeDirectiveKey(value: string): string {
  return value.trim().toLowerCase();
}

function renderDirectiveKey(value: string): string {
  if (value === 'user-agent') {
    return 'User-agent';
  }

  if (value === 'crawl-delay') {
    return 'Crawl-delay';
  }

  if (value === 'clean-param') {
    return 'Clean-param';
  }

  if (value === 'request-rate') {
    return 'Request-rate';
  }

  if (value === 'visit-time') {
    return 'Visit-time';
  }

  if (value === 'noindex') {
    return 'Noindex';
  }

  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}

function dedupe(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function ensureWildcardGroup(groups: RobotsGroup[]): { groups: RobotsGroup[]; created: boolean } {
  const hasWildcard = groups.some((group) => group.userAgents.some((agent) => agent.trim() === '*'));
  if (hasWildcard) {
    return { groups, created: false };
  }

  return {
    groups: [...groups, { userAgents: ['*'], directives: [{ key: 'allow', value: '/', line: -1 }] }],
    created: true,
  };
}

function normalizeGroup(group: RobotsGroup): RobotsGroup {
  const userAgents = dedupe(group.userAgents.map((agent) => agent.trim()).filter(Boolean));

  const directives = group.directives
    .map((directive) => ({
      ...directive,
      key: normalizeDirectiveKey(directive.key),
      value: directive.value.trim(),
    }))
    .filter((directive) => Boolean(directive.value))
    .filter((directive) => BASE_DIRECTIVES.has(directive.key));

  const dedupedDirectives: RobotsDirective[] = [];
  const seen = new Set<string>();

  directives.forEach((directive) => {
    const fingerprint = `${directive.key}::${directive.value}`;
    if (seen.has(fingerprint)) {
      return;
    }

    seen.add(fingerprint);
    dedupedDirectives.push(directive);
  });

  return {
    userAgents,
    directives: dedupedDirectives,
  };
}

export function parseRobotsTxt(robotsTxt?: string): RobotsParseResult {
  const raw = robotsTxt?.trim() ?? '';

  if (!raw) {
    return {
      hasContent: false,
      groups: [],
      sitemapUrls: [],
      invalidLines: [],
      warnings: ['robots.txt was not detected.'],
      quality: 'missing',
    };
  }

  const groups: RobotsGroup[] = [];
  const sitemapUrls: string[] = [];
  const invalidLines: string[] = [];
  const warnings: string[] = [];

  let currentGroup: RobotsGroup | undefined;

  const lines = raw.split(/\r?\n/);

  lines.forEach((line, index) => {
    const normalized = normalizeLine(line);

    if (!normalized) {
      return;
    }

    const separatorIndex = normalized.indexOf(':');
    if (separatorIndex === -1) {
      invalidLines.push(`Line ${index + 1}: ${line.trim()}`);
      return;
    }

    const key = normalizeDirectiveKey(normalized.slice(0, separatorIndex));
    const value = normalized.slice(separatorIndex + 1).trim();

    if (!value) {
      invalidLines.push(`Line ${index + 1}: ${line.trim()}`);
      return;
    }

    if (key === 'sitemap') {
      sitemapUrls.push(value);
      return;
    }

    if (key === 'user-agent') {
      if (!currentGroup || currentGroup.directives.length > 0) {
        currentGroup = { userAgents: [], directives: [] };
        groups.push(currentGroup);
      }

      currentGroup.userAgents.push(value);
      return;
    }

    if (!currentGroup) {
      invalidLines.push(`Line ${index + 1}: ${line.trim()}`);
      return;
    }

    if (!BASE_DIRECTIVES.has(key)) {
      warnings.push(`Unknown robots directive "${key}" on line ${index + 1}; it will not be merged automatically.`);
      return;
    }

    currentGroup.directives.push({
      key,
      value,
      line: index + 1,
    });
  });

  const normalizedGroups = groups
    .map((group) => normalizeGroup(group))
    .filter((group) => group.userAgents.length > 0);

  const hasWildcardGroup = normalizedGroups.some((group) => group.userAgents.includes('*'));
  const wildcardGroupHasRules = normalizedGroups.some(
    (group) =>
      group.userAgents.includes('*') &&
      group.directives.some((directive) => directive.key === 'allow' || directive.key === 'disallow'),
  );

  let quality: RobotsQuality = 'valid';

  if (invalidLines.length > 0 || normalizedGroups.length === 0) {
    quality = 'invalid';
  } else if (!hasWildcardGroup || !wildcardGroupHasRules || sitemapUrls.length === 0) {
    quality = 'incomplete';
  }

  if (quality === 'incomplete' && sitemapUrls.length === 0) {
    warnings.push('robots.txt has no Sitemap directive.');
  }

  if (quality === 'incomplete' && !hasWildcardGroup) {
    warnings.push('robots.txt has no wildcard User-agent group.');
  }

  return {
    hasContent: true,
    groups: normalizedGroups,
    sitemapUrls: dedupe(sitemapUrls),
    invalidLines,
    warnings: dedupe(warnings),
    quality,
  };
}

function suggestedSystemRestrictions(discoveredPaths: string[]): string[] {
  const lowerPaths = discoveredPaths.map((path) => path.toLowerCase());
  const suggestions: string[] = [];

  if (lowerPaths.some((path) => path.startsWith('/wp-admin'))) {
    suggestions.push('/wp-admin/');
  }

  if (lowerPaths.some((path) => path.startsWith('/cart'))) {
    suggestions.push('/cart/');
  }

  if (lowerPaths.some((path) => path.startsWith('/checkout'))) {
    suggestions.push('/checkout/');
  }

  if (lowerPaths.some((path) => path.startsWith('/account') || path.startsWith('/my-account'))) {
    suggestions.push('/account/');
  }

  return dedupe(suggestions);
}

function selectSitemapUrl(origin: string, parsed: RobotsParseResult): string {
  const normalizedOrigin = origin.replace(/\/$/, '');

  const sameOriginSitemap = parsed.sitemapUrls.find((candidate) => {
    try {
      const parsedCandidate = new URL(candidate);
      return parsedCandidate.origin === normalizedOrigin;
    } catch {
      return false;
    }
  });

  return sameOriginSitemap ?? `${normalizedOrigin}/sitemap.xml`;
}

export function buildRecommendedRobotsTxt(params: {
  origin: string;
  existingRobotsTxt?: string;
  discoveredPaths: string[];
}): RobotsRecommendation {
  const parsed = parseRobotsTxt(params.existingRobotsTxt);
  const changes: string[] = [];

  let groups = parsed.groups;

  if (groups.length === 0) {
    groups = [{ userAgents: ['*'], directives: [{ key: 'allow', value: '/', line: -1 }] }];
    changes.push('Created a baseline wildcard crawler group.');
  }

  const wildcardCheck = ensureWildcardGroup(groups);
  groups = wildcardCheck.groups;

  if (wildcardCheck.created) {
    changes.push('Added a wildcard User-agent group to ensure standard crawler compatibility.');
  }

  groups = groups.map((group) => {
    if (!group.userAgents.includes('*')) {
      return group;
    }

    const hasAllowOrDisallow = group.directives.some(
      (directive) => directive.key === 'allow' || directive.key === 'disallow',
    );

    if (hasAllowOrDisallow) {
      return group;
    }

    changes.push('Added Allow: / in wildcard group because no crawl directives were present.');

    return {
      ...group,
      directives: [...group.directives, { key: 'allow', value: '/', line: -1 }],
    };
  });

  const sitemapUrl = selectSitemapUrl(params.origin, parsed);

  if (parsed.sitemapUrls.length === 0) {
    changes.push(`Added missing sitemap directive (${sitemapUrl}).`);
  } else if (!parsed.sitemapUrls.includes(sitemapUrl)) {
    changes.push(`Kept existing sitemap and normalized to site origin (${sitemapUrl}).`);
  }

  if (parsed.invalidLines.length > 0) {
    changes.push('Removed invalid directives from the merged recommendation.');
  }

  if (changes.length === 0) {
    changes.push('Preserved current valid directives and added clarity comments only.');
  }

  const safeRestrictions = suggestedSystemRestrictions(params.discoveredPaths);

  const outputLines: string[] = [
    '# Recommended merged robots.txt',
    `# Current status: ${parsed.quality}.`,
    '# Changes applied:',
    ...changes.map((change) => `# - ${change}`),
    '# Important: robots.txt controls crawler access hints, not true access control.',
    '',
  ];

  groups.forEach((group) => {
    group.userAgents.forEach((agent) => {
      outputLines.push(`User-agent: ${agent}`);
    });

    group.directives.forEach((directive) => {
      outputLines.push(`${renderDirectiveKey(directive.key)}: ${directive.value}`);
    });

    outputLines.push('');
  });

  outputLines.push(`Sitemap: ${sitemapUrl}`);

  if (safeRestrictions.length > 0) {
    outputLines.push('');
    outputLines.push('# Optional system-path restrictions (enable only if relevant):');
    outputLines.push('# User-agent: *');
    safeRestrictions.forEach((path) => {
      outputLines.push(`# Disallow: ${path}`);
    });
  }

  outputLines.push('');
  outputLines.push('# Optional AI-specific bot directives (not required for most sites):');
  outputLines.push('# User-agent: GPTBot');
  outputLines.push('# Allow: /');
  outputLines.push('#');
  outputLines.push('# User-agent: ClaudeBot');
  outputLines.push('# Allow: /');
  outputLines.push('#');
  outputLines.push('# Experimental directives should be tested before production rollout.');

  return {
    text: outputLines.join('\n').trim(),
    quality: parsed.quality,
    changes,
    warnings: [...parsed.warnings],
  };
}
