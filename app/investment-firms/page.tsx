import { investmentFirms } from '@/lib/industry/content/investmentFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(investmentFirms);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(investmentFirms)) }}
      />
      <IndustryLandingPage content={investmentFirms} />
    </>
  );
}
