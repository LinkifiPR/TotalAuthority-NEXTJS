import { accountancyFirms } from '@/lib/industry/content/accountancyFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(accountancyFirms);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(accountancyFirms)) }}
      />
      <IndustryLandingPage content={accountancyFirms} />
    </>
  );
}
