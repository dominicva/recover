import Link from 'next/link';
import Container from '@/components/ui/Container';
import { FlexCol } from '@/components/ui/Flex';
import { buttonVariants } from '../ui/button';

export default function Hero() {
  return (
    <Container as="section" className="h-screen px-4 py-12 sm:py-20 lg:py-48">
      <FlexCol as="hgroup" className="mb-10 gap-6 text-off-black lg:gap-8">
        <h2 className="max-w-[20rem] text-4xl font-semibold lg:max-w-[32rem] lg:text-6xl">
          Get a helping hand with your recovery
        </h2>
        <p className="max-w-xl text-lg lg:text-xl">
          Journal and receive gentle advice from your AI addiction recovery
          helper. Visualize and celebrate your progress.
        </p>
      </FlexCol>
      <Link
        href="/signup"
        className={buttonVariants({
          variant: 'default',
          size: 'lg',
        })}
      >
        <span className="text-lg">Get started</span>
      </Link>
    </Container>
  );
}
