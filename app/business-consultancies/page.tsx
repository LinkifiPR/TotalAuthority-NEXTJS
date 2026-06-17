import { businessConsultancies } from '@/lib/industry/content/businessConsultancies';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(businessConsultancies);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(businessConsultancies.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(businessConsultancies)) }}
      />
      <IndustryLandingPage content={businessConsultancies} relatedPosts={guides} />
    </>
  );
}
