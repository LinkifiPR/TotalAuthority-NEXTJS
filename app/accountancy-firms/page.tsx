import { accountancyFirms } from '@/lib/industry/content/accountancyFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(accountancyFirms);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(accountancyFirms.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(accountancyFirms)) }}
      />
      <IndustryLandingPage content={accountancyFirms} relatedPosts={guides} />
    </>
  );
}
