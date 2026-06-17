import { wealthManagementFirms } from '@/lib/industry/content/wealthManagementFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(wealthManagementFirms);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(wealthManagementFirms.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(wealthManagementFirms)) }}
      />
      <IndustryLandingPage content={wealthManagementFirms} relatedPosts={guides} />
    </>
  );
}
