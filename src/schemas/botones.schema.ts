import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    sql
  } from "@sequelize/core";
  import { Attribute, Table, Default, PrimaryKey, NotNull } from '@sequelize/core/decorators-legacy';
  import { BotonesTableName } from "./tableDefinition";

@Table({ tableName: BotonesTableName, timestamps: false, indexes: []})
export class Botones extends Model<
  InferAttributes<Botones>,
  InferCreationAttributes<Botones>
> {
    @Attribute(DataTypes.UUID)
    @Default(sql.uuidV4)
    @PrimaryKey
    @NotNull
    declare id_Boton: CreationOptional<string>;
    
    @Attribute(DataTypes.BOOLEAN)
    @NotNull
    declare valor: boolean;
    }