import { rehabCentres } from '@/lib/industry/content/rehabCentres';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(rehabCentres);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(rehabCentres)) }}
      />
      <IndustryLandingPage content={rehabCentres} />
    </>
  );
}
