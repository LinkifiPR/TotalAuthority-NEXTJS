import { medSpas } from '@/lib/industry/content/medSpas';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(medSpas);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(medSpas.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(medSpas)) }}
      />
      <IndustryLandingPage content={medSpas} relatedPosts={guides} />
    </>
  );
}
