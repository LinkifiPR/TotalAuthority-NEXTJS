import { businessBrokers } from '@/lib/industry/content/businessBrokers';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(businessBrokers);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(businessBrokers.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(businessBrokers)) }}
      />
      <IndustryLandingPage content={businessBrokers} relatedPosts={guides} />
    </>
  );
}
