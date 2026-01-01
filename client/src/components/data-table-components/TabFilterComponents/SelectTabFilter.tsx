import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// SelectTabFilter.tsx

interface SelectTabFilterProps<K extends string | number> {
  category: Record<K, string>;
  activeTab: string; // The value from Tabs is usually a string
  onTabChange: (value: K) => void;
}

export default function SelectTabFilter<K extends string | number>({
  category,
  activeTab,
  onTabChange
}: SelectTabFilterProps<K>) {
  return (
    <div className="flex items-center gap-4 @6xl/main:hidden">
      <Label htmlFor="view-selector">View:</Label>
      <Select
        value={activeTab}
        onValueChange={(val) => onTabChange(val as K)} // Cast val to K
      >
        <SelectTrigger className="w-fit" id="view-selector">
          <SelectValue placeholder="Select a view" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(category).map(([key, label]) => (
            <SelectItem key={key} value={String(label)}>
              {label as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}