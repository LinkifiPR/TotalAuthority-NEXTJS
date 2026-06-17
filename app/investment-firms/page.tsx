import { investmentFirms } from '@/lib/industry/content/investmentFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(investmentFirms);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(investmentFirms.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(investmentFirms)) }}
      />
      <IndustryLandingPage content={investmentFirms} relatedPosts={guides} />
    </>
  );
}
