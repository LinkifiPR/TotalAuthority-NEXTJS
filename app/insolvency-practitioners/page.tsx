import { insolvencyPractitioners } from '@/lib/industry/content/insolvencyPractitioners';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(insolvencyPractitioners);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(insolvencyPractitioners.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(insolvencyPractitioners)) }}
      />
      <IndustryLandingPage content={insolvencyPractitioners} relatedPosts={guides} />
    </>
  );
}
