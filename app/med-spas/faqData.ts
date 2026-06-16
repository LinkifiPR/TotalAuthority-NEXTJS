/**
 * Med Spas FAQ content — single source of truth.
 *
 * Imported by:
 *   - MedSpasClient.tsx  → renders the visible accordion
 *   - page.tsx           → emits FAQPage structured data (JSON-LD)
 *
 * Keeping one array avoids drift between the on-page copy and the schema,
 * which is what Google checks when validating FAQ rich results.
 */
export interface MedSpaFaq {
  q: string;
  a: string;
}

export const MED_SPA_FAQS: MedSpaFaq[] = [
  {
    q: 'What is AI visibility for a med spa?',
    a: 'AI visibility refers to whether your clinic appears when people ask platforms such as ChatGPT, Gemini and Perplexity for recommendations, comparisons or information about treatments in your area. It also includes whether your website is cited, whether your clinic is accurately described, and whether your practitioners are recognised for relevant expertise.',
  },
  {
    q: 'How do you measure our visibility?',
    a: 'We create a defined set of high-intent prompts based on your treatments, location and commercial priorities. We then audit the answers across ChatGPT, Gemini and Perplexity, recording brand mentions, website citations, direct recommendations, competitors and source usage.',
  },
  {
    q: 'Can you guarantee that AI will recommend us?',
    a: 'No. The platforms operate independently and their answers can change. We strengthen the authority, relevance, consistency and third-party evidence connected with your brand. These are the areas most likely to improve how your clinic is understood and considered.',
  },
  {
    q: 'Is AI visibility the same as SEO?',
    a: 'No, but the two are connected. SEO focuses heavily on website rankings and organic traffic. AI visibility also includes third-party mentions, citations, practitioner entities, reviews, external profiles, editorial coverage and the sources used to produce generated answers. Strong authority building can support both.',
  },
  {
    q: 'Does our med spa still need local SEO?',
    a: 'Yes. Patients still use Google Search and Google Maps, while AI platforms may also rely on local business information. TotalAuthority complements local SEO by developing broader brand, practitioner, media and third-party authority.',
  },
  {
    q: 'Why is earned media part of the strategy?',
    a: 'Editorial coverage gives your clinic independent recognition. It can connect your practitioners with relevant expertise, create authoritative mentions, earn backlinks and give both patients and AI systems additional sources through which to validate the brand.',
  },
  {
    q: 'Do you work on our website?',
    a: 'Website alignment can form part of the implementation plan. This may include positioning, treatment associations, practitioner information, citable content, entity clarity, structured data and internal site recommendations. The work is directed by the gaps identified in the audit and Blueprint.',
  },
  {
    q: 'Do you create content?',
    a: 'Yes, where content has a clear authority purpose. This can include expert resources, original research, treatment guides, comparison pages, reports and other assets that may support citations, media outreach and patient education.',
  },
  {
    q: 'Can you promote individual injectors and practitioners?',
    a: 'Yes, provided their experience and credentials support the positioning. Practitioner authority can include media commentary, expert biographies, topic specialisation, professional profiles and expert-led content.',
  },
  {
    q: 'Can you help a multi-location med spa group?',
    a: 'Yes. Multi-location clinics need clear connections between the parent brand, each location, practitioners, treatment offerings, local profiles and external mentions. The audit and strategy can be structured around individual markets or the wider group.',
  },
  {
    q: 'How quickly will visibility improve?',
    a: 'There is no universal timeframe. Some improvements can occur after clearer information or stronger source coverage is discovered. Building a defensible authority footprint requires sustained execution across several areas. Progress should be judged across multiple prompts and models rather than one isolated result.',
  },
  {
    q: 'What happens after the audit?',
    a: 'The next stage is the AI Authority Strategy Blueprint. This expands the baseline findings into a prioritised plan covering competitors, sources, media, website positioning, profiles, citations, content and authority assets. TotalAuthority can then execute the strategy.',
  },
];
