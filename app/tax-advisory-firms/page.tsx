import { taxAdvisoryFirms } from '@/lib/industry/content/taxAdvisoryFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(taxAdvisoryFirms);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(taxAdvisoryFirms)) }}
      />
      <IndustryLandingPage content={taxAdvisoryFirms} />
    </>
  );
}
