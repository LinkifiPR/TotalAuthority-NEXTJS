import { wealthManagementFirms } from '@/lib/industry/content/wealthManagementFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(wealthManagementFirms);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(wealthManagementFirms)) }}
      />
      <IndustryLandingPage content={wealthManagementFirms} />
    </>
  );
}
