import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    ForeignKey,
    InferCreationAttributes,
    Model,
    sql
  } from "@sequelize/core";
  import { Attribute, Table, Default, PrimaryKey, NotNull, AllowNull } from '@sequelize/core/decorators-legacy';
  import { HistorialAlarmasTableName } from "./tableDefinition";
import { Alarmas } from "./alarmas.schema";
import { Lote } from "./lote.schema";

@Table({ tableName: HistorialAlarmasTableName, timestamps: false })
export class HistorialAlarmas extends Model<
  InferAttributes<HistorialAlarmas>,
  InferCreationAttributes<HistorialAlarmas>
> {
    @Attribute(DataTypes.UUID)
    @Default(sql.uuidV4)
    @PrimaryKey
    @NotNull
    declare id_Historico: CreationOptional<string>;

    @Attribute(DataTypes.DATE)
    @AllowNull
    declare horaSalto: Date;

    @Attribute(DataTypes.DATE)
    @AllowNull
    declare horaResolucion: Date | null;

    @Attribute(DataTypes.UUID)
    declare id_Alarma: ForeignKey<Alarmas['id_Alarma']>;;

    @Attribute(DataTypes.UUID)
    declare id_Lote: ForeignKey<Lote['id_Lote']>;;
    
    }