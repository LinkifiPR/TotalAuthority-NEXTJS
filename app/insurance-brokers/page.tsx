import { insuranceBrokers } from '@/lib/industry/content/insuranceBrokers';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(insuranceBrokers);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(insuranceBrokers.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(insuranceBrokers)) }}
      />
      <IndustryLandingPage content={insuranceBrokers} relatedPosts={guides} />
    </>
  );
}
