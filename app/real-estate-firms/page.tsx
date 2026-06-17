import { realEstateFirms } from '@/lib/industry/content/realEstateFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(realEstateFirms);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(realEstateFirms.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(realEstateFirms)) }}
      />
      <IndustryLandingPage content={realEstateFirms} relatedPosts={guides} />
    </>
  );
}
