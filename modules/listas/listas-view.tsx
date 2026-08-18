import type { SharedList } from "@/lib/data/types/lists";
import { ListCard } from "./components/list-card";

type ListasViewProps = {
  lists: SharedList[];
  onSelectList: (listId: string) => void;
};

export function ListasView({ lists, onSelectList }: ListasViewProps) {
  return (
    <div className="mx-auto w-full max-w-xl px-6 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-4">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-medium tracking-[-0.03em] text-white/90">
          Listas
        </h2>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {lists.map((list, index) => (
          <ListCard
            key={list.id}
            list={list}
            delay={80 + index * 80}
            onSelect={() => onSelectList(list.id)}
          />
        ))}
      </div>
    </div>
  );
}
