import { AjustesModule } from "@/modules/ajustes/ajustes-module";
import { CasaModule } from "@/modules/casa/casa-module";
import { DocumentosModule } from "@/modules/documentos/documentos-module";
import { IaModule } from "@/modules/ia/ia-module";
import { ListasModule } from "@/modules/listas/listas-module";
import { NosotrosModule } from "@/modules/nosotros/nosotros-module";
import { PatrimonioModule } from "@/modules/patrimonio/patrimonio-module";
import type { ModuleDefinition, ModuleId } from "./types";

export const modules: ModuleDefinition[] = [
  {
    id: "documentos",
    icon: "☀️",
    title: "Hoy",
    description: "Lo esencial de hoy, de un vistazo.",
    component: DocumentosModule,
  },
  {
    id: "nosotros",
    icon: "❤️",
    title: "Nosotros",
    description: "Nuestra vida juntos",
    component: NosotrosModule,
  },
  {
    id: "casa",
    icon: "🏡",
    title: "Villa Barriguita",
    description: "Las cositas de la casa",
    component: CasaModule,
  },
  {
    id: "patrimonio",
    icon: "🌱",
    title: "Ahorro",
    description: "Los mano rotas ahorrando",
    component: PatrimonioModule,
  },
  {
    id: "listas",
    icon: "📝",
    title: "Listas",
    description: "Listas compartidas de cosas pendientes",
    component: ListasModule,
  },
  {
    id: "ia",
    icon: "🤖",
    title: "Copiloto",
    description: "Nuestro agente IA ayudándonos",
    component: IaModule,
  },
  {
    id: "ajustes",
    icon: "⚙️",
    title: "Ajustes",
    description: "Cómo funciona Barriguitas para nosotros.",
    component: AjustesModule,
  },
];

export const DEFAULT_MODULE_ID: ModuleId = "documentos";

const moduleMap = new Map(modules.map((module) => [module.id, module]));

export function getModule(id: ModuleId): ModuleDefinition {
  const module = moduleMap.get(id);
  if (!module) {
    throw new Error(`Module "${id}" not found in registry.`);
  }
  return module;
}

export function getDockModules(): ModuleDefinition[] {
  return modules.filter((module) => module.id !== "ajustes");
}
