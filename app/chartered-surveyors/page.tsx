import { charteredSurveyors } from '@/lib/industry/content/charteredSurveyors';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(charteredSurveyors);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(charteredSurveyors.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(charteredSurveyors)) }}
      />
      <IndustryLandingPage content={charteredSurveyors} relatedPosts={guides} />
    </>
  );
}
