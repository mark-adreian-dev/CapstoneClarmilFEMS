import { TabsList, TabsTrigger } from "@/components/ui/tabs";
interface TabListFilterProps<K extends string | number> {

  category: Record<K, string>;
}

export default function TabListFilter<K extends string | number>({
  category,
}: TabListFilterProps<K>) {



  return (
    <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @6xl/main:flex gap-1">
      {/* 2. Map through the dynamic category object */}
      {Object.entries(category).map(([key, label]) => {
        return (
          <TabsTrigger
            key={key}
            className="cursor-pointer hover:bg-primary-foreground gap-2"
            value={label as string}
          >
            {label as string}
          </TabsTrigger>
        )
      })}
    </TabsList>
  );
}