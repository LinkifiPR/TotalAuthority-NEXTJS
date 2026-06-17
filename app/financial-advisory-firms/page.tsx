import { financialAdvisoryFirms } from '@/lib/industry/content/financialAdvisoryFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(financialAdvisoryFirms);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(financialAdvisoryFirms.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(financialAdvisoryFirms)) }}
      />
      <IndustryLandingPage content={financialAdvisoryFirms} relatedPosts={guides} />
    </>
  );
}
