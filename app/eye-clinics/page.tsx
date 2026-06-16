import { eyeClinics } from '@/lib/industry/content/eyeClinics';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(eyeClinics);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(eyeClinics)) }}
      />
      <IndustryLandingPage content={eyeClinics} />
    </>
  );
}
