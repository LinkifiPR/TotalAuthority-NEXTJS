import { medSpas } from '@/lib/industry/content/medSpas';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(medSpas);

export default function MedSpasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(medSpas)) }}
      />
      <IndustryLandingPage content={medSpas} />
    </>
  );
}
