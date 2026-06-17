import { taxAdvisoryFirms } from '@/lib/industry/content/taxAdvisoryFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(taxAdvisoryFirms);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(taxAdvisoryFirms.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(taxAdvisoryFirms)) }}
      />
      <IndustryLandingPage content={taxAdvisoryFirms} relatedPosts={guides} />
    </>
  );
}
