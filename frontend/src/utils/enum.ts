import { SelectOption } from '@/components/Form/SelectMenu';

export function enumFromStringValue<T>(enm: { [s: string]: T }, value: string): T | undefined {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? (value as unknown as T)
    : undefined;
}

export function enumToSelectOptionArr<T extends string | number>(
  originalEnum: { [key: string]: T },
  translatedEnum: Record<T, string>,
): SelectOption[] {
  return Object.values(originalEnum).map((element) => {
    return { value: `${element}`, label: `${translatedEnum[element]}` };
  });
}
