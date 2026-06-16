import { IndustryContent } from '@/lib/industry/types';

export const privateMedicalPractices: IndustryContent = {
  slug: 'private-medical-practices',

  meta: {
    title: 'AI Visibility & Authority Building for Private Medical Practices | TotalAuthority',
    description:
      'See whether ChatGPT, Gemini and Perplexity recommend your practice when prospective patients ask for private healthcare. TotalAuthority audits your AI visibility and builds the earned media, content and authority signals that influence those answers.',
    keywords: [
      'AI visibility for private medical practices',
      'private practice marketing',
      'private healthcare SEO',
      'physician authority building',
      'ChatGPT private doctor recommendations',
      'AI search for specialist physicians',
      'digital PR for private medical practices',
      'private healthcare directory rankings',
      'Castle Connolly profile visibility',
      'AI visibility audit',
    ],
    ogTitle: 'AI Visibility & Authority Building for Private Medical Practices',
    ogDescription:
      'Find out whether AI platforms recommend your practice or your competitors, and build the authority needed to appear in the answers prospective patients now trust.',
  },

  cta: {
    heroPrimary: 'Get Your AI Visibility Audit',
    auditSection: 'Audit My Private Medical Practice',
    auditOffer: 'Get My Private Medical Practice Audit',
    final: 'Get Your Private Medical Practice AI Visibility Audit',
    mobile: 'Audit My Private Medical Practice',
  },

  hero: {
    eyebrow: 'AI Visibility and Authority Building for Private Medical Practices',
    headlinePre: 'Make Your Practice the One',
    headlineHighlight: 'AI Recommends',
    headlinePost: '',
    paragraphs: [
      'Your prospective patients are asking ChatGPT, Gemini and Perplexity who to see for cardiology, dermatology, gynecology, orthopedics and primary care.',
      'TotalAuthority shows you whether your practice appears in those answers, which competitors are being recommended instead, and which sources are influencing the results. We then build the external authority, earned media, content and brand signals needed to improve your visibility.',
    ],
    supportingLine:
      'See how your practice is mentioned, cited and compared across leading AI platforms.',
    footnote: 'Measured across ChatGPT, Gemini and Perplexity',
    dashboardTitle: 'Private Practice AI Visibility Audit',
  },

  dashboard: {
    score: 50,
    scoreCaption: '15/30 audited answers mentioned the practice',
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
      { name: 'Madison Health Partners', count: 7 },
      { name: 'Parkview Private Clinic', count: 5 },
      { name: 'Northgate Physicians', count: 4 },
    ],
    sources: [
      'Healthgrades',
      'Castle Connolly',
      'Aetna',
      'HCA Healthcare',
      'WebMD',
      'NYT Health',
      'Vitals',
    ],
  },

  shift: {
    heading: 'Your next patient may ask AI before they search Google',
    intro:
      'People are increasingly using AI platforms to shortlist practices, compare specialties and decide which physicians appear credible. They are asking questions such as:',
    questions: [
      'Who is the best primary care physician near me?',
      'Which practice should I use for a cardiology consultation in New York?',
      'Where can I find a specialist dermatologist?',
      'Which practice has the strongest reviews for gynecology?',
      'Who is a trusted specialist physician for orthopedic care?',
      'Which practice specializes in executive physicals?',
    ],
    paragraphs: [
      'AI can answer those questions without sending the user through a traditional list of search results. Your practice may have an excellent reputation, distinguished physicians and decades of clinical experience behind it. That does not guarantee you will be included.',
      'AI systems form their answers using the sources and signals they can find across the wider web. If your competitors are better represented across those sources, they may be recommended ahead of you.',
    ],
    callout:
      'The practice being recommended is not necessarily the best practice. It is often the practice with the clearest and strongest visible authority.',
  },

  audit: {
    heading: 'Find out exactly where your practice stands',
    introPre: 'Our ',
    introPost:
      " tests the commercially valuable questions your patients are likely to ask. We don't simply search for your practice name. We test the specialty, physician and local discovery prompts that could lead to a new appointment.",
    outputCards: [
      {
        t: 'Overall AI Visibility Score',
        b: 'A clear baseline showing how consistently your practice appears across the audited answers.',
      },
      {
        t: 'Model-by-Model Results',
        b: 'Separate visibility scores for ChatGPT, Gemini and Perplexity.',
      },
      {
        t: 'Mention and Citation Tracking',
        b: 'We identify whether your practice appeared, whether your website was cited, whether you were actively recommended, and whether your positioning was accurately understood.',
      },
      {
        t: 'Prompt Visibility Map',
        b: 'A simple view showing the specialties and searches where your practice is mentioned, not mentioned, recommended or cited.',
      },
    ],
    promptCategories: [
      'Best private medical practice in your city',
      'Best primary care physician (PCP) service',
      'Best cardiologist',
      'Best dermatologist',
      'Best gynecologist',
      'Best practice for orthopedic care',
      'Best practice for executive physicals',
      'Best gastroenterologist',
      'Best practice for diagnostic imaging',
      'Best neurologist',
      'Best practice for natural-language private healthcare queries',
      'Top-rated specialist physicians near me',
    ],
  },

  competitorIntel: {
    heading: 'See who AI recommends instead',
    intro:
      'A missing recommendation is only part of the picture. The more useful question is which competitors appear instead, how frequently they are recommended, and why AI associates them more strongly with a specialty or location.',
    identifiesHeading: 'Our audit identifies',
    identifies: [
      'Competitors appearing across multiple AI models',
      'Practices repeatedly recommended for priority specialties',
      'Competitors associated with particular specialist physicians',
      'The prompts where your practice is absent',
      'The websites supporting competitor recommendations',
      'The practices gaining visibility despite having weaker real-world credentials',
    ],
    tableHeading: 'Recurring competitors',
    tableRows: [
      { name: 'Madison Health Partners', m: 3, p: 7, f: '23×' },
      { name: 'Parkview Private Clinic', m: 2, p: 5, f: '14×' },
      { name: 'Northgate Physicians', m: 3, p: 4, f: '11×' },
      { name: 'Albany Medical Group', m: 1, p: 3, f: '6×' },
      { name: 'Sterling Health Clinic', m: 2, p: 2, f: '5×' },
    ],
    note:
      'This gives you a practical competitive view based on AI-generated recommendations, rather than assumptions about who your online competitors are.',
  },

  sourceLandscape: {
    heading: 'Discover which sources are influencing AI',
    paragraphs: [
      'Improving AI visibility is not only a website project. AI platforms may rely on healthcare directories, hospital systems, health press, local recommendation pages, review platforms, listicles, Reddit discussions, physician profiles, specialty comparison pages, competitor websites, social profiles and your own specialty and location pages.',
      'Our source analysis identifies which websites appear most frequently across the answers being generated in your market. This allows us to see where your brand is already represented, where competitors have an advantage, and where new authority needs to be created.',
    ],
    pullQuoteLine1: 'Your website tells AI what you say about yourself.',
    pullQuoteLead: 'Third-party sources help validate',
    pullQuoteHighlight: 'whether that claim should be trusted.',
    topSourcesTitle: 'Top recurring sources',
    topSourcesBody: 'The websites appearing most frequently across audited answers.',
    topSources: [
      { name: 'Healthgrades', pct: 88 },
      { name: 'Castle Connolly', pct: 76 },
      { name: 'Aetna', pct: 61 },
      { name: 'HCA Healthcare', pct: 38 },
    ],
    multiModelTitle: 'Used across multiple AI models',
    multiModelBody: 'Sources relied upon by more than one platform.',
    multiModel: [
      { name: 'Reddit', models: ['ChatGPT', 'Gemini', 'Perplexity'] },
      { name: 'NYT Health', models: ['ChatGPT', 'Perplexity'] },
      { name: 'Vitals', models: ['Gemini', 'Perplexity'] },
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
      'Being mentioned is not enough if your practice is associated with the wrong specialties or described too generically. We compare what you want AI to understand with what the platforms currently say about your practice.',
    positioningHeading: 'Positioning examples',
    positioning: [
      'Leading practice for specialist cardiology',
      'Trusted provider of primary care services',
      'Specialist practice for dermatology and skin health',
      'Local authority for orthopedic and sports medicine',
      'Premier provider of executive physicals',
      'Independently recognized diagnostic and imaging team',
      'Multi-specialty practice with experienced physicians',
    ],
    assessHeading: 'We assess whether AI accurately understands',
    assess: [
      'Who your practice serves',
      'Where you operate',
      'Which specialties you provide',
      'What differentiates your care',
      'Who your physicians are',
      'Which credentials support your expertise',
      'Which conditions you are best placed to treat',
      'How your practice compares with local competitors',
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
        body: 'We position your physicians as expert sources for journalists covering health, medicine, well-being, lifestyle and consumer affairs — for editorial features, expert commentary and authoritative backlinks.',
        icon: 'Megaphone',
      },
      {
        num: '04',
        title: 'Third-Party Authority Development',
        body: 'We strengthen your presence across healthcare directories, review platforms, physician profiles, local health resources, specialty comparison pages and professional associations.',
        icon: 'Layers',
      },
      {
        num: '05',
        title: 'Brand and Entity Alignment',
        body: 'We align practice names, locations, physician biographies, credentials, specialty categories, social profiles, directory listings and website schema so AI systems build a clearer understanding of the practice.',
        icon: 'UserCheck',
      },
      {
        num: '06',
        title: 'Citable Content and Authority Assets',
        body: 'Original research, condition guides, physician-led explainers, health updates, comparison pages, patient decision tools and proprietary data — each asset has a defined role in the authority strategy.',
        icon: 'FileText',
      },
      {
        num: '07',
        title: 'Ongoing AI Visibility Tracking',
        body: 'We continue testing the prompts most valuable to your practice: recommendation frequency, brand mentions, specialty visibility, competitor share of voice, citation sources and positioning accuracy.',
        icon: 'BarChart3',
      },
      {
        num: '08',
        title: 'Local and Multi-Site Authority',
        body: 'For practices operating across one or more sites, we strengthen the local signals AI relies on: site-specific profiles, regional press, community references, structured local data and site-level physician recognition.',
        icon: 'Building2',
      },
      {
        num: '09',
        title: 'Reputation and Review Authority',
        body: 'We strengthen the consistency and depth of the review platforms and directories AI weighs most heavily for practices — Google, Healthgrades, Castle Connolly and Vitals — so sentiment, volume and recency reinforce recommendations.',
        icon: 'Star',
      },
    ],
  },

  earnedMedia: {
    heading: 'Real authority is earned outside your own website',
    paragraphs: [
      'Every practice can publish claims about being trusted, experienced or market-leading. Independent media coverage gives those claims external support.',
      'When a physician is quoted in a recognized publication, several things happen:',
    ],
    effectsIntro: 'When a physician is quoted in a recognized publication, several things happen:',
    effects: [
      'The physician becomes associated with a relevant area of expertise',
      'The practice earns an independent brand mention',
      'The website may receive an authoritative backlink',
      'Search engines gain another reference point',
      'AI systems gain external information about the brand',
      'Patients see evidence that the expert is trusted by journalists',
    ],
    closing:
      'The same piece of editorial coverage can support brand discovery, SEO, physician authority, patient confidence and AI visibility. This is why earned media forms a central part of the TotalAuthority process.',
    logosHeading: 'Publications featuring our clients and their experts',
  },

  practitioner: {
    sectionLabel: 'Physician Authority',
    heading: 'Patients trust physicians, not faceless practice pages',
    paragraphs: [
      'In private healthcare, the person providing the care can be as important as the practice itself. Your lead physicians, specialist physicians, primary care physicians and clinical team hold expertise that can strengthen the authority of the entire brand.',
      'We help develop that expertise into visible authority through:',
    ],
    developIntro: 'We help develop that expertise into visible authority through:',
    chips: [
      'Physician positioning',
      'Expert biographies',
      'Credential alignment',
      'Media commentary',
      'Author pages',
      'Specialty specialization',
      'Speaking engagements',
      'Professional citations',
      'Directory rankings',
      'Thought leadership',
      'Podcast appearances',
      'Award submissions',
    ],
    closing:
      'A physician with genuine expertise can become a recognized source for both patients and journalists. That authority then supports the practice they represent.',
  },

  services: {
    sectionLabel: 'Specialty Visibility',
    heading: 'Build visibility around the specialties that generate appointments',
    intro:
      'Your campaign should not chase vague visibility. It should strengthen the association between your practice, location, physicians and the specialties you want to grow.',
    focusHeading: 'A private practice strategy may focus on',
    badge: '24 specialties',
    items: [
      'Primary care services',
      'Specialist cardiology',
      'Dermatology',
      'Gynecology',
      'Gastroenterology',
      'Orthopedics',
      'Endocrinology',
      'Neurology',
      'Pulmonology',
      'Urology',
      'ENT',
      'Rheumatology',
      'Executive physicals',
      'Diagnostic imaging',
      'Blood tests and pathology',
      'Allergy and immunology',
      'Pediatrics',
      'Sports medicine',
      'Menopause clinics',
      'Travel medicine',
      'Minor surgery',
      'Second opinions',
      'Health screening',
      'Specialist referrals',
    ],
    closing:
      'A practice may be highly visible for one specialty and completely absent for another. Our process exposes those differences. Every specialty is reviewed separately because the competitors, sources and authority signals can differ considerably.',
  },

  process: {
    eyebrow: 'Our Process',
    heading: 'From AI visibility baseline to authority building',
    steps: [
      {
        n: '01',
        t: 'Define the Commercial Priorities',
        b: 'We identify the specialties, locations and patient searches most valuable to your practice. This prevents the campaign from becoming a broad exercise with no commercial focus.',
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
        b: 'We improve the clarity and consistency of brand positioning, physician entities, specialty associations, profiles, website information, citations, structured data and local signals.',
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
      'The practice appears inconsistently',
      'Important specialty prompts produce no mention',
      'Competitors dominate recommendations',
      'AI uses weak or inaccurate positioning',
      'The website receives few citations',
      'Physicians have little external authority',
      'Third-party source coverage is limited',
      'The practice does not know which sources influence results',
    ],
    after: [
      'The practice appears across more valuable prompts',
      'Priority specialties have stronger brand association',
      'Brand descriptions become more accurate',
      'Physician expertise is clearer',
      'More trusted sources mention the practice',
      'The website earns relevant citations',
      'Competitive gaps begin to reduce',
      'Progress is monitored across multiple AI platforms',
    ],
  },

  whoFor: {
    heading: 'Built for practices with genuine expertise to promote',
    intro:
      'TotalAuthority is best suited to established practices that have distinguished physicians, strong patient care and the capacity to convert increased visibility into appointments.',
    typesHeading: 'Best-fit practice types',
    types: [
      'Established private medical practices',
      'Physician-led specialist clinics',
      'Boutique primary care practices',
      'Multi-site practice groups',
      'Single-specialty clinics',
      'Multi-specialty private clinics',
      'Diagnostic and imaging centers',
      'Executive health providers',
      "Women's health practices",
      'Hospital-affiliated physicians',
      'Health screening providers',
      'Practices entering new regions',
    ],
    qualification:
      'We build authority around real expertise. The practice must be able to support its positioning through appropriate registration, credible clinical experience and responsible patient communication.',
  },

  gaps: {
    heading: 'Why private medical practices lose AI visibility',
    items: [
      {
        t: 'Strong reputation, weak external evidence',
        b: 'The practice may have loyal patients but very few independent sources confirming its expertise.',
      },
      {
        t: 'Physician expertise is hidden',
        b: 'Highly qualified physicians are presented through short team biographies with little external recognition.',
      },
      {
        t: 'The brand is associated with the wrong specialties',
        b: 'AI may recognize the practice but connect it more strongly with secondary specialties than its commercial priorities.',
      },
      {
        t: 'Competitors occupy the trusted sources',
        b: 'Other practices appear in the directories, articles, reviews and comparison pages AI is already using.',
      },
      {
        t: 'Website content is too generic',
        b: 'Specialty pages repeat the same information found on hundreds of other private practice websites.',
      },
      {
        t: 'Local and brand information conflicts',
        b: 'Practice, physician and site details are inconsistent across profiles and third-party sources.',
      },
      {
        t: 'Marketing is focused entirely on referrals',
        b: 'The practice wins patients through word of mouth but has little searchable, independent authority elsewhere.',
      },
      {
        t: 'Nobody is tracking AI recommendations',
        b: 'The practice measures rankings, traffic and inquiries without knowing whether AI platforms are recommending competitors.',
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
    heading: 'Get your Private Medical Practice AI Visibility Audit',
    intro:
      'See how your practice currently appears across ChatGPT, Gemini and Perplexity. Your audit will examine high-intent prompts linked to your location, specialties and desired positioning.',
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
      'Practice name and website',
      'Primary location and number of sites',
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
        b: 'Tier-one editorial coverage, dofollow media links, physician quotes, broadcast opportunities, podcast placements and journalist relationships.',
        icon: 'Megaphone',
      },
      {
        t: 'Authority Case Studies',
        b: 'Client category, initial authority gap, work completed, media secured, visibility or SEO outcome and campaign duration.',
        icon: 'FileText',
      },
      {
        t: 'Patient Testimonials',
        b: 'Quotes that reference quality of publications, strategic insight, communication, brand authority, measurable growth and physician positioning.',
        icon: 'Award',
      },
    ],
  },

  comparison: {
    heading: 'What makes this different from traditional private practice marketing?',
    traditionalLabel: 'Old marketing playbook',
    traditional: [
      'Run paid ads for immediate inquiries',
      'Publish generic health blogs',
      'Track Google rankings alone',
      'Promote claims made by the practice',
      'Focus on the practice brand only',
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
      'Build the authority of the practice and its physicians',
      'Build connected media, brand, entity and citation signals',
      'Measure specialty visibility, competitor share and source influence',
      'Strengthen the wider source environment surrounding the practice',
    ],
  },

  faq: {
    intro:
      'Twelve of the questions we hear most often from private medical practices considering an AI visibility program.',
    items: [
      {
        q: 'What is AI visibility for a private medical practice?',
        a: 'AI visibility refers to whether your practice appears when people ask platforms such as ChatGPT, Gemini and Perplexity for recommendations, comparisons or information about private healthcare in your area. It also includes whether your website is cited, whether your practice is accurately described, and whether your physicians are recognized for relevant expertise.',
      },
      {
        q: 'How do you measure our visibility?',
        a: 'We create a defined set of high-intent prompts based on your specialties, location and commercial priorities. We then audit the answers across ChatGPT, Gemini and Perplexity, recording brand mentions, website citations, direct recommendations, competitors and source usage.',
      },
      {
        q: 'Can you guarantee that AI will recommend us?',
        a: 'No. The platforms operate independently and their answers can change. We strengthen the authority, relevance, consistency and third-party evidence connected with your brand. These are the areas most likely to improve how your practice is understood and considered.',
      },
      {
        q: 'Is AI visibility the same as SEO?',
        a: 'No, but the two are connected. SEO focuses heavily on website rankings and organic traffic. AI visibility also includes third-party mentions, citations, physician entities, reviews, external profiles, editorial coverage and the sources used to produce generated answers. Strong authority building can support both.',
      },
      {
        q: 'Does our practice still need local SEO?',
        a: 'Yes. Patients still use Google Search and Google Maps, while AI platforms may also rely on local business information. TotalAuthority complements local SEO by developing broader brand, physician, media and third-party authority.',
      },
      {
        q: 'Why is earned media part of the strategy?',
        a: 'Editorial coverage gives your practice independent recognition. It can connect your physicians with relevant expertise, create authoritative mentions, earn backlinks and give both patients and AI systems additional sources through which to validate the brand.',
      },
      {
        q: 'Do you work on our website?',
        a: 'Website alignment can form part of the implementation plan. This may include positioning, specialty associations, physician information, citable content, entity clarity, structured data and internal site recommendations. The work is directed by the gaps identified in the audit and Blueprint.',
      },
      {
        q: 'Do you create content?',
        a: 'Yes, where content has a clear authority purpose. This can include expert resources, original research, condition guides, comparison pages, reports and other assets that may support citations, media outreach and patient education.',
      },
      {
        q: 'Can you promote individual physicians and specialist physicians?',
        a: 'Yes, provided their experience and credentials support the positioning. Physician authority can include media commentary, expert biographies, specialty specialization, professional profiles and expert-led content.',
      },
      {
        q: 'Can you help a multi-site practice?',
        a: 'Yes. Multi-site practices need clear connections between the parent brand, each site, physicians, specialty offerings, local profiles and external mentions. The audit and strategy can be structured around individual markets or the wider practice.',
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
    heading: 'AI visibility for adjacent healthcare services',
    intro:
      'Explore how TotalAuthority approaches visibility and authority building for other healthcare and clinical providers.',
  },

  finalCta: {
    eyebrow: 'Find out where you stand',
    heading: 'Is AI recommending your practice, or your competitors?',
    paragraph:
      'Your practice may already be visible for some specialties and absent for others. The only way to know is to test the questions your prospective patients are asking, examine the competitors appearing instead, and identify the sources influencing those answers. Start with a clear visibility baseline. Then build the authority required to compete.',
    footnote:
      'Measured across ChatGPT, Gemini and Perplexity using prompts tailored to your practice, specialties and location.',
  },
};
