import type { ComponentType } from "react";

export type ModuleId =
  | "casa"
  | "nosotros"
  | "patrimonio"
  | "documentos"
  | "listas"
  | "ia"
  | "ajustes";

export type ModuleDefinition = {
  id: ModuleId;
  icon: string;
  title: string;
  description: string;
  component: ComponentType;
};
