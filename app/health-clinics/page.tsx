import { healthClinics } from '@/lib/industry/content/healthClinics';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(healthClinics);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(healthClinics.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(healthClinics)) }}
      />
      <IndustryLandingPage content={healthClinics} relatedPosts={guides} />
    </>
  );
}
