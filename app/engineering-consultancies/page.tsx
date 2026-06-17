import { engineeringConsultancies } from '@/lib/industry/content/engineeringConsultancies';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(engineeringConsultancies);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(engineeringConsultancies.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(engineeringConsultancies)) }}
      />
      <IndustryLandingPage content={engineeringConsultancies} relatedPosts={guides} />
    </>
  );
}
