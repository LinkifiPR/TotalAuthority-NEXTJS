import { businessConsultancies } from '@/lib/industry/content/businessConsultancies';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(businessConsultancies);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(businessConsultancies)) }}
      />
      <IndustryLandingPage content={businessConsultancies} />
    </>
  );
}
