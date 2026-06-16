import { lawFirms } from '@/lib/industry/content/lawFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(lawFirms);

export default function LawFirmsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(lawFirms)) }}
      />
      <IndustryLandingPage content={lawFirms} />
    </>
  );
}
