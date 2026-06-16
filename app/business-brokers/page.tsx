import { businessBrokers } from '@/lib/industry/content/businessBrokers';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(businessBrokers);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(businessBrokers)) }}
      />
      <IndustryLandingPage content={businessBrokers} />
    </>
  );
}
