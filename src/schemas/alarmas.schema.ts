import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    sql
  } from "@sequelize/core";
  import { Attribute, Table, Default, PrimaryKey, NotNull } from '@sequelize/core/decorators-legacy';
  import { AlarmasTableName } from "./tableDefinition";

@Table({ tableName: AlarmasTableName, timestamps: false, indexes: []})
export class Alarmas extends Model<
  InferAttributes<Alarmas>,
  InferCreationAttributes<Alarmas>
> {
    @Attribute(DataTypes.UUID)
    @Default(sql.uuidV4)
    @PrimaryKey
    @NotNull
    declare id_Alarma: CreationOptional<string>;
    
    @Attribute(DataTypes.STRING)
    @NotNull
    declare nombre: string;
    
    @Attribute(DataTypes.STRING)
    @NotNull
    declare descripcion: string;
    }
