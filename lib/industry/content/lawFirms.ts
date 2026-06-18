import { IndustryContent } from '@/lib/industry/types';

export const lawFirms: IndustryContent = {
  slug: 'law-firms',

  meta: {
    title: 'AI Visibility & Authority Building for Law Firms | TotalAuthority',
    description:
      'See whether ChatGPT, Gemini and Perplexity recommend your firm when prospective clients ask for legal advice. TotalAuthority audits your AI visibility and builds the earned media, content and authority signals that influence those answers.',
    keywords: [
      'AI visibility for law firms',
      'law firm marketing',
      'attorney SEO',
      'legal authority building',
      'ChatGPT law firm recommendations',
      'AI search for attorneys',
      'digital PR for law firms',
      'legal directory rankings',
      'Chambers USA visibility',
      'AI visibility audit',
    ],
    ogTitle: 'AI Visibility & Authority Building for Law Firms',
    ogDescription:
      'Find out whether AI platforms recommend your firm or your competitors, and build the authority needed to appear in the answers prospective clients now trust.',
  },

  cta: {
    heroPrimary: 'Get Your AI Visibility Audit',
    auditSection: 'Audit My Law Firm',
    auditOffer: 'Get My Law Firm Audit',
    final: 'Get Your Law Firm AI Visibility Audit',
    mobile: 'Audit My Law Firm',
  },

  hero: {
    eyebrow: 'AI Visibility and Authority Building for Law Firms',
    headlinePre: 'Make Your Law Firm the One',
    headlineHighlight: 'AI Recommends',
    headlinePost: '',
    paragraphs: [
      'Your prospective clients are asking ChatGPT, Gemini and Perplexity who to hire for commercial disputes, employment matters, family law, real estate closings, probate and corporate transactions.',
      'TotalAuthority shows you whether your firm appears in those answers, which competitors are being recommended instead, and which sources are influencing the results. We then build the external authority, earned media, content and brand signals needed to improve your visibility.',
    ],
    supportingLine:
      'See how your firm is mentioned, cited and compared across leading AI platforms.',
    footnote: 'Measured across ChatGPT, Gemini and Perplexity',
    dashboardTitle: 'Law Firm AI Visibility Audit',
  },

  dashboard: {
    score: 51,
    scoreCaption: '15/30 audited answers mentioned the firm',
    citedLine: '9 answers',
    citedSub: 'cited the website',
    models: [
      { name: 'ChatGPT', score: 40, m: '4/10', c: '6/10' },
      { name: 'Gemini', score: 50, m: '5/10', c: '3/10' },
      { name: 'Perplexity', score: 30, m: '3/10', c: '1/10' },
    ],
    competitorsHeading: 'Top competitors recommended instead',
    competitorsCaption: '4 of 10 prompts',
    competitors: [
      { name: 'Hartwell & Stone', count: 7 },
      { name: 'Brightcourt Legal', count: 5 },
      { name: 'Marlow Reeves LLP', count: 4 },
    ],
    sources: [
      'Chambers USA',
      'The Legal 500 United States',
      'American Bar Association',
      'Reddit',
      'Avvo',
      'Local press',
      'Legal directory',
    ],
  },

  shift: {
    heading: 'Your next client may ask AI before they search Google',
    intro:
      'People are increasingly using AI platforms to shortlist firms, compare practice areas and decide which attorneys appear credible. They are asking questions such as:',
    questions: [
      'Who is the best employment attorney near me?',
      'Which firm should I use for a commercial dispute in Chicago?',
      'Where can I find a specialist family law attorney?',
      'Which firm has the strongest reviews for residential real estate closings?',
      'Who is a trusted attorney for wills and probate?',
      'Which law firm specializes in medical malpractice claims?',
    ],
    paragraphs: [
      'AI can answer those questions without sending the user through a traditional list of search results. Your firm may have an excellent reputation, experienced partners and decades of casework behind it. That does not guarantee you will be included.',
      'AI systems form their answers using the sources and signals they can find across the wider web. If your competitors are better represented across those sources, they may be recommended ahead of you.',
    ],
    callout:
      'The firm being recommended is not necessarily the best firm. It is often the firm with the clearest and strongest visible authority.',
  },

  audit: {
    heading: 'Find out exactly where your firm stands',
    introPre: 'Our ',
    introPost:
      " tests the commercially valuable questions your clients are likely to ask. We don't simply search for your firm name. We test the practice area, service and local discovery prompts that could lead to a new engagement.",
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
        b: 'A simple view showing the practice areas and searches where your firm is mentioned, not mentioned, recommended or cited.',
      },
    ],
    promptCategories: [
      'Best law firm in your city',
      'Best commercial litigation attorney',
      'Best employment law firm',
      'Best family law attorney',
      'Best real estate closing attorney',
      'Best probate and estate attorney',
      'Best personal injury firm',
      'Best corporate and M&A firm',
      'Best immigration attorney',
      'Best dispute resolution firm',
      'Best firm for natural-language legal queries',
      'Top-rated attorneys near me',
    ],
  },

  competitorIntel: {
    heading: 'See who AI recommends instead',
    intro:
      'A missing recommendation is only part of the picture. The more useful question is which competitors appear instead, how frequently they are recommended, and why AI associates them more strongly with a practice area or location.',
    identifiesHeading: 'Our audit identifies',
    identifies: [
      'Competitors appearing across multiple AI models',
      'Firms repeatedly recommended for priority practice areas',
      'Competitors associated with particular services',
      'The prompts where your firm is absent',
      'The websites supporting competitor recommendations',
      'The firms gaining visibility despite having weaker real-world credentials',
    ],
    tableHeading: 'Recurring competitors',
    tableRows: [
      { name: 'Hartwell & Stone', m: 3, p: 7, f: '23×' },
      { name: 'Brightcourt Legal', m: 2, p: 5, f: '14×' },
      { name: 'Marlow Reeves LLP', m: 3, p: 4, f: '11×' },
      { name: 'Pennington Clarke', m: 1, p: 3, f: '6×' },
      { name: 'Vance & Whitmore', m: 2, p: 2, f: '5×' },
    ],
    note:
      'This gives you a practical competitive view based on AI-generated recommendations, rather than assumptions about who your online competitors are.',
  },

  sourceLandscape: {
    heading: 'Discover which sources are influencing AI',
    paragraphs: [
      'Improving AI visibility is not only a website project. AI platforms may rely on legal directories, trade press, bar associations, local recommendation pages, review platforms, listicles, Reddit discussions, attorney profiles, practice area comparison pages, competitor websites, social profiles and your own service and location pages.',
      'Our source analysis identifies which websites appear most frequently across the answers being generated in your market. This allows us to see where your brand is already represented, where competitors have an advantage, and where new authority needs to be created.',
    ],
    pullQuoteLine1: 'Your website tells AI what you say about yourself.',
    pullQuoteLead: 'Third-party sources help validate',
    pullQuoteHighlight: 'whether that claim should be trusted.',
    topSourcesTitle: 'Top recurring sources',
    topSourcesBody: 'The websites appearing most frequently across audited answers.',
    topSources: [
      { name: 'Chambers USA', pct: 90 },
      { name: 'The Legal 500 United States', pct: 76 },
      { name: 'Super Lawyers', pct: 62 },
      { name: 'Local press', pct: 37 },
    ],
    multiModelTitle: 'Used across multiple AI models',
    multiModelBody: 'Sources relied upon by more than one platform.',
    multiModel: [
      { name: 'Reddit', models: ['ChatGPT', 'Gemini', 'Perplexity'] },
      { name: 'ABA Journal', models: ['ChatGPT', 'Perplexity'] },
      { name: 'Law.com', models: ['Gemini', 'Perplexity'] },
    ],
    ownedTitle: 'Owned vs third-party signals',
    ownedBody:
      'A comparison between citations from your own website and appearances from external sources.',
    ownedPct: 23,
    thirdPartyPct: 77,
  },

  brand: {
    heading: 'Does AI understand what you want to be known for?',
    intro:
      'Being mentioned is not enough if your firm is associated with the wrong practice areas or described too generically. We compare what you want AI to understand with what the platforms currently say about your firm.',
    positioningHeading: 'Positioning examples',
    positioning: [
      'Leading firm for complex commercial litigation',
      'Trusted practice for employment and HR matters',
      'Specialist firm for family law and children matters',
      'Local authority for residential real estate closings',
      'Premier advisor on corporate transactions and M&A',
      'Independently recognized private client and probate team',
      'Multi-office practice with experienced partners',
    ],
    assessHeading: 'We assess whether AI accurately understands',
    assess: [
      'Who your firm serves',
      'Where you operate',
      'Which practice areas you specialize in',
      'What differentiates your approach',
      'Who your attorneys are',
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
        body: 'High-intent prompts tested across ChatGPT, Gemini and Perplexity. We measure mentions, citations, recommendations, positioning, practice-area visibility, local visibility, competitors and sources.',
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
        body: 'We position your qualified attorneys as expert sources for journalists covering legal affairs, business, employment, real estate and personal finance — for editorial features, expert commentary and authoritative backlinks.',
        icon: 'Megaphone',
      },
      {
        num: '04',
        title: 'Third-Party Authority Development',
        body: 'We strengthen your presence across legal directories, review platforms, attorney profiles, local business resources, practice area comparison pages and professional associations.',
        icon: 'Layers',
      },
      {
        num: '05',
        title: 'Brand and Entity Alignment',
        body: 'We align firm names, locations, attorney biographies, credentials, practice area categories, social profiles, directory listings and website schema so AI systems build a clearer understanding of the firm.',
        icon: 'UserCheck',
      },
      {
        num: '06',
        title: 'Citable Content and Authority Assets',
        body: 'Original research, practice area guides, attorney-led explainers, legal updates, comparison pages, client decision tools and proprietary data — each asset has a defined role in the authority strategy.',
        icon: 'FileText',
      },
      {
        num: '07',
        title: 'Ongoing AI Visibility Tracking',
        body: 'We continue testing the prompts most valuable to your firm: recommendation frequency, brand mentions, practice-area visibility, competitor share of voice, citation sources and positioning accuracy.',
        icon: 'BarChart3',
      },
      {
        num: '08',
        title: 'Local and Multi-Office Authority',
        body: 'For firms operating across one or more offices, we strengthen the local signals AI relies on: office-specific profiles, regional press, community references, structured local data and office-level attorney recognition.',
        icon: 'Building2',
      },
      {
        num: '09',
        title: 'Reputation and Review Authority',
        body: 'We strengthen the consistency and depth of the review platforms and directories AI weighs most heavily for firms — Google reviews, Avvo, Martindale-Hubbell and Super Lawyers — so sentiment, volume and recency reinforce recommendations.',
        icon: 'Star',
      },
    ],
  },

  earnedMedia: {
    heading: 'Real authority is earned outside your own website',
    paragraphs: [
      'Every firm can publish claims about being trusted, experienced or market-leading. Independent media coverage gives those claims external support.',
      'When an attorney is quoted in a recognized publication, several things happen:',
    ],
    effectsIntro: 'When an attorney is quoted in a recognized publication, several things happen:',
    effects: [
      'The attorney becomes associated with a relevant area of expertise',
      'The firm earns an independent brand mention',
      'The website may receive an authoritative backlink',
      'Search engines gain another reference point',
      'AI systems gain external information about the brand',
      'Clients see evidence that the expert is trusted by journalists',
    ],
    closing:
      'The same piece of editorial coverage can support brand discovery, SEO, attorney authority, client confidence and AI visibility. This is why earned media forms a central part of the TotalAuthority process.',
    logosHeading: 'Publications featuring our clients and their experts',
  },

  practitioner: {
    sectionLabel: 'Attorney Authority',
    heading: 'Clients trust attorneys, not faceless firm pages',
    paragraphs: [
      'In legal services, the person handling the matter can be as important as the firm itself. Your managing partner, practice group leaders, associates and specialist attorneys hold expertise that can strengthen the authority of the entire brand.',
      'We help develop that expertise into visible authority through:',
    ],
    developIntro: 'We help develop that expertise into visible authority through:',
    chips: [
      'Attorney positioning',
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
      'An attorney with genuine expertise can become a recognized source for both clients and journalists. That authority then supports the firm they represent.',
  },

  services: {
    sectionLabel: 'Practice Area Visibility',
    heading: 'Build visibility around the practice areas that generate fees',
    intro:
      'Your campaign should not chase vague visibility. It should strengthen the association between your firm, location, attorneys and the services you want to grow.',
    focusHeading: 'A law firm strategy may focus on',
    badge: '24 practice areas',
    items: [
      'Commercial litigation',
      'Corporate and M&A',
      'Employment law',
      'Family law',
      'Residential real estate closings',
      'Commercial real estate',
      'Wills and probate',
      'Trusts and estate planning',
      'Personal injury',
      'Medical malpractice',
      'Immigration',
      'Intellectual property',
      'Dispute resolution',
      'Bankruptcy',
      'Construction law',
      'Data privacy and compliance',
      'Criminal defense',
      'Landlord-tenant',
      'Debt collection',
      'Will contests',
      'Professional malpractice',
      'Tax law',
      'Shareholder disputes',
      'Regulatory and compliance',
    ],
    closing:
      'A firm may be highly visible for one practice area and completely absent for another. Our process exposes those differences. Every practice area is reviewed separately because the competitors, sources and authority signals can differ considerably.',
  },

  process: {
    eyebrow: 'Our Process',
    heading: 'From AI visibility baseline to authority building',
    steps: [
      {
        n: '01',
        t: 'Define the Commercial Priorities',
        b: 'We identify the practice areas, locations and client searches most valuable to your firm. This prevents the campaign from becoming a broad exercise with no commercial focus.',
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
        b: 'We improve the clarity and consistency of brand positioning, attorney entities, practice area associations, profiles, website information, citations, structured data and local signals.',
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
      'Important practice area prompts produce no mention',
      'Competitors dominate recommendations',
      'AI uses weak or inaccurate positioning',
      'The website receives few citations',
      'Attorneys have little external authority',
      'Third-party source coverage is limited',
      'The firm does not know which sources influence results',
    ],
    after: [
      'The firm appears across more valuable prompts',
      'Priority practice areas have stronger brand association',
      'Brand descriptions become more accurate',
      'Attorney expertise is clearer',
      'More trusted sources mention the firm',
      'The website earns relevant citations',
      'Competitive gaps begin to reduce',
      'Progress is monitored across multiple AI platforms',
    ],
  },

  whoFor: {
    heading: 'Built for firms with genuine expertise to promote',
    intro:
      'TotalAuthority is best suited to established firms that have credible attorneys, strong client service and the capacity to convert increased visibility into new engagements.',
    typesHeading: 'Best-fit firm types',
    types: [
      'Established main street firms',
      'Regional full-service firms',
      'Boutique commercial firms',
      'Multi-office practices',
      'Specialist litigation firms',
      'Solo and small private practice firms',
      'Litigation and trial firms',
      'Real estate-led firms',
      'Personal injury practices',
      'Immigration practices',
      'Family law specialists',
      'Firms entering new regions',
    ],
    qualification:
      'We build authority around real expertise. The firm must be able to support its positioning through appropriate qualifications, credible casework and responsible client communication.',
  },

  gaps: {
    heading: 'Why law firms lose AI visibility',
    items: [
      {
        t: 'Strong reputation, weak external evidence',
        b: 'The firm may have loyal clients but very few independent sources confirming its expertise.',
      },
      {
        t: 'Attorney expertise is hidden',
        b: 'Highly qualified partners are presented through short team biographies with little external recognition.',
      },
      {
        t: 'The brand is associated with the wrong practice areas',
        b: 'AI may recognize the firm but connect it more strongly with secondary services than its commercial priorities.',
      },
      {
        t: 'Competitors occupy the trusted sources',
        b: 'Other firms appear in the directories, articles, reviews and comparison pages AI is already using.',
      },
      {
        t: 'Website content is too generic',
        b: 'Practice area pages repeat the same information found on hundreds of other law firm websites.',
      },
      {
        t: 'Local and brand information conflicts',
        b: 'Firm, attorney and office details are inconsistent across profiles and third-party sources.',
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
    heading: 'Get your Law Firm AI Visibility Audit',
    intro:
      'See how your firm currently appears across ChatGPT, Gemini and Perplexity. Your audit will examine high-intent prompts linked to your location, practice areas and desired positioning.',
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
      'Your audit is reviewed using your actual brand, market, practice areas and local competitors.',
    formFields: [
      'First name and last name',
      'Business email and phone',
      'Firm name and website',
      'Primary location and number of offices',
      'Most important practice areas',
      'Practice areas you want to grow',
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
        b: 'Tier-one editorial coverage, dofollow media links, attorney quotes, broadcast opportunities, podcast placements and journalist relationships.',
        icon: 'Megaphone',
      },
      {
        t: 'Authority Case Studies',
        b: 'Client category, initial authority gap, work completed, media secured, visibility or SEO outcome and campaign duration.',
        icon: 'FileText',
      },
      {
        t: 'Client Testimonials',
        b: 'Quotes that reference quality of publications, strategic insight, communication, brand authority, measurable growth and attorney positioning.',
        icon: 'Award',
      },
    ],
  },

  comparison: {
    heading: 'What makes this different from traditional law firm marketing?',
    traditionalLabel: 'Old marketing playbook',
    traditional: [
      'Run paid ads for immediate inquiries',
      'Publish generic practice area blogs',
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
      'Build the authority of the firm and its attorneys',
      'Build connected media, brand, entity and citation signals',
      'Measure practice area visibility, competitor share and source influence',
      'Strengthen the wider source environment surrounding the firm',
    ],
  },

  faq: {
    intro:
      'Twelve of the questions we hear most often from law firms considering an AI visibility program.',
    items: [
      {
        q: 'What is AI visibility for a law firm?',
        a: 'AI visibility refers to whether your firm appears when people ask platforms such as ChatGPT, Gemini and Perplexity for recommendations, comparisons or information about legal services in your area. It also includes whether your website is cited, whether your firm is accurately described, and whether your attorneys are recognized for relevant expertise.',
      },
      {
        q: 'How do you measure our visibility?',
        a: 'We create a defined set of high-intent prompts based on your practice areas, location and commercial priorities. We then audit the answers across ChatGPT, Gemini and Perplexity, recording brand mentions, website citations, direct recommendations, competitors and source usage.',
      },
      {
        q: 'Can you guarantee that AI will recommend us?',
        a: 'No. The platforms operate independently and their answers can change. We strengthen the authority, relevance, consistency and third-party evidence connected with your brand. These are the areas most likely to improve how your firm is understood and considered.',
      },
      {
        q: 'Is AI visibility the same as SEO?',
        a: 'No, but the two are connected. SEO focuses heavily on website rankings and organic traffic. AI visibility also includes third-party mentions, citations, attorney entities, reviews, external profiles, editorial coverage and the sources used to produce generated answers. Strong authority building can support both.',
      },
      {
        q: 'Does our firm still need local SEO?',
        a: 'Yes. Clients still use Google Search and Google Maps, while AI platforms may also rely on local business information. TotalAuthority complements local SEO by developing broader brand, attorney, media and third-party authority.',
      },
      {
        q: 'Why is earned media part of the strategy?',
        a: 'Editorial coverage gives your firm independent recognition. It can connect your attorneys with relevant expertise, create authoritative mentions, earn backlinks and give both clients and AI systems additional sources through which to validate the brand.',
      },
      {
        q: 'Do you work on our website?',
        a: 'Website alignment can form part of the implementation plan. This may include positioning, practice area associations, attorney information, citable content, entity clarity, structured data and internal site recommendations. The work is directed by the gaps identified in the audit and Blueprint.',
      },
      {
        q: 'Do you create content?',
        a: 'Yes, where content has a clear authority purpose. This can include expert resources, original research, practice area guides, comparison pages, reports and other assets that may support citations, media outreach and client education.',
      },
      {
        q: 'Can you promote individual attorneys and partners?',
        a: 'Yes, provided their experience and credentials support the positioning. Attorney authority can include media commentary, expert biographies, topic specialization, professional profiles and expert-led content.',
      },
      {
        q: 'Can you help a multi-office firm?',
        a: 'Yes. Multi-office firms need clear connections between the parent brand, each office, attorneys, practice area offerings, local profiles and external mentions. The audit and strategy can be structured around individual markets or the wider firm.',
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
      'Your firm may already be visible for some practice areas and absent for others. The only way to know is to test the questions your prospective clients are asking, examine the competitors appearing instead, and identify the sources influencing those answers. Start with a clear visibility baseline. Then build the authority required to compete.',
    footnote:
      'Measured across ChatGPT, Gemini and Perplexity using prompts tailored to your firm, practice areas and location.',
  },
};
