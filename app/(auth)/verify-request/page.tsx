import { Card } from '@/components/ui/card';
import { FlexCol } from '@/components/ui/Flex';

export default function VerifyRequest() {
  return (
    <FlexCol as="main" className="h-screen items-center justify-center px-4">
      <Card className="pb-10 pt-6">
        <h1 className="mb-6 mt-2 text-center text-3xl font-semibold">
          Check your email
        </h1>
        <p className="text-center text-xl">
          A sign in link has been sent to your email address.
        </p>
      </Card>
    </FlexCol>
  );
}
