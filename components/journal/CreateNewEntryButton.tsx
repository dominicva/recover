'use client';

import Button from '../buttons/Button';

export default function CreateNewEntryButton() {
  const handleClick = async () => {
    await fetch('/api/journal', {
      method: 'POST',
    });
  };

  return (
    <Button onClick={handleClick} size="large" className="h-16 w-60">
      Create new entry
    </Button>
  );
}
