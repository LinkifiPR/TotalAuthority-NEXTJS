import { realEstateFirms } from '@/lib/industry/content/realEstateFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(realEstateFirms);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(realEstateFirms)) }}
      />
      <IndustryLandingPage content={realEstateFirms} />
    </>
  );
}
