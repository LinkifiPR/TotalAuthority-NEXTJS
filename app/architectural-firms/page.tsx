import { architecturalFirms } from '@/lib/industry/content/architecturalFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(architecturalFirms);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(architecturalFirms)) }}
      />
      <IndustryLandingPage content={architecturalFirms} />
    </>
  );
}
