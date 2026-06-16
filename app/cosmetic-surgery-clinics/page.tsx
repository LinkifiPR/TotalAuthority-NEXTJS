import { cosmeticSurgeryClinics } from '@/lib/industry/content/cosmeticSurgeryClinics';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';

export const metadata = buildIndustryMetadata(cosmeticSurgeryClinics);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(cosmeticSurgeryClinics)) }}
      />
      <IndustryLandingPage content={cosmeticSurgeryClinics} />
    </>
  );
}
