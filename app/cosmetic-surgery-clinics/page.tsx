import { cosmeticSurgeryClinics } from '@/lib/industry/content/cosmeticSurgeryClinics';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(cosmeticSurgeryClinics);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(cosmeticSurgeryClinics.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(cosmeticSurgeryClinics)) }}
      />
      <IndustryLandingPage content={cosmeticSurgeryClinics} relatedPosts={guides} />
    </>
  );
}
