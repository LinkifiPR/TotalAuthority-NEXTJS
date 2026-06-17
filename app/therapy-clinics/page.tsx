import { therapyClinics } from '@/lib/industry/content/therapyClinics';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(therapyClinics);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(therapyClinics.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(therapyClinics)) }}
      />
      <IndustryLandingPage content={therapyClinics} relatedPosts={guides} />
    </>
  );
}
