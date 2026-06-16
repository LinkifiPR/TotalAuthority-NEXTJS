import { insolvencyPractitioners } from '@/lib/industry/content/insolvencyPractitioners';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(insolvencyPractitioners);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(insolvencyPractitioners)) }}
      />
      <IndustryLandingPage content={insolvencyPractitioners} />
    </>
  );
}
