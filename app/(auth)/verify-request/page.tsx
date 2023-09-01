import { Card } from '@/components/ui/card';
import { FlexCol } from '@/components/ui/Flex';

export default function VerifyRequest() {
  return (
    <FlexCol className="mt-28 p-3">
      <Card className="mx-auto max-w-md p-10">
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
