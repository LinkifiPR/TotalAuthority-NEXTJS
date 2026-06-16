import { dentalClinics } from '@/lib/industry/content/dentalClinics';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(dentalClinics);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(dentalClinics)) }}
      />
      <IndustryLandingPage content={dentalClinics} />
    </>
  );
}
