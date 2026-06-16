import { charteredSurveyors } from '@/lib/industry/content/charteredSurveyors';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(charteredSurveyors);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(charteredSurveyors)) }}
      />
      <IndustryLandingPage content={charteredSurveyors} />
    </>
  );
}
