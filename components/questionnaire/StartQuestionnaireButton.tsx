'use client';

import Link from 'next/link';
import Button from '../buttons/Button';

export default function StartQuestionnaireButton() {
  const handleClick = async () => {};
  return (
    <Link href="/dashboard/questionnaire">
      <Button
        onClick={handleClick}
        size="large"
        intent="secondary"
        className="h-16 w-56"
      >
        Start questionnaire
      </Button>
    </Link>
  );
}
