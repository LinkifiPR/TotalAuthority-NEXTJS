import { healthClinics } from '@/lib/industry/content/healthClinics';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(healthClinics);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(healthClinics)) }}
      />
      <IndustryLandingPage content={healthClinics} />
    </>
  );
}
