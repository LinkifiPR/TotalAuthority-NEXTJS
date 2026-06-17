import { estatePlanningFirms } from '@/lib/industry/content/estatePlanningFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(estatePlanningFirms);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(estatePlanningFirms.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(estatePlanningFirms)) }}
      />
      <IndustryLandingPage content={estatePlanningFirms} relatedPosts={guides} />
    </>
  );
}
