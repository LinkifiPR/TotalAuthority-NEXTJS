import { engineeringConsultancies } from '@/lib/industry/content/engineeringConsultancies';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(engineeringConsultancies);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(engineeringConsultancies)) }}
      />
      <IndustryLandingPage content={engineeringConsultancies} />
    </>
  );
}
