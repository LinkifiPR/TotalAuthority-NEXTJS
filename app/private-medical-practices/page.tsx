import { privateMedicalPractices } from '@/lib/industry/content/privateMedicalPractices';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(privateMedicalPractices);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(privateMedicalPractices)) }}
      />
      <IndustryLandingPage content={privateMedicalPractices} />
    </>
  );
}
