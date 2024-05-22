import { Alarmas } from "./alarmas.schema";
import { Cargo } from "./cargo.schema"
import { HistorialAlarmas } from "./historialAlarmas.schema";
import { Trabajador } from "./trabajador.schema";
import { Lote } from "./lote.schema";
import { TurnoTrabajado } from "./turnoTrabajado.schema";

export function defineRelations() {
  Trabajador.belongsTo(Cargo, {
    foreignKey: {
      name: "id_Cargo",
      onDelete: "SET NULL",
    },
  });
  HistorialAlarmas.belongsTo(Alarmas, {
    foreignKey: {
      name: "id_Alarma",
      onDelete: "SET NULL",
    },
  });
  HistorialAlarmas.belongsTo(Lote, {
    foreignKey: {
      name: "id_Lote",
      onDelete: "SET NULL",
    },
  });
  TurnoTrabajado.belongsTo(Trabajador, {
    foreignKey: {
      name: "id_Trabajador",
      onDelete: "SET NULL",
    },
  });
}
