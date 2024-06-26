import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    sql
  } from "@sequelize/core";
  import { Attribute, Table, Default, PrimaryKey, NotNull, AllowNull } from '@sequelize/core/decorators-legacy';
import { LoteTableName } from "./tableDefinition";

@Table({ tableName: LoteTableName, timestamps: false})
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
    @AllowNull
    declare botellasCorrectas: number;

    @Attribute(DataTypes.DATE)
    @AllowNull
    declare horaInicio: Date;

    @Attribute(DataTypes.DATE)
    @AllowNull
    declare horaFin: Date;

    @Attribute(DataTypes.INTEGER)
    declare numLote: number;
}