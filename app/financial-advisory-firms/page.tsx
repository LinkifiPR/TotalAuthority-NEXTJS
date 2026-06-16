import { financialAdvisoryFirms } from '@/lib/industry/content/financialAdvisoryFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(financialAdvisoryFirms);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(financialAdvisoryFirms)) }}
      />
      <IndustryLandingPage content={financialAdvisoryFirms} />
    </>
  );
}
