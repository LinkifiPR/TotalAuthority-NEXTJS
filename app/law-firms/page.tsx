import { lawFirms } from '@/lib/industry/content/lawFirms';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(lawFirms);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(lawFirms.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(lawFirms)) }}
      />
      <IndustryLandingPage content={lawFirms} relatedPosts={guides} />
    </>
  );
}
