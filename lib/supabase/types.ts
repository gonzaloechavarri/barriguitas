export type SharedListRow = {
  id: string;
  name: string;
  icon: string;
  created_at: string;
  updated_at: string;
};

export type SharedListItemRow = {
  id: string;
  list_id: string;
  text: string;
  completed: boolean;
  created_at: string;
  completed_at: string | null;
  updated_at: string;
  due_date: string | null;
};

export type SharedListInsert = {
  id: string;
  name: string;
  icon?: string;
  created_at?: string;
  updated_at?: string;
};

export type SharedListUpdate = {
  name?: string;
  icon?: string;
  updated_at?: string;
};

export type SharedListItemInsert = {
  id: string;
  list_id: string;
  text: string;
  completed?: boolean;
  created_at?: string;
  completed_at?: string | null;
  updated_at?: string;
  due_date?: string | null;
};

export type SharedListItemUpdate = {
  text?: string;
  completed?: boolean;
  completed_at?: string | null;
  updated_at?: string;
  due_date?: string | null;
};

export type Database = {
  public: {
    Tables: {
      shared_lists: {
        Row: SharedListRow;
        Insert: SharedListInsert;
        Update: SharedListUpdate;
        Relationships: [
          {
            foreignKeyName: "shared_list_items_list_id_fkey";
            columns: ["id"];
            isOneToOne: false;
            referencedRelation: "shared_list_items";
            referencedColumns: ["list_id"];
          },
        ];
      };
      shared_list_items: {
        Row: SharedListItemRow;
        Insert: SharedListItemInsert;
        Update: SharedListItemUpdate;
        Relationships: [
          {
            foreignKeyName: "shared_list_items_list_id_fkey";
            columns: ["list_id"];
            isOneToOne: false;
            referencedRelation: "shared_lists";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
