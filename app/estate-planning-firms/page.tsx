import { estatePlanningFirms } from '@/lib/industry/content/estatePlanningFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(estatePlanningFirms);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(estatePlanningFirms)) }}
      />
      <IndustryLandingPage content={estatePlanningFirms} />
    </>
  );
}
