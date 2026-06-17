import { eyeClinics } from '@/lib/industry/content/eyeClinics';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(eyeClinics);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(eyeClinics.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(eyeClinics)) }}
      />
      <IndustryLandingPage content={eyeClinics} relatedPosts={guides} />
    </>
  );
}
