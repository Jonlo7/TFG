import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    sql
  } from "@sequelize/core";
  import { Attribute, Table, Default, PrimaryKey, NotNull } from '@sequelize/core/decorators-legacy';
import { LoteTableName } from "./tableDefinition";

@Table({ tableName: LoteTableName, timestamps: false, indexes: []})
export class Lote extends Model<
  InferAttributes<Lote>,
  InferCreationAttributes<Lote>
> {
    @Attribute(DataTypes.UUID)
    @Default(sql.uuidV4)
    @PrimaryKey
    @NotNull
    declare id_Lote: CreationOptional<string>;  

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare botellasCorrectas: number;

    @Attribute(DataTypes.DATE)
    @NotNull
    declare horaInicio: Date;

    @Attribute(DataTypes.DATE)
    @NotNull
    declare horaFin: Date;

    @Attribute(DataTypes.TIME)
    @NotNull
    declare tiempoTrabajo: Date;
}