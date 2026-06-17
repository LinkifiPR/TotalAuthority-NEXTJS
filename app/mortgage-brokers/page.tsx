import { mortgageBrokers } from '@/lib/industry/content/mortgageBrokers';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(mortgageBrokers);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(mortgageBrokers.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(mortgageBrokers)) }}
      />
      <IndustryLandingPage content={mortgageBrokers} relatedPosts={guides} />
    </>
  );
}
