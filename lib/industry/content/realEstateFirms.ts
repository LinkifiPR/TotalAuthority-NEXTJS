import { IndustryContent } from '@/lib/industry/types';

export const realEstateFirms: IndustryContent = {
  slug: 'real-estate-firms',

  meta: {
    title: 'AI Visibility & Authority Building for Real Estate Firms | TotalAuthority',
    description:
      'See whether ChatGPT, Gemini and Perplexity recommend your agency when prospective clients ask who to use to buy, sell or let property. TotalAuthority audits your AI visibility and builds the earned media, content and authority signals that influence those answers.',
    keywords: [
      'AI visibility for real estate firms',
      'estate agent marketing',
      'estate agency SEO',
      'property authority building',
      'ChatGPT estate agent recommendations',
      'AI search for estate agents',
      'digital PR for estate agents',
      'property portal rankings',
      'Rightmove and Zoopla visibility',
      'AI visibility audit',
    ],
    ogTitle: 'AI Visibility & Authority Building for Real Estate Firms',
    ogDescription:
      'Find out whether AI platforms recommend your agency or your competitors, and build the authority needed to appear in the answers prospective clients now trust.',
  },

  cta: {
    heroPrimary: 'Get Your AI Visibility Audit',
    auditSection: 'Audit My Agency',
    auditOffer: 'Get My Agency Audit',
    final: 'Get Your Agency AI Visibility Audit',
    mobile: 'Audit My Agency',
  },

  hero: {
    eyebrow: 'AI Visibility and Authority Building for Real Estate Firms',
    headlinePre: 'Make Your Agency the One',
    headlineHighlight: 'AI Recommends',
    headlinePost: '',
    paragraphs: [
      'Your prospective clients are asking ChatGPT, Gemini and Perplexity who to use when they want to sell a home, find a rental, manage a property portfolio or buy in a particular area.',
      'TotalAuthority shows you whether your agency appears in those answers, which competitors are being recommended instead, and which sources are influencing the results. We then build the external authority, earned media, content and brand signals needed to improve your visibility.',
    ],
    supportingLine:
      'See how your agency is mentioned, cited and compared across leading AI platforms.',
    footnote: 'Measured across ChatGPT, Gemini and Perplexity',
    dashboardTitle: 'Estate Agency AI Visibility Audit',
  },

  dashboard: {
    score: 48,
    scoreCaption: '14/30 audited answers mentioned the agency',
    citedLine: '8 answers',
    citedSub: 'cited the website',
    models: [
      { name: 'ChatGPT', score: 42, m: '4/10', c: '5/10' },
      { name: 'Gemini', score: 50, m: '5/10', c: '3/10' },
      { name: 'Perplexity', score: 30, m: '3/10', c: '1/10' },
    ],
    competitorsHeading: 'Top competitors recommended instead',
    competitorsCaption: '4 of 10 prompts',
    competitors: [
      { name: 'Oakfield Residential', count: 8 },
      { name: 'Harbrook & Vale', count: 5 },
      { name: 'Meridian Property Group', count: 4 },
    ],
    sources: [
      'Rightmove',
      'Zoopla',
      'allAgents',
      'Google reviews',
      'Trustpilot',
      'Estate Agent Today',
      'Local press',
    ],
  },

  shift: {
    heading: 'Your next client may ask AI before they search Google',
    intro:
      'People are increasingly using AI platforms to shortlist agents, compare services and decide which firms appear credible. They are asking questions such as:',
    questions: [
      'Who is the best estate agent near me?',
      'Which agency should I use to sell my house in Bristol?',
      'Where can I find a reliable letting agent for my flat?',
      'Which estate agent has the strongest reviews for selling quickly?',
      'Who is a trusted agent for managing a buy-to-let portfolio?',
      'Which agency specialises in new homes and developments?',
    ],
    paragraphs: [
      'AI can answer those questions without sending the user through a traditional list of search results. Your agency may have a strong local presence, experienced negotiators and decades of completed sales behind it. That does not guarantee you will be included.',
      'AI systems form their answers using the sources and signals they can find across the wider web. If your competitors are better represented across those sources, they may be recommended ahead of you.',
    ],
    callout:
      'The agency being recommended is not necessarily the best agency. It is often the agency with the clearest and strongest visible authority.',
  },

  audit: {
    heading: 'Find out exactly where your agency stands',
    introPre: 'Our ',
    introPost:
      " tests the commercially valuable questions your clients are likely to ask. We don't simply search for your agency name. We test the service, sector and local discovery prompts that could lead to a new instruction.",
    outputCards: [
      {
        t: 'Overall AI Visibility Score',
        b: 'A clear baseline showing how consistently your agency appears across the audited answers.',
      },
      {
        t: 'Model-by-Model Results',
        b: 'Separate visibility scores for ChatGPT, Gemini and Perplexity.',
      },
      {
        t: 'Mention and Citation Tracking',
        b: 'We identify whether your agency appeared, whether your website was cited, whether you were actively recommended, and whether your positioning was accurately understood.',
      },
      {
        t: 'Prompt Visibility Map',
        b: 'A simple view showing the services and searches where your agency is mentioned, not mentioned, recommended or cited.',
      },
    ],
    promptCategories: [
      'Best estate agent in your city',
      'Best agent for selling a house fast',
      'Best letting agent for landlords',
      'Best agency for property management',
      'Best agent for new homes',
      'Best commercial property agent',
      'Best agent for buy-to-let investors',
      'Best agency for block management',
      'Best agent for relocation services',
      'Best agency for property auctions',
      'Best agency for natural-language property queries',
      'Top-rated estate agents near me',
    ],
  },

  competitorIntel: {
    heading: 'See who AI recommends instead',
    intro:
      'A missing recommendation is only part of the picture. The more useful question is which competitors appear instead, how frequently they are recommended, and why AI associates them more strongly with a service or location.',
    identifiesHeading: 'Our audit identifies',
    identifies: [
      'Competitors appearing across multiple AI models',
      'Agencies repeatedly recommended for priority services',
      'Competitors associated with particular property types',
      'The prompts where your agency is absent',
      'The websites supporting competitor recommendations',
      'The agencies gaining visibility despite having weaker real-world credentials',
    ],
    tableHeading: 'Recurring competitors',
    tableRows: [
      { name: 'Oakfield Residential', m: 3, p: 8, f: '24×' },
      { name: 'Harbrook & Vale', m: 2, p: 5, f: '15×' },
      { name: 'Meridian Property Group', m: 3, p: 4, f: '12×' },
      { name: 'Castleton & Rowe', m: 1, p: 3, f: '6×' },
      { name: 'Linden Bay Estates', m: 2, p: 2, f: '5×' },
    ],
    note:
      'This gives you a practical competitive view based on AI-generated recommendations, rather than assumptions about who your online competitors are.',
  },

  sourceLandscape: {
    heading: 'Discover which sources are influencing AI',
    paragraphs: [
      'Improving AI visibility is not only a website project. AI platforms may rely on property portals, trade press, review platforms, local recommendation pages, listicles, Reddit discussions, agent profiles, area comparison pages, competitor websites, social profiles and your own service and branch pages.',
      'Our source analysis identifies which websites appear most frequently across the answers being generated in your market. This allows us to see where your brand is already represented, where competitors have an advantage, and where new authority needs to be created.',
    ],
    pullQuoteLine1: 'Your website tells AI what you say about yourself.',
    pullQuoteLead: 'Third-party sources help validate',
    pullQuoteHighlight: 'whether that claim should be trusted.',
    topSourcesTitle: 'Top recurring sources',
    topSourcesBody: 'The websites appearing most frequently across audited answers.',
    topSources: [
      { name: 'Rightmove', pct: 91 },
      { name: 'Zoopla', pct: 78 },
      { name: 'allAgents', pct: 60 },
      { name: 'Local press', pct: 36 },
    ],
    multiModelTitle: 'Used across multiple AI models',
    multiModelBody: 'Sources relied upon by more than one platform.',
    multiModel: [
      { name: 'Reddit', models: ['ChatGPT', 'Gemini', 'Perplexity'] },
      { name: 'Estate Agent Today', models: ['ChatGPT', 'Perplexity'] },
      { name: 'OnTheMarket', models: ['Gemini', 'Perplexity'] },
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
      'Being mentioned is not enough if your agency is associated with the wrong services or described too generically. We compare what you want AI to understand with what the platforms currently say about your agency.',
    positioningHeading: 'Positioning examples',
    positioning: [
      'Leading agency for residential sales in the area',
      'Trusted firm for lettings and property management',
      'Specialist agency for new homes and developments',
      'Local authority for buy-to-let and investment property',
      'Premier adviser on commercial property transactions',
      'Independently recognised block management team',
      'Multi-branch agency with experienced negotiators',
    ],
    assessHeading: 'We assess whether AI accurately understands',
    assess: [
      'Who your agency serves',
      'Where you operate',
      'Which services you specialise in',
      'What differentiates your approach',
      'Who your agents are',
      'Which credentials support your expertise',
      'Which property types you are best placed to handle',
      'How your agency compares with local competitors',
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
      'This combines AI visibility analysis with digital PR, earned media, content, entity optimisation, citation building and external authority development.',
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
        body: 'The Blueprint turns audit findings into a prioritised execution plan: competitors, sources, AI-cited rankings, website alignment, third-party gaps, PR opportunities, citations and content priorities.',
        icon: 'FileText',
        href: '/strategy-blueprint',
      },
      {
        num: '03',
        title: 'Earned Media and Digital PR',
        body: 'We position your experienced agents as expert sources for journalists covering property, housing, the local market, lettings and investment — for editorial features, expert commentary and authoritative backlinks.',
        icon: 'Megaphone',
      },
      {
        num: '04',
        title: 'Third-Party Authority Development',
        body: 'We strengthen your presence across property portals, review platforms, agent profiles, local business resources, area comparison pages and industry associations.',
        icon: 'Layers',
      },
      {
        num: '05',
        title: 'Brand and Entity Alignment',
        body: 'We align agency names, branch locations, agent biographies, credentials, service categories, social profiles, directory listings and website schema so AI systems build a clearer understanding of the agency.',
        icon: 'UserCheck',
      },
      {
        num: '06',
        title: 'Citable Content and Authority Assets',
        body: 'Original research, area guides, agent-led explainers, market updates, comparison pages, client decision tools and proprietary data — each asset has a defined role in the authority strategy.',
        icon: 'FileText',
      },
      {
        num: '07',
        title: 'Ongoing AI Visibility Tracking',
        body: 'We continue testing the prompts most valuable to your agency: recommendation frequency, brand mentions, service visibility, competitor share of voice, citation sources and positioning accuracy.',
        icon: 'BarChart3',
      },
      {
        num: '08',
        title: 'Local and Multi-Branch Authority',
        body: 'For agencies operating across one or more branches, we strengthen the local signals AI relies on: branch-specific profiles, regional press, community references, structured local data and branch-level agent recognition.',
        icon: 'Building2',
      },
      {
        num: '09',
        title: 'Reputation and Review Authority',
        body: 'We strengthen the consistency and depth of the review platforms and directories AI weighs most heavily for agencies — Google, Trustpilot, allAgents and the major property portals — so sentiment, volume and recency reinforce recommendations.',
        icon: 'Star',
      },
    ],
  },

  earnedMedia: {
    heading: 'Real authority is earned outside your own website',
    paragraphs: [
      'Every agency can publish claims about being trusted, experienced or market-leading. Independent media coverage gives those claims external support.',
      'When an agent is quoted in a recognised publication, several things happen:',
    ],
    effectsIntro: 'When an agent is quoted in a recognised publication, several things happen:',
    effects: [
      'The agent becomes associated with a relevant area of expertise',
      'The agency earns an independent brand mention',
      'The website may receive an authoritative backlink',
      'Search engines gain another reference point',
      'AI systems gain external information about the brand',
      'Clients see evidence that the expert is trusted by journalists',
    ],
    closing:
      'The same piece of editorial coverage can support brand discovery, SEO, agent authority, client confidence and AI visibility. This is why earned media forms a central part of the TotalAuthority process.',
    logosHeading: 'Publications featuring our clients and their experts',
  },

  practitioner: {
    sectionLabel: 'Agent Authority',
    heading: 'Clients trust agents, not faceless agency pages',
    paragraphs: [
      'In property, the person handling the sale or let can be as important as the agency itself. Your branch managers, senior negotiators, valuers and lettings specialists hold expertise that can strengthen the authority of the entire brand.',
      'We help develop that expertise into visible authority through:',
    ],
    developIntro: 'We help develop that expertise into visible authority through:',
    chips: [
      'Agent positioning',
      'Expert biographies',
      'Credential alignment',
      'Media commentary',
      'Author pages',
      'Area specialisation',
      'Speaking engagements',
      'Professional citations',
      'Portal rankings',
      'Thought leadership',
      'Podcast appearances',
      'Award submissions',
    ],
    closing:
      'An agent with genuine expertise can become a recognised source for both clients and journalists. That authority then supports the agency they represent.',
  },

  services: {
    sectionLabel: 'Service Visibility',
    heading: 'Build visibility around the services that generate fees',
    intro:
      'Your campaign should not chase vague visibility. It should strengthen the association between your agency, location, agents and the services you want to grow.',
    focusHeading: 'A real estate strategy may focus on',
    badge: '24 services',
    items: [
      'Residential sales',
      'Residential lettings',
      'Property management',
      'Property valuations',
      'New homes sales',
      'Commercial property',
      'Land and development',
      'Property auctions',
      'Buy-to-let services',
      'Block management',
      'Tenant find services',
      'Rent collection',
      'Property investment advice',
      'Relocation services',
      'Probate property sales',
      'Short-term lets',
      'Student lettings',
      'Service charge management',
      'Portfolio management',
      'Vacant property management',
      'Snagging and handover',
      'Mortgage referrals',
      'Conveyancing referrals',
      'Market appraisals',
    ],
    closing:
      'An agency may be highly visible for one service and completely absent for another. Our process exposes those differences. Every service is reviewed separately because the competitors, sources and authority signals can differ considerably.',
  },

  process: {
    eyebrow: 'Our Process',
    heading: 'From AI visibility baseline to authority building',
    steps: [
      {
        n: '01',
        t: 'Define the Commercial Priorities',
        b: 'We identify the services, locations and client searches most valuable to your agency. This prevents the campaign from becoming a broad exercise with no commercial focus.',
      },
      {
        n: '02',
        t: 'Complete the Multi-Model Audit',
        b: 'We test relevant prompts across ChatGPT, Gemini and Perplexity. We document mentions, recommendations, citations, competitors and sources.',
      },
      {
        n: '03',
        t: 'Build the Strategy Blueprint',
        b: 'We analyse why competitors are appearing, which sources are influencing results and where your authority footprint is weak. You receive a prioritised roadmap for implementation.',
      },
      {
        n: '04',
        t: 'Strengthen the Foundation',
        b: 'We improve the clarity and consistency of brand positioning, agent entities, service associations, profiles, website information, citations, structured data and local signals.',
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
      'The agency appears inconsistently',
      'Important service prompts produce no mention',
      'Competitors dominate recommendations',
      'AI uses weak or inaccurate positioning',
      'The website receives few citations',
      'Agents have little external authority',
      'Third-party source coverage is limited',
      'The agency does not know which sources influence results',
    ],
    after: [
      'The agency appears across more valuable prompts',
      'Priority services have stronger brand association',
      'Brand descriptions become more accurate',
      'Agent expertise is clearer',
      'More trusted sources mention the agency',
      'The website earns relevant citations',
      'Competitive gaps begin to reduce',
      'Progress is monitored across multiple AI platforms',
    ],
  },

  whoFor: {
    heading: 'Built for agencies with genuine expertise to promote',
    intro:
      'TotalAuthority is best suited to established agencies that have credible agents, strong client service and the capacity to convert increased visibility into instructions.',
    typesHeading: 'Best-fit agency types',
    types: [
      'Established independent agencies',
      'Regional multi-branch firms',
      'Boutique prime property agencies',
      'Lettings-led agencies',
      'New homes and land specialists',
      'Commercial property firms',
      'Property management companies',
      'Buy-to-let and investment agencies',
      'Block management specialists',
      'Auction-led agencies',
      'Relocation specialists',
      'Agencies entering new areas',
    ],
    qualification:
      'We build authority around real expertise. The agency must be able to support its positioning through appropriate credentials, credible transactions and responsible client communication.',
  },

  gaps: {
    heading: 'Why real estate firms lose AI visibility',
    items: [
      {
        t: 'Strong reputation, weak external evidence',
        b: 'The agency may have loyal clients but very few independent sources confirming its expertise.',
      },
      {
        t: 'Agent expertise is hidden',
        b: 'Highly experienced negotiators are presented through short team biographies with little external recognition.',
      },
      {
        t: 'The brand is associated with the wrong services',
        b: 'AI may recognise the agency but connect it more strongly with secondary services than its commercial priorities.',
      },
      {
        t: 'Competitors occupy the trusted sources',
        b: 'Other agencies appear in the portals, articles, reviews and comparison pages AI is already using.',
      },
      {
        t: 'Website content is too generic',
        b: 'Service pages repeat the same information found on hundreds of other estate agency websites.',
      },
      {
        t: 'Local and brand information conflicts',
        b: 'Agency, agent and branch details are inconsistent across profiles and third-party sources.',
      },
      {
        t: 'Marketing is focused entirely on portals',
        b: 'The agency wins instructions through Rightmove and Zoopla but has little searchable, independent authority elsewhere.',
      },
      {
        t: 'Nobody is tracking AI recommendations',
        b: 'The agency measures rankings, traffic and valuations without knowing whether AI platforms are recommending competitors.',
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
    heading: 'Get your Agency AI Visibility Audit',
    intro:
      'See how your agency currently appears across ChatGPT, Gemini and Perplexity. Your audit will examine high-intent prompts linked to your location, services and desired positioning.',
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
      'Agency name and website',
      'Primary location and number of branches',
      'Most important services',
      'Services you want to grow',
    ],
    blueprintEyebrow: 'Next step after the audit',
    blueprintHeading: 'Turn findings into a clear execution plan',
    blueprintBody:
      "The AI Authority Strategy Blueprint takes the audit's baseline and sets out the prioritised work needed across competitors, sources, media, website positioning, profiles, citations and content.",
  },

  proof: {
    heading: 'Authority building you can see',
    intro:
      'Real evidence rather than broad claims — across audit outputs, earned media, authority case studies and client testimonials.',
    cards: [
      {
        t: 'AI Visibility Audit Example',
        b: 'Anonymised reports showing overall score, mentions across each model, website citations, prompt visibility map, competitor recommendations and source landscape.',
        icon: 'BarChart3',
      },
      {
        t: 'Earned Media Results',
        b: 'Tier-one editorial coverage, dofollow media links, agent quotes, broadcast opportunities, podcast placements and journalist relationships.',
        icon: 'Megaphone',
      },
      {
        t: 'Authority Case Studies',
        b: 'Client category, initial authority gap, work completed, media secured, visibility or SEO outcome and campaign duration.',
        icon: 'FileText',
      },
      {
        t: 'Client Testimonials',
        b: 'Quotes that reference quality of publications, strategic insight, communication, brand authority, measurable growth and agent positioning.',
        icon: 'Award',
      },
    ],
  },

  comparison: {
    heading: 'What makes this different from traditional estate agency marketing?',
    traditionalLabel: 'Old marketing playbook',
    traditional: [
      'Run paid ads for immediate valuations',
      'Publish generic area and service blogs',
      'Track Google rankings alone',
      'Promote claims made by the agency',
      'Focus on the agency brand only',
      'Build backlinks as isolated SEO assets',
      'Measure portal listings in isolation',
      'Optimise only the website',
    ],
    authorityLabel: 'Authority-led approach',
    authority: [
      'Build an authority footprint that supports discovery across multiple channels',
      'Create content and assets designed around specific citation and authority opportunities',
      'Track mentions, citations and recommendations across multiple AI platforms',
      'Earn independent support from trusted third parties',
      'Build the authority of the agency and its agents',
      'Build connected media, brand, entity and citation signals',
      'Measure service visibility, competitor share and source influence',
      'Strengthen the wider source environment surrounding the agency',
    ],
  },

  faq: {
    intro:
      'Twelve of the questions we hear most often from real estate firms considering an AI visibility programme.',
    items: [
      {
        q: 'What is AI visibility for an estate agency?',
        a: 'AI visibility refers to whether your agency appears when people ask platforms such as ChatGPT, Gemini and Perplexity for recommendations, comparisons or information about property services in your area. It also includes whether your website is cited, whether your agency is accurately described, and whether your agents are recognised for relevant expertise.',
      },
      {
        q: 'How do you measure our visibility?',
        a: 'We create a defined set of high-intent prompts based on your services, location and commercial priorities. We then audit the answers across ChatGPT, Gemini and Perplexity, recording brand mentions, website citations, direct recommendations, competitors and source usage.',
      },
      {
        q: 'Can you guarantee that AI will recommend us?',
        a: 'No. The platforms operate independently and their answers can change. We strengthen the authority, relevance, consistency and third-party evidence connected with your brand. These are the areas most likely to improve how your agency is understood and considered.',
      },
      {
        q: 'Is AI visibility the same as SEO?',
        a: 'No, but the two are connected. SEO focuses heavily on website rankings and organic traffic. AI visibility also includes third-party mentions, citations, agent entities, reviews, external profiles, editorial coverage and the sources used to produce generated answers. Strong authority building can support both.',
      },
      {
        q: 'Does our agency still need local SEO?',
        a: 'Yes. Clients still use Google Search and Google Maps, while AI platforms may also rely on local business information. TotalAuthority complements local SEO by developing broader brand, agent, media and third-party authority.',
      },
      {
        q: 'Why is earned media part of the strategy?',
        a: 'Editorial coverage gives your agency independent recognition. It can connect your agents with relevant expertise, create authoritative mentions, earn backlinks and give both clients and AI systems additional sources through which to validate the brand.',
      },
      {
        q: 'Do you work on our website?',
        a: 'Website alignment can form part of the implementation plan. This may include positioning, service associations, agent information, citable content, entity clarity, structured data and internal site recommendations. The work is directed by the gaps identified in the audit and Blueprint.',
      },
      {
        q: 'Do you create content?',
        a: 'Yes, where content has a clear authority purpose. This can include expert resources, original research, area guides, comparison pages, reports and other assets that may support citations, media outreach and client education.',
      },
      {
        q: 'Can you promote individual agents and branch managers?',
        a: 'Yes, provided their experience and credentials support the positioning. Agent authority can include media commentary, expert biographies, area specialisation, professional profiles and expert-led content.',
      },
      {
        q: 'Can you help a multi-branch agency?',
        a: 'Yes. Multi-branch agencies need clear connections between the parent brand, each branch, agents, service offerings, local profiles and external mentions. The audit and strategy can be structured around individual markets or the wider agency.',
      },
      {
        q: 'How quickly will visibility improve?',
        a: 'There is no universal timeframe. Some improvements can occur after clearer information or stronger source coverage is discovered. Building a defensible authority footprint requires sustained execution across several areas. Progress should be judged across multiple prompts and models rather than one isolated result.',
      },
      {
        q: 'What happens after the audit?',
        a: 'The next stage is the AI Authority Strategy Blueprint. This expands the baseline findings into a prioritised plan covering competitors, sources, media, website positioning, profiles, citations, content and authority assets. TotalAuthority can then execute the strategy.',
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
    heading: 'Is AI recommending your agency, or your competitors?',
    paragraph:
      'Your agency may already be visible for some services and absent for others. The only way to know is to test the questions your prospective clients are asking, examine the competitors appearing instead, and identify the sources influencing those answers. Start with a clear visibility baseline. Then build the authority required to compete.',
    footnote:
      'Measured across ChatGPT, Gemini and Perplexity using prompts tailored to your agency, services and location.',
  },
};
