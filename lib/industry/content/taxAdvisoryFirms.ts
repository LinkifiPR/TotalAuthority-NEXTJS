import { IndustryContent } from '@/lib/industry/types';

export const taxAdvisoryFirms: IndustryContent = {
  slug: 'tax-advisory-firms',

  meta: {
    title: 'AI Visibility & Authority Building for Tax Advisory Firms | TotalAuthority',
    description:
      'See whether ChatGPT, Gemini and Perplexity recommend your firm when prospective clients ask for tax advice. TotalAuthority audits your AI visibility and builds the earned media, content and authority signals that influence those answers.',
    keywords: [
      'AI visibility for tax advisory firms',
      'tax advisory firm marketing',
      'tax advisor SEO',
      'tax authority building',
      'ChatGPT tax advisor recommendations',
      'AI search for tax advisors',
      'digital PR for tax firms',
      'tax directory rankings',
      'AICPA firm visibility',
      'AI visibility audit',
    ],
    ogTitle: 'AI Visibility & Authority Building for Tax Advisory Firms',
    ogDescription:
      'Find out whether AI platforms recommend your firm or your competitors, and build the authority needed to appear in the answers prospective clients now trust.',
  },

  cta: {
    heroPrimary: 'Get Your AI Visibility Audit',
    auditSection: 'Audit My Tax Advisory Firm',
    auditOffer: 'Get My Tax Advisory Firm Audit',
    final: 'Get Your Tax Advisory Firm AI Visibility Audit',
    mobile: 'Audit My Tax Advisory Firm',
  },

  hero: {
    eyebrow: 'AI Visibility and Authority Building for Tax Advisory Firms',
    headlinePre: 'Make Your Firm the One',
    headlineHighlight: 'AI Recommends',
    headlinePost: '',
    paragraphs: [
      'Your prospective clients are asking ChatGPT, Gemini and Perplexity who to hire for personal tax planning, corporate tax, estate tax, capital gains, IRS inquiries and international structuring.',
      'TotalAuthority shows you whether your firm appears in those answers, which competitors are being recommended instead, and which sources are influencing the results. We then build the external authority, earned media, content and brand signals needed to improve your visibility.',
    ],
    supportingLine:
      'See how your firm is mentioned, cited and compared across leading AI platforms.',
    footnote: 'Measured across ChatGPT, Gemini and Perplexity',
    dashboardTitle: 'Tax Advisory AI Visibility Audit',
  },

  dashboard: {
    score: 50,
    scoreCaption: '15/30 audited answers mentioned the firm',
    citedLine: '9 answers',
    citedSub: 'cited the website',
    models: [
      { name: 'ChatGPT', score: 41, m: '4/10', c: '6/10' },
      { name: 'Gemini', score: 50, m: '5/10', c: '2/10' },
      { name: 'Perplexity', score: 30, m: '3/10', c: '1/10' },
    ],
    competitorsHeading: 'Top competitors recommended instead',
    competitorsCaption: '4 of 10 prompts',
    competitors: [
      { name: 'Aldermere Tax', count: 7 },
      { name: 'Fenwick Advisory', count: 5 },
      { name: 'Sterling Reece Tax', count: 4 },
    ],
    sources: [
      'AICPA',
      'Tax Notes',
      'Accounting Today',
      'Wall Street Journal',
      'Journal of Accountancy',
      'Trustpilot',
      'Local press',
    ],
  },

  shift: {
    heading: 'Your next client may ask AI before they search Google',
    intro:
      'People are increasingly using AI platforms to shortlist firms, compare specialties and decide which tax advisors appear credible. They are asking questions such as:',
    questions: [
      'Who is the best tax advisor for high-net-worth individuals near me?',
      'Which firm should I use for an IRS audit in Chicago?',
      'Where can I find a specialist estate tax advisor?',
      'Which firm has the strongest reviews for capital gains planning?',
      'Who is a trusted advisor for expat and residency matters?',
      'Which tax advisory firm handles R&D tax credits well?',
    ],
    paragraphs: [
      'AI can answer those questions without sending the user through a traditional list of search results. Your firm may have an excellent reputation, experienced partners and decades of advisory work behind it. That does not guarantee you will be included.',
      'AI systems form their answers using the sources and signals they can find across the wider web. If your competitors are better represented across those sources, they may be recommended ahead of you.',
    ],
    callout:
      'The firm being recommended is not necessarily the best firm. It is often the firm with the clearest and strongest visible authority.',
  },

  audit: {
    heading: 'Find out exactly where your firm stands',
    introPre: 'Our ',
    introPost:
      " tests the commercially valuable questions your clients are likely to ask. We don't simply search for your firm name. We test the specialty, service and local discovery prompts that could lead to a new appointment.",
    outputCards: [
      {
        t: 'Overall AI Visibility Score',
        b: 'A clear baseline showing how consistently your firm appears across the audited answers.',
      },
      {
        t: 'Model-by-Model Results',
        b: 'Separate visibility scores for ChatGPT, Gemini and Perplexity.',
      },
      {
        t: 'Mention and Citation Tracking',
        b: 'We identify whether your firm appeared, whether your website was cited, whether you were actively recommended, and whether your positioning was accurately understood.',
      },
      {
        t: 'Prompt Visibility Map',
        b: 'A simple view showing the specialties and searches where your firm is mentioned, not mentioned, recommended or cited.',
      },
    ],
    promptCategories: [
      'Best tax advisory firm in your city',
      'Best estate tax advisor',
      'Best capital gains tax specialist',
      'Best advisor for IRS audits',
      'Best corporate tax planning firm',
      'Best expat and residency advisor',
      'Best property tax specialist',
      'Best advisor for R&D tax credits',
      'Best international tax firm',
      'Best advisor for IRS disputes',
      'Best firm for natural-language tax queries',
      'Top-rated tax advisors near me',
    ],
  },

  competitorIntel: {
    heading: 'See who AI recommends instead',
    intro:
      'A missing recommendation is only part of the picture. The more useful question is which competitors appear instead, how frequently they are recommended, and why AI associates them more strongly with a specialty or location.',
    identifiesHeading: 'Our audit identifies',
    identifies: [
      'Competitors appearing across multiple AI models',
      'Firms repeatedly recommended for priority specialties',
      'Competitors associated with particular services',
      'The prompts where your firm is absent',
      'The websites supporting competitor recommendations',
      'The firms gaining visibility despite having weaker real-world credentials',
    ],
    tableHeading: 'Recurring competitors',
    tableRows: [
      { name: 'Aldermere Tax', m: 3, p: 7, f: '23×' },
      { name: 'Fenwick Advisory', m: 2, p: 5, f: '14×' },
      { name: 'Sterling Reece Tax', m: 3, p: 4, f: '11×' },
      { name: 'Holloway Partners', m: 1, p: 3, f: '6×' },
      { name: 'Carrick & Vane', m: 2, p: 2, f: '5×' },
    ],
    note:
      'This gives you a practical competitive view based on AI-generated recommendations, rather than assumptions about who your online competitors are.',
  },

  sourceLandscape: {
    heading: 'Discover which sources are influencing AI',
    paragraphs: [
      'Improving AI visibility is not only a website project. AI platforms may rely on professional bodies, tax trade press, financial media, local recommendation pages, review platforms, listicles, Reddit discussions, advisor profiles, service comparison pages, competitor websites, social profiles and your own service and location pages.',
      'Our source analysis identifies which websites appear most frequently across the answers being generated in your market. This allows us to see where your brand is already represented, where competitors have an advantage, and where new authority needs to be created.',
    ],
    pullQuoteLine1: 'Your website tells AI what you say about yourself.',
    pullQuoteLead: 'Third-party sources help validate',
    pullQuoteHighlight: 'whether that claim should be trusted.',
    topSourcesTitle: 'Top recurring sources',
    topSourcesBody: 'The websites appearing most frequently across audited answers.',
    topSources: [
      { name: 'AICPA', pct: 89 },
      { name: 'Tax Notes', pct: 75 },
      { name: 'Wall Street Journal', pct: 60 },
      { name: 'Local press', pct: 35 },
    ],
    multiModelTitle: 'Used across multiple AI models',
    multiModelBody: 'Sources relied upon by more than one platform.',
    multiModel: [
      { name: 'Reddit', models: ['ChatGPT', 'Gemini', 'Perplexity'] },
      { name: 'Accounting Today', models: ['ChatGPT', 'Perplexity'] },
      { name: 'Journal of Accountancy', models: ['Gemini', 'Perplexity'] },
    ],
    ownedTitle: 'Owned vs third-party signals',
    ownedBody:
      'A comparison between citations from your own website and appearances from external sources.',
    ownedPct: 22,
    thirdPartyPct: 78,
  },

  brand: {
    heading: 'Does AI understand what you want to be known for?',
    intro:
      'Being mentioned is not enough if your firm is associated with the wrong specialties or described too generically. We compare what you want AI to understand with what the platforms currently say about your firm.',
    positioningHeading: 'Positioning examples',
    positioning: [
      'Leading firm for complex estate tax planning',
      'Trusted practice for IRS audits and disputes',
      'Specialist firm for expat and residency matters',
      'Local authority for capital gains and property tax',
      'Premier advisor on international and cross-border tax',
      'Independently recognized private client tax team',
      'Multi-office practice with experienced partners',
    ],
    assessHeading: 'We assess whether AI accurately understands',
    assess: [
      'Who your firm serves',
      'Where you operate',
      'Which specialties you focus on',
      'What differentiates your approach',
      'Who your tax advisors are',
      'Which credentials support your expertise',
      'Which matters you are best placed to handle',
      'How your firm compares with local competitors',
    ],
    calloutPillA: 'Consistently understood',
    calloutPillB: 'Consistently recommended',
    calloutStatement:
      'Your brand needs to be consistently understood before it can be consistently recommended.',
  },

  whatWeDo: {
    heading: 'We build the authority behind the recommendation',
    paragraphsPre:
      'TotalAuthority is an AI visibility and authority-building agency. We identify the external signals influencing recommendations, create the ',
    paragraphLinkLabel: 'strategy',
    paragraphLinkHref: '/strategy-blueprint',
    paragraphsPost:
      ' needed to strengthen them, and execute the work required to build a more visible and defensible brand.',
    paragraph2:
      'This combines AI visibility analysis with digital PR, earned media, content, entity optimization, citation building and external authority development.',
    pillars: [
      {
        num: '01',
        title: 'Multi-Model AI Visibility Auditing',
        body: 'High-intent prompts tested across ChatGPT, Gemini and Perplexity. We measure mentions, citations, recommendations, positioning, specialty visibility, local visibility, competitors and sources.',
        icon: 'Search',
      },
      {
        num: '02',
        title: 'AI Authority Strategy Blueprint',
        body: 'The Blueprint turns audit findings into a prioritized execution plan: competitors, sources, AI-cited rankings, website alignment, third-party gaps, PR opportunities, citations and content priorities.',
        icon: 'FileText',
        href: '/strategy-blueprint',
      },
      {
        num: '03',
        title: 'Earned Media and Digital PR',
        body: 'We position your qualified tax advisors as expert sources for journalists covering tax, business, personal finance and wealth — for editorial features, expert commentary and authoritative backlinks.',
        icon: 'Megaphone',
      },
      {
        num: '04',
        title: 'Third-Party Authority Development',
        body: 'We strengthen your presence across professional bodies, review platforms, advisor directories, local business resources, service comparison pages and professional associations.',
        icon: 'Layers',
      },
      {
        num: '05',
        title: 'Brand and Entity Alignment',
        body: 'We align firm names, locations, advisor biographies, credentials, specialty categories, social profiles, directory listings and website schema so AI systems build a clearer understanding of the firm.',
        icon: 'UserCheck',
      },
      {
        num: '06',
        title: 'Citable Content and Authority Assets',
        body: 'Original research, specialty guides, advisor-led explainers, tax updates, comparison pages, client decision tools and proprietary data — each asset has a defined role in the authority strategy.',
        icon: 'FileText',
      },
      {
        num: '07',
        title: 'Ongoing AI Visibility Tracking',
        body: 'We continue testing the prompts most valuable to your firm: recommendation frequency, brand mentions, specialty visibility, competitor share of voice, citation sources and positioning accuracy.',
        icon: 'BarChart3',
      },
      {
        num: '08',
        title: 'Local and Multi-Office Authority',
        body: 'For firms operating across one or more offices, we strengthen the local signals AI relies on: office-specific profiles, regional press, community references, structured local data and office-level advisor recognition.',
        icon: 'Building2',
      },
      {
        num: '09',
        title: 'Reputation and Review Authority',
        body: 'We strengthen the consistency and depth of the review platforms and directories AI weighs most heavily for firms — Google, Trustpilot, AICPA and Journal of Accountancy — so sentiment, volume and recency reinforce recommendations.',
        icon: 'Star',
      },
    ],
  },

  earnedMedia: {
    heading: 'Real authority is earned outside your own website',
    paragraphs: [
      'Every firm can publish claims about being trusted, experienced or market-leading. Independent media coverage gives those claims external support.',
      'When a tax advisor is quoted in a recognized publication, several things happen:',
    ],
    effectsIntro: 'When a tax advisor is quoted in a recognized publication, several things happen:',
    effects: [
      'The advisor becomes associated with a relevant area of expertise',
      'The firm earns an independent brand mention',
      'The website may receive an authoritative backlink',
      'Search engines gain another reference point',
      'AI systems gain external information about the brand',
      'Clients see evidence that the expert is trusted by journalists',
    ],
    closing:
      'The same piece of editorial coverage can support brand discovery, SEO, advisor authority, client confidence and AI visibility. This is why earned media forms a central part of the TotalAuthority process.',
    logosHeading: 'Publications featuring our clients and their experts',
  },

  practitioner: {
    sectionLabel: 'Advisor Authority',
    heading: 'Clients trust advisors, not faceless firm pages',
    paragraphs: [
      'In tax advisory, the person handling the matter can be as important as the firm itself. Your managing partner, heads of specialty, senior advisors and qualified tax advisors hold expertise that can strengthen the authority of the entire brand.',
      'We help develop that expertise into visible authority through:',
    ],
    developIntro: 'We help develop that expertise into visible authority through:',
    chips: [
      'Advisor positioning',
      'Expert biographies',
      'Credential alignment',
      'Media commentary',
      'Author pages',
      'Topic specialization',
      'Speaking engagements',
      'Professional citations',
      'Directory rankings',
      'Thought leadership',
      'Podcast appearances',
      'Award submissions',
    ],
    closing:
      'A tax advisor with genuine expertise can become a recognized source for both clients and journalists. That authority then supports the firm they represent.',
  },

  services: {
    sectionLabel: 'Specialty Visibility',
    heading: 'Build visibility around the specialties that generate fees',
    intro:
      'Your campaign should not chase vague visibility. It should strengthen the association between your firm, location, advisors and the specialties you want to grow.',
    focusHeading: 'A tax advisory firm strategy may focus on',
    badge: '24 specialties',
    items: [
      'Personal tax planning',
      'Corporate tax planning',
      'Estate tax planning',
      'Capital gains tax',
      'Sales tax advisory',
      'R&D tax credits',
      'International tax',
      'IRS audits and inquiries',
      'Property tax',
      'Trust taxation',
      'Expat and residency',
      'Employee stock plans',
      'Transfer tax',
      'Individual tax returns (Form 1040)',
      'Qualified Opportunity Zones',
      'Tax-efficient compensation',
      'Cross-border structuring',
      'Transfer pricing',
      'Cost segregation',
      'Exit and succession tax',
      'Voluntary disclosures',
      'Tax dispute resolution',
      'Partnership tax',
      'Tax compliance reviews',
    ],
    closing:
      'A firm may be highly visible for one specialty and completely absent for another. Our process exposes those differences. Every specialty is reviewed separately because the competitors, sources and authority signals can differ considerably.',
  },

  process: {
    eyebrow: 'Our Process',
    heading: 'From AI visibility baseline to authority building',
    steps: [
      {
        n: '01',
        t: 'Define the Commercial Priorities',
        b: 'We identify the specialties, locations and client searches most valuable to your firm. This prevents the campaign from becoming a broad exercise with no commercial focus.',
      },
      {
        n: '02',
        t: 'Complete the Multi-Model Audit',
        b: 'We test relevant prompts across ChatGPT, Gemini and Perplexity. We document mentions, recommendations, citations, competitors and sources.',
      },
      {
        n: '03',
        t: 'Build the Strategy Blueprint',
        b: 'We analyze why competitors are appearing, which sources are influencing results and where your authority footprint is weak. You receive a prioritized roadmap for implementation.',
      },
      {
        n: '04',
        t: 'Strengthen the Foundation',
        b: 'We improve the clarity and consistency of brand positioning, advisor entities, specialty associations, profiles, website information, citations, structured data and local signals.',
      },
      {
        n: '05',
        t: 'Build External Authority',
        b: 'We execute the work across earned media, digital PR, expert positioning, third-party profiles, relevant directories, citable content, authority assets and external mentions.',
      },
      {
        n: '06',
        t: 'Track and Refine',
        b: 'We monitor how visibility changes across the target prompts and compare progress with the competitors identified in the original audit.',
      },
    ],
  },

  beforeAfter: {
    heading: 'AI visibility, before and after',
    intro:
      'AI visibility improvement should be measured through several indicators rather than one isolated answer.',
    before: [
      'The firm appears inconsistently',
      'Important specialty prompts produce no mention',
      'Competitors dominate recommendations',
      'AI uses weak or inaccurate positioning',
      'The website receives few citations',
      'Advisors have little external authority',
      'Third-party source coverage is limited',
      'The firm does not know which sources influence results',
    ],
    after: [
      'The firm appears across more valuable prompts',
      'Priority specialties have stronger brand association',
      'Brand descriptions become more accurate',
      'Advisor expertise is clearer',
      'More trusted sources mention the firm',
      'The website earns relevant citations',
      'Competitive gaps begin to reduce',
      'Progress is monitored across multiple AI platforms',
    ],
  },

  whoFor: {
    heading: 'Built for firms with genuine expertise to promote',
    intro:
      'TotalAuthority is best suited to established firms that have credible tax advisors, strong client service and the capacity to convert increased visibility into appointments.',
    typesHeading: 'Best-fit firm types',
    types: [
      'Established independent tax firms',
      'Regional advisory practices',
      'Boutique specialist tax firms',
      'Multi-office practices',
      'Private client tax specialists',
      'Corporate tax practices',
      'Sole practitioner advisors',
      'R&D tax credit specialists',
      'International tax advisors',
      'Tax dispute resolution practices',
      'Property tax specialists',
      'Firms entering new regions',
    ],
    qualification:
      'We build authority around real expertise. The firm must be able to support its positioning through appropriate qualifications, credible advisory work and responsible client communication.',
  },

  gaps: {
    heading: 'Why tax advisory firms lose AI visibility',
    items: [
      {
        t: 'Strong reputation, weak external evidence',
        b: 'The firm may have loyal clients but very few independent sources confirming its expertise.',
      },
      {
        t: 'Advisor expertise is hidden',
        b: 'Highly qualified partners are presented through short team biographies with little external recognition.',
      },
      {
        t: 'The brand is associated with the wrong specialties',
        b: 'AI may recognize the firm but connect it more strongly with secondary services than its commercial priorities.',
      },
      {
        t: 'Competitors occupy the trusted sources',
        b: 'Other firms appear in the directories, articles, reviews and comparison pages AI is already using.',
      },
      {
        t: 'Website content is too generic',
        b: 'Service pages repeat the same information found on hundreds of other tax advisory websites.',
      },
      {
        t: 'Local and brand information conflicts',
        b: 'Firm, advisor and office details are inconsistent across profiles and third-party sources.',
      },
      {
        t: 'Marketing is focused entirely on referrals',
        b: 'The firm wins work through word of mouth but has little searchable, independent authority elsewhere.',
      },
      {
        t: 'Nobody is tracking AI recommendations',
        b: 'The firm measures rankings, traffic and inquiries without knowing whether AI platforms are recommending competitors.',
      },
    ],
  },

  whyUs: {
    heading: 'Not another SEO agency repackaging its existing service',
    paragraphs: [
      'AI visibility cannot be improved through a checklist of technical changes alone. TotalAuthority combines the capabilities needed to understand and influence the wider authority landscape.',
      'The work is built around the way AI platforms are currently describing, comparing and recommending businesses.',
    ],
    items: [
      {
        t: 'Built around real outputs',
        b: 'You receive documented prompts, model results, competitor recommendations and citation sources.',
        icon: 'BarChart3',
      },
      {
        t: 'Authority before vanity metrics',
        b: 'The focus is on building a brand that can be validated across the wider web.',
        icon: 'Award',
      },
      {
        t: 'Earned media capability',
        b: 'We do not simply tell you that media authority is valuable. We have the infrastructure and journalist relationships to earn it.',
        icon: 'Megaphone',
      },
      {
        t: 'Strategy connected to execution',
        b: 'The audit and Blueprint lead directly into a defined implementation plan.',
        icon: 'Target',
      },
    ],
  },

  auditOffer: {
    heading: 'Get your Tax Advisory Firm AI Visibility Audit',
    intro:
      'See how your firm currently appears across ChatGPT, Gemini and Perplexity. Your audit will examine high-intent prompts linked to your location, specialties and desired positioning.',
    includesHeading: 'What the audit includes',
    includes: [
      'Overall AI visibility score',
      'ChatGPT visibility baseline',
      'Gemini visibility baseline',
      'Perplexity visibility baseline',
      'Brand mention tracking',
      'Website citation tracking',
      'Recommendation tracking',
      'Positioning analysis',
      'Prompt visibility map',
      'Recurring competitor analysis',
      'AI source landscape',
      'Owned vs third-party signal comparison',
      'Recommended next step',
    ],
    requestHeading: 'Request your audit',
    requestIntro:
      'Your audit is reviewed using your actual brand, market, specialties and local competitors.',
    formFields: [
      'First name and last name',
      'Business email and phone',
      'Firm name and website',
      'Primary location and number of offices',
      'Most important specialties',
      'Specialties you want to grow',
    ],
    blueprintEyebrow: 'Next step after the audit',
    blueprintHeading: 'Turn findings into a clear execution plan',
    blueprintBody:
      "The AI Authority Strategy Blueprint takes the audit's baseline and sets out the prioritized work needed across competitors, sources, media, website positioning, profiles, citations and content.",
  },

  proof: {
    heading: 'Authority building you can see',
    intro:
      'Real evidence rather than broad claims — across audit outputs, earned media, authority case studies and client testimonials.',
    cards: [
      {
        t: 'AI Visibility Audit Example',
        b: 'Anonymized reports showing overall score, mentions across each model, website citations, prompt visibility map, competitor recommendations and source landscape.',
        icon: 'BarChart3',
      },
      {
        t: 'Earned Media Results',
        b: 'Tier-one editorial coverage, dofollow media links, advisor quotes, broadcast opportunities, podcast placements and journalist relationships.',
        icon: 'Megaphone',
      },
      {
        t: 'Authority Case Studies',
        b: 'Client category, initial authority gap, work completed, media secured, visibility or SEO outcome and campaign duration.',
        icon: 'FileText',
      },
      {
        t: 'Client Testimonials',
        b: 'Quotes that reference quality of publications, strategic insight, communication, brand authority, measurable growth and advisor positioning.',
        icon: 'Award',
      },
    ],
  },

  comparison: {
    heading: 'What makes this different from traditional tax advisory marketing?',
    traditionalLabel: 'Old marketing playbook',
    traditional: [
      'Run paid ads for immediate inquiries',
      'Publish generic tax blogs',
      'Track Google rankings alone',
      'Promote claims made by the firm',
      'Focus on the firm brand only',
      'Build backlinks as isolated SEO assets',
      'Measure directory listings in isolation',
      'Optimize only the website',
    ],
    authorityLabel: 'Authority-led approach',
    authority: [
      'Build an authority footprint that supports discovery across multiple channels',
      'Create content and assets designed around specific citation and authority opportunities',
      'Track mentions, citations and recommendations across multiple AI platforms',
      'Earn independent support from trusted third parties',
      'Build the authority of the firm and its advisors',
      'Build connected media, brand, entity and citation signals',
      'Measure specialty visibility, competitor share and source influence',
      'Strengthen the wider source environment surrounding the firm',
    ],
  },

  faq: {
    intro:
      'Twelve of the questions we hear most often from tax advisory firms considering an AI visibility program.',
    items: [
      {
        q: 'What is AI visibility for a tax advisory firm?',
        a: 'AI visibility refers to whether your firm appears when people ask platforms such as ChatGPT, Gemini and Perplexity for recommendations, comparisons or information about tax advice in your area. It also includes whether your website is cited, whether your firm is accurately described, and whether your advisors are recognized for relevant expertise.',
      },
      {
        q: 'How do you measure our visibility?',
        a: 'We create a defined set of high-intent prompts based on your specialties, location and commercial priorities. We then audit the answers across ChatGPT, Gemini and Perplexity, recording brand mentions, website citations, direct recommendations, competitors and source usage.',
      },
      {
        q: 'Can you guarantee that AI will recommend us?',
        a: 'No. The platforms operate independently and their answers can change. We strengthen the authority, relevance, consistency and third-party evidence connected with your brand. These are the areas most likely to improve how your firm is understood and considered.',
      },
      {
        q: 'Is AI visibility the same as SEO?',
        a: 'No, but the two are connected. SEO focuses heavily on website rankings and organic traffic. AI visibility also includes third-party mentions, citations, advisor entities, reviews, external profiles, editorial coverage and the sources used to produce generated answers. Strong authority building can support both.',
      },
      {
        q: 'Does our firm still need local SEO?',
        a: 'Yes. Clients still use Google Search and Google Maps, while AI platforms may also rely on local business information. TotalAuthority complements local SEO by developing broader brand, advisor, media and third-party authority.',
      },
      {
        q: 'Why is earned media part of the strategy?',
        a: 'Editorial coverage gives your firm independent recognition. It can connect your advisors with relevant expertise, create authoritative mentions, earn backlinks and give both clients and AI systems additional sources through which to validate the brand.',
      },
      {
        q: 'Do you work on our website?',
        a: 'Website alignment can form part of the implementation plan. This may include positioning, specialty associations, advisor information, citable content, entity clarity, structured data and internal site recommendations. The work is directed by the gaps identified in the audit and Blueprint.',
      },
      {
        q: 'Do you create content?',
        a: 'Yes, where content has a clear authority purpose. This can include expert resources, original research, specialty guides, comparison pages, reports and other assets that may support citations, media outreach and client education.',
      },
      {
        q: 'Can you promote individual advisors and partners?',
        a: 'Yes, provided their experience and credentials support the positioning. Advisor authority can include media commentary, expert biographies, topic specialization, professional profiles and expert-led content.',
      },
      {
        q: 'Can you help a multi-office firm?',
        a: 'Yes. Multi-office firms need clear connections between the parent brand, each office, advisors, specialty offerings, local profiles and external mentions. The audit and strategy can be structured around individual markets or the wider firm.',
      },
      {
        q: 'How quickly will visibility improve?',
        a: 'There is no universal timeframe. Some improvements can occur after clearer information or stronger source coverage is discovered. Building a defensible authority footprint requires sustained execution across several areas. Progress should be judged across multiple prompts and models rather than one isolated result.',
      },
      {
        q: 'What happens after the audit?',
        a: 'The next stage is the AI Authority Strategy Blueprint. This expands the baseline findings into a prioritized plan covering competitors, sources, media, website positioning, profiles, citations, content and authority assets. TotalAuthority can then execute the strategy.',
      },
    ],
  },

  related: {
    heading: 'AI visibility for adjacent professional services',
    intro:
      'Explore how TotalAuthority approaches visibility and authority building for other professional services and advisory firms.',
  },

  finalCta: {
    eyebrow: 'Find out where you stand',
    heading: 'Is AI recommending your firm, or your competitors?',
    paragraph:
      'Your firm may already be visible for some specialties and absent for others. The only way to know is to test the questions your prospective clients are asking, examine the competitors appearing instead, and identify the sources influencing those answers. Start with a clear visibility baseline. Then build the authority required to compete.',
    footnote:
      'Measured across ChatGPT, Gemini and Perplexity using prompts tailored to your firm, specialties and location.',
  },
};
