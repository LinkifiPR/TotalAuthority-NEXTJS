import { privateMedicalPractices } from '@/lib/industry/content/privateMedicalPractices';
import { IndustryLandingPage } from '@/components/industry/IndustryLandingPage';
import { buildIndustryMetadata, buildIndustryJsonLd } from '@/lib/industry/seo';
import { getIndustryGuides } from '@/lib/industry/guides';

export const metadata = buildIndustryMetadata(privateMedicalPractices);
export const revalidate = 300;

export default async function Page() {
  const guides = await getIndustryGuides(privateMedicalPractices.slug);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildIndustryJsonLd(privateMedicalPractices)) }}
      />
      <IndustryLandingPage content={privateMedicalPractices} relatedPosts={guides} />
    </>
  );
}
