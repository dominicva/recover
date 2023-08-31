import { Toggle } from '../ui/toggle';

export default function DataParamToggle({
  defaultPressed = true,
  text,
  className,
  setState,
}: {
  defaultPressed: boolean;
  text: string;
  className?: string;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Toggle
      defaultPressed={defaultPressed}
      className={className}
      onClick={() => setState((state) => !state)}
    >
      {text}
    </Toggle>
  );
}
