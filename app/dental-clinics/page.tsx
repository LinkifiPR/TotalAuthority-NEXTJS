import { dentalClinics } from '@/lib/industry/content/dentalClinics';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(dentalClinics);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(dentalClinics.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(dentalClinics)) }}
      />
      <IndustryLandingPage content={dentalClinics} relatedPosts={guides} />
    </>
  );
}
