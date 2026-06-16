import { therapyClinics } from '@/lib/industry/content/therapyClinics';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(therapyClinics);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(therapyClinics)) }}
      />
      <IndustryLandingPage content={therapyClinics} />
    </>
  );
}
