import { architecturalFirms } from '@/lib/industry/content/architecturalFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(architecturalFirms);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(architecturalFirms.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(architecturalFirms)) }}
      />
      <IndustryLandingPage content={architecturalFirms} relatedPosts={guides} />
    </>
  );
}
