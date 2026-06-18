import { IndustryContent } from '@/lib/industry/types';

export const businessBrokers: IndustryContent = {
  slug: 'business-brokers',

  meta: {
    title: 'AI Visibility & Authority Building for Business Brokers | TotalAuthority',
    description:
      'See whether ChatGPT, Gemini and Perplexity recommend your brokerage when prospective clients ask who can sell, value or buy a business. TotalAuthority audits your AI visibility and builds the earned media, content and authority signals that influence those answers.',
    keywords: [
      'AI visibility for business brokers',
      'business broker marketing',
      'business sales advisory SEO',
      'brokerage authority building',
      'ChatGPT business broker recommendations',
      'AI search for business brokers',
      'digital PR for business brokers',
      'business broker directory rankings',
      'BizBuySell visibility',
      'AI visibility audit',
    ],
    ogTitle: 'AI Visibility & Authority Building for Business Brokers',
    ogDescription:
      'Find out whether AI platforms recommend your brokerage or your competitors, and build the authority needed to appear in the answers prospective clients now trust.',
  },

  cta: {
    heroPrimary: 'Get Your AI Visibility Audit',
    auditSection: 'Audit My Brokerage',
    auditOffer: 'Get My Brokerage Audit',
    final: 'Get Your Brokerage AI Visibility Audit',
    mobile: 'Audit My Brokerage',
  },

  hero: {
    eyebrow: 'AI Visibility and Authority Building for Business Brokers',
    headlinePre: 'Make Your Business Brokerage the One',
    headlineHighlight: 'AI Recommends',
    headlinePost: '',
    paragraphs: [
      'Your prospective clients are asking ChatGPT, Gemini and Perplexity who to hire to sell their business, value a company, plan an exit, source a buyer or manage a confidential business sale.',
      'TotalAuthority shows you whether your brokerage appears in those answers, which competitors are being recommended instead, and which sources are influencing the results. We then build the external authority, earned media, content and brand signals needed to improve your visibility.',
    ],
    supportingLine:
      'See how your brokerage is mentioned, cited and compared across leading AI platforms.',
    footnote: 'Measured across ChatGPT, Gemini and Perplexity',
    dashboardTitle: 'Business Broker AI Visibility Audit',
  },

  dashboard: {
    score: 47,
    scoreCaption: '14/30 audited answers mentioned the brokerage',
    citedLine: '8 answers',
    citedSub: 'cited the website',
    models: [
      { name: 'ChatGPT', score: 40, m: '4/10', c: '6/10' },
      { name: 'Gemini', score: 50, m: '5/10', c: '3/10' },
      { name: 'Perplexity', score: 30, m: '3/10', c: '1/10' },
    ],
    competitorsHeading: 'Top competitors recommended instead',
    competitorsCaption: '4 of 10 prompts',
    competitors: [
      { name: 'Harbor Business Sales', count: 7 },
      { name: 'Sterling & Vale Brokers', count: 5 },
      { name: 'Cromwell Acquisitions', count: 4 },
    ],
    sources: [
      'BizBuySell',
      'BizQuest',
      'Google reviews',
      'Inc.',
      'IBBA',
      'American City Business Journals',
      'Local press',
    ],
  },

  shift: {
    heading: 'Your next client may ask AI before they search Google',
    intro:
      'Business owners are increasingly using AI platforms to shortlist brokerages, compare specialties and decide which advisors appear credible. They are asking questions such as:',
    questions: [
      'Who is the best business broker to sell my company?',
      'Which firm should I hire to value my business?',
      'Where can I find a specialist exit planning advisor?',
      'Which brokerage has the strongest reviews for confidential sales?',
      'Who is a trusted advisor for a management buyout?',
      'Which broker specializes in selling businesses in my sector?',
    ],
    paragraphs: [
      'AI can answer those questions without sending the user through a traditional list of search results. Your brokerage may have an excellent deal-closing record, experienced advisors and years of successful deals behind it. That does not guarantee you will be included.',
      'AI systems form their answers using the sources and signals they can find across the wider web. If your competitors are better represented across those sources, they may be recommended ahead of you.',
    ],
    callout:
      'The brokerage being recommended is not necessarily the best brokerage. It is often the firm with the clearest and strongest visible authority.',
  },

  audit: {
    heading: 'Find out exactly where your brokerage stands',
    introPre: 'Our ',
    introPost:
      " tests the commercially valuable questions your clients are likely to ask. We don't simply search for your brokerage name. We test the service, deal-type and local discovery prompts that could lead to a new engagement.",
    outputCards: [
      {
        t: 'Overall AI Visibility Score',
        b: 'A clear baseline showing how consistently your brokerage appears across the audited answers.',
      },
      {
        t: 'Model-by-Model Results',
        b: 'Separate visibility scores for ChatGPT, Gemini and Perplexity.',
      },
      {
        t: 'Mention and Citation Tracking',
        b: 'We identify whether your brokerage appeared, whether your website was cited, whether you were actively recommended, and whether your positioning was accurately understood.',
      },
      {
        t: 'Prompt Visibility Map',
        b: 'A simple view showing the services and searches where your brokerage is mentioned, not mentioned, recommended or cited.',
      },
    ],
    promptCategories: [
      'Best business broker in your city',
      'Best broker to sell a business',
      'Best business valuation advisor',
      'Best exit planning advisor',
      'Best mergers and acquisitions advisory',
      'Best broker for confidential sales',
      'Best management buyout advisor',
      'Best business sale specialist',
      'Best acquisition search advisor',
      'Best succession planning advisor',
      'Best broker for natural-language exit queries',
      'Top-rated business brokers near me',
    ],
  },

  competitorIntel: {
    heading: 'See who AI recommends instead',
    intro:
      'A missing recommendation is only part of the picture. The more useful question is which competitors appear instead, how frequently they are recommended, and why AI associates them more strongly with a service or location.',
    identifiesHeading: 'Our audit identifies',
    identifies: [
      'Competitors appearing across multiple AI models',
      'Firms repeatedly recommended for priority services',
      'Competitors associated with particular deal types',
      'The prompts where your brokerage is absent',
      'The websites supporting competitor recommendations',
      'The firms gaining visibility despite having a weaker real-world track record',
    ],
    tableHeading: 'Recurring competitors',
    tableRows: [
      { name: 'Harbor Business Sales', m: 3, p: 7, f: '23×' },
      { name: 'Sterling & Vale Brokers', m: 2, p: 5, f: '14×' },
      { name: 'Cromwell Acquisitions', m: 3, p: 4, f: '11×' },
      { name: 'Marchwood Corporate', m: 1, p: 3, f: '6×' },
      { name: 'Lexington Deal Advisors', m: 2, p: 2, f: '5×' },
    ],
    note:
      'This gives you a practical competitive view based on AI-generated recommendations, rather than assumptions about who your online competitors are.',
  },

  sourceLandscape: {
    heading: 'Discover which sources are influencing AI',
    paragraphs: [
      'Improving AI visibility is not only a website project. AI platforms may rely on business-for-sale marketplaces, trade press, business publications, professional associations, local recommendation pages, review platforms, listicles, Reddit discussions, advisor profiles, service comparison pages, competitor websites, social profiles and your own service and location pages.',
      'Our source analysis identifies which websites appear most frequently across the answers being generated in your market. This allows us to see where your brand is already represented, where competitors have an advantage, and where new authority needs to be created.',
    ],
    pullQuoteLine1: 'Your website tells AI what you say about yourself.',
    pullQuoteLead: 'Third-party sources help validate',
    pullQuoteHighlight: 'whether that claim should be trusted.',
    topSourcesTitle: 'Top recurring sources',
    topSourcesBody: 'The websites appearing most frequently across audited answers.',
    topSources: [
      { name: 'BizBuySell', pct: 89 },
      { name: 'BizQuest', pct: 72 },
      { name: 'American City Business Journals', pct: 58 },
      { name: 'Inc.', pct: 36 },
    ],
    multiModelTitle: 'Used across multiple AI models',
    multiModelBody: 'Sources relied upon by more than one platform.',
    multiModel: [
      { name: 'Reddit', models: ['ChatGPT', 'Gemini', 'Perplexity'] },
      { name: 'Google reviews', models: ['ChatGPT', 'Perplexity'] },
      { name: 'American City Business Journals', models: ['Gemini', 'Perplexity'] },
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
      'Being mentioned is not enough if your brokerage is associated with the wrong services or described too generically. We compare what you want AI to understand with what the platforms currently say about your firm.',
    positioningHeading: 'Positioning examples',
    positioning: [
      'Leading brokerage for owner-operated business sales',
      'Trusted advisor on company valuations',
      'Specialist firm for exit planning and succession',
      'Recognized authority on mergers and acquisitions',
      'Premier advisor on management buyouts and buy-ins',
      'Independently respected sector-focused brokerage',
      'Multi-office practice with experienced deal advisors',
    ],
    assessHeading: 'We assess whether AI accurately understands',
    assess: [
      'Who your brokerage serves',
      'Where you operate',
      'Which services you specialize in',
      'What differentiates your approach',
      'Who your advisors are',
      'Which credentials support your expertise',
      'Which deals you are best placed to handle',
      'How your brokerage compares with local competitors',
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
        body: 'High-intent prompts tested across ChatGPT, Gemini and Perplexity. We measure mentions, citations, recommendations, positioning, service visibility, local visibility, competitors and sources.',
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
        body: 'We position your senior advisors as expert sources for journalists covering business sales, dealmaking, the economy, entrepreneurship and corporate finance — for editorial features, expert commentary and authoritative backlinks.',
        icon: 'Megaphone',
      },
      {
        num: '04',
        title: 'Third-Party Authority Development',
        body: 'We strengthen your presence across business-for-sale marketplaces, review platforms, advisor profiles, local business resources, service comparison pages and professional associations.',
        icon: 'Layers',
      },
      {
        num: '05',
        title: 'Brand and Entity Alignment',
        body: 'We align firm names, locations, advisor biographies, credentials, service categories, social profiles, directory listings and website schema so AI systems build a clearer understanding of the brokerage.',
        icon: 'UserCheck',
      },
      {
        num: '06',
        title: 'Citable Content and Authority Assets',
        body: 'Original research, sector guides, advisor-led explainers, market insights, comparison pages, client decision tools and proprietary deal data — each asset has a defined role in the authority strategy.',
        icon: 'FileText',
      },
      {
        num: '07',
        title: 'Ongoing AI Visibility Tracking',
        body: 'We continue testing the prompts most valuable to your brokerage: recommendation frequency, brand mentions, service visibility, competitor share of voice, citation sources and positioning accuracy.',
        icon: 'BarChart3',
      },
      {
        num: '08',
        title: 'Local and Multi-Office Authority',
        body: 'For brokerages operating across one or more offices, we strengthen the local signals AI relies on: office-specific profiles, regional press, community references, structured local data and office-level advisor recognition.',
        icon: 'Building2',
      },
      {
        num: '09',
        title: 'Reputation and Review Authority',
        body: 'We strengthen the consistency and depth of the review platforms and directories AI weighs most heavily for brokerages — Google, BizBuySell, BizQuest and the IBBA — so sentiment, volume and recency reinforce recommendations.',
        icon: 'Star',
      },
    ],
  },

  earnedMedia: {
    heading: 'Real authority is earned outside your own website',
    paragraphs: [
      'Every brokerage can publish claims about being trusted, experienced or market-leading. Independent media coverage gives those claims external support.',
      'When an advisor is quoted in a recognized publication, several things happen:',
    ],
    effectsIntro: 'When an advisor is quoted in a recognized publication, several things happen:',
    effects: [
      'The advisor becomes associated with a relevant area of expertise',
      'The brokerage earns an independent brand mention',
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
      'In business brokerage, the person leading the deal can be as important as the firm itself. Your managing directors, deal leads, valuation experts and specialist advisors hold expertise that can strengthen the authority of the entire brand.',
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
      'An advisor with genuine expertise can become a recognized source for both clients and journalists. That authority then supports the firm they represent.',
  },

  services: {
    sectionLabel: 'Service Visibility',
    heading: 'Build visibility around the services that generate fees',
    intro:
      'Your campaign should not chase vague visibility. It should strengthen the association between your brokerage, location, advisors and the services you want to grow.',
    focusHeading: 'A brokerage strategy may focus on',
    badge: '24 services',
    items: [
      'Business sales',
      'Business valuations',
      'Exit planning',
      'Mergers and acquisitions advisory',
      'Buyer sourcing',
      'Confidential marketing',
      'Deal negotiation',
      'Due diligence support',
      'Management buyouts',
      'Management buy-ins',
      'Succession planning',
      'Business sales advisory',
      'Acquisition search',
      'Sell-side due diligence',
      'Offering memorandum preparation',
      'Earn-out structuring',
      'Strategic sale advisory',
      'Private equity introductions',
      'Stock sales',
      'Asset sales',
      'Transaction project management',
      'Tax-efficient exit advice',
      'Closing support',
      'Post-sale transition',
    ],
    closing:
      'A brokerage may be highly visible for one service and completely absent for another. Our process exposes those differences. Every service is reviewed separately because the competitors, sources and authority signals can differ considerably.',
  },

  process: {
    eyebrow: 'Our Process',
    heading: 'From AI visibility baseline to authority building',
    steps: [
      {
        n: '01',
        t: 'Define the Commercial Priorities',
        b: 'We identify the services, sectors and client searches most valuable to your brokerage. This prevents the campaign from becoming a broad exercise with no commercial focus.',
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
        b: 'We improve the clarity and consistency of brand positioning, advisor entities, service associations, profiles, website information, citations, structured data and local signals.',
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
      'The brokerage appears inconsistently',
      'Important service prompts produce no mention',
      'Competitors dominate recommendations',
      'AI uses weak or inaccurate positioning',
      'The website receives few citations',
      'Advisors have little external authority',
      'Third-party source coverage is limited',
      'The firm does not know which sources influence results',
    ],
    after: [
      'The brokerage appears across more valuable prompts',
      'Priority services have stronger brand association',
      'Brand descriptions become more accurate',
      'Advisor expertise is clearer',
      'More trusted sources mention the brokerage',
      'The website earns relevant citations',
      'Competitive gaps begin to reduce',
      'Progress is monitored across multiple AI platforms',
    ],
  },

  whoFor: {
    heading: 'Built for brokerages with genuine expertise to promote',
    intro:
      'TotalAuthority is best suited to established brokerages that have credible advisors, strong deal-closing records and the capacity to convert increased visibility into engagements.',
    typesHeading: 'Best-fit brokerage types',
    types: [
      'Established business brokerages',
      'Boutique M&A advisory firms',
      'Owner-operated business specialists',
      'Sector-focused brokerages',
      'Corporate finance boutiques',
      'Exit planning specialists',
      'Multi-office brokerages',
      'Management buyout advisors',
      'Acquisition search firms',
      'Succession planning practices',
      'Independent dealmaking partnerships',
      'Firms entering new regions',
    ],
    qualification:
      'We build authority around real expertise. The brokerage must be able to support its positioning through appropriate credentials, a credible deal-closing record and responsible client communication.',
  },

  gaps: {
    heading: 'Why business brokers lose AI visibility',
    items: [
      {
        t: 'Strong reputation, weak external evidence',
        b: 'The brokerage may have loyal clients but very few independent sources confirming its expertise.',
      },
      {
        t: 'Advisor expertise is hidden',
        b: 'Highly experienced dealmakers are presented through short team biographies with little external recognition.',
      },
      {
        t: 'The brand is associated with the wrong services',
        b: 'AI may recognize the firm but connect it more strongly with secondary services than its commercial priorities.',
      },
      {
        t: 'Competitors occupy the trusted sources',
        b: 'Other firms appear in the marketplaces, articles, reviews and comparison pages AI is already using.',
      },
      {
        t: 'Website content is too generic',
        b: 'Service pages repeat the same information found on hundreds of other brokerage websites.',
      },
      {
        t: 'Local and brand information conflicts',
        b: 'Firm, advisor and office details are inconsistent across profiles and third-party sources.',
      },
      {
        t: 'Marketing is focused entirely on referrals',
        b: 'The brokerage wins work through word of mouth but has little searchable, independent authority elsewhere.',
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
    heading: 'Get your Brokerage AI Visibility Audit',
    intro:
      'See how your brokerage currently appears across ChatGPT, Gemini and Perplexity. Your audit will examine high-intent prompts linked to your location, services and desired positioning.',
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
      'Your audit is reviewed using your actual brand, market, services and local competitors.',
    formFields: [
      'First name and last name',
      'Business email and phone',
      'Brokerage name and website',
      'Primary location and number of offices',
      'Most important services',
      'Services you want to grow',
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
    heading: 'What makes this different from traditional brokerage marketing?',
    traditionalLabel: 'Old marketing playbook',
    traditional: [
      'Run paid ads for immediate inquiries',
      'Publish generic business-sale blogs',
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
      'Build the authority of the brokerage and its advisors',
      'Build connected media, brand, entity and citation signals',
      'Measure service visibility, competitor share and source influence',
      'Strengthen the wider source environment surrounding the brokerage',
    ],
  },

  faq: {
    intro:
      'Twelve of the questions we hear most often from business brokers considering an AI visibility program.',
    items: [
      {
        q: 'What is AI visibility for a business broker?',
        a: 'AI visibility refers to whether your brokerage appears when people ask platforms such as ChatGPT, Gemini and Perplexity for recommendations, comparisons or information about business sales and advisory services in your area. It also includes whether your website is cited, whether your firm is accurately described, and whether your advisors are recognized for relevant expertise.',
      },
      {
        q: 'How do you measure our visibility?',
        a: 'We create a defined set of high-intent prompts based on your services, location and commercial priorities. We then audit the answers across ChatGPT, Gemini and Perplexity, recording brand mentions, website citations, direct recommendations, competitors and source usage.',
      },
      {
        q: 'Can you guarantee that AI will recommend us?',
        a: 'No. The platforms operate independently and their answers can change. We strengthen the authority, relevance, consistency and third-party evidence connected with your brand. These are the areas most likely to improve how your brokerage is understood and considered.',
      },
      {
        q: 'Is AI visibility the same as SEO?',
        a: 'No, but the two are connected. SEO focuses heavily on website rankings and organic traffic. AI visibility also includes third-party mentions, citations, advisor entities, reviews, external profiles, editorial coverage and the sources used to produce generated answers. Strong authority building can support both.',
      },
      {
        q: 'Does our brokerage still need local SEO?',
        a: 'Yes. Clients still use Google Search and Google Maps, while AI platforms may also rely on local business information. TotalAuthority complements local SEO by developing broader brand, advisor, media and third-party authority.',
      },
      {
        q: 'Why is earned media part of the strategy?',
        a: 'Editorial coverage gives your brokerage independent recognition. It can connect your advisors with relevant expertise, create authoritative mentions, earn backlinks and give both clients and AI systems additional sources through which to validate the brand.',
      },
      {
        q: 'Do you work on our website?',
        a: 'Website alignment can form part of the implementation plan. This may include positioning, service associations, advisor information, citable content, entity clarity, structured data and internal site recommendations. The work is directed by the gaps identified in the audit and Blueprint.',
      },
      {
        q: 'Do you create content?',
        a: 'Yes, where content has a clear authority purpose. This can include expert resources, original research, sector guides, comparison pages, reports and other assets that may support citations, media outreach and client education.',
      },
      {
        q: 'Can you promote individual advisors and directors?',
        a: 'Yes, provided their experience and credentials support the positioning. Advisor authority can include media commentary, expert biographies, topic specialization, professional profiles and expert-led content.',
      },
      {
        q: 'Can you help a multi-office brokerage?',
        a: 'Yes. Multi-office brokerages need clear connections between the parent brand, each office, advisors, service offerings, local profiles and external mentions. The audit and strategy can be structured around individual markets or the wider firm.',
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
    heading: 'Is AI recommending your brokerage, or your competitors?',
    paragraph:
      'Your brokerage may already be visible for some services and absent for others. The only way to know is to test the questions your prospective clients are asking, examine the competitors appearing instead, and identify the sources influencing those answers. Start with a clear visibility baseline. Then build the authority required to compete.',
    footnote:
      'Measured across ChatGPT, Gemini and Perplexity using prompts tailored to your brokerage, services and location.',
  },
};
