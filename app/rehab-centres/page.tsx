import { rehabCentres } from '@/lib/industry/content/rehabCentres';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(rehabCentres);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(rehabCentres.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(rehabCentres)) }}
      />
      <IndustryLandingPage content={rehabCentres} relatedPosts={guides} />
    </>
  );
}
