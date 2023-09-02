import { Slider } from '../ui/slider';
import { capitalize } from '@/lib/strings';

export default function ParamSlider({
  id,
  label,
  value,
  setValue,
}: {
  id: string;
  label: string;
  value: number;
  setValue: (value: number[]) => void;
}) {
  return (
    <div>
      <div className="mb-4">
        <label htmlFor={id}>{capitalize(label)}</label>
        <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
          {value}
        </span>
      </div>
      <Slider
        id={id}
        name={id}
        max={5}
        step={1}
        defaultValue={[Number(value)]}
        onValueChange={setValue}
      />
    </div>
  );
}
