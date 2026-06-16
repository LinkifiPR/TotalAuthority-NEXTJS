import { mortgageBrokers } from '@/lib/industry/content/mortgageBrokers';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(mortgageBrokers);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(mortgageBrokers)) }}
      />
      <IndustryLandingPage content={mortgageBrokers} />
    </>
  );
}
