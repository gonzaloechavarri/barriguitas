import type { ComponentType } from "react";

export type ModuleId =
  | "casa"
  | "nosotros"
  | "patrimonio"
  | "documentos"
  | "agenda"
  | "ia"
  | "ajustes";

export type ModuleDefinition = {
  id: ModuleId;
  icon: string;
  title: string;
  description: string;
  component: ComponentType;
};
