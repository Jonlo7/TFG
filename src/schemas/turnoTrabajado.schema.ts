import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    sql
  } from "@sequelize/core";

import { Attribute, Table, Default, PrimaryKey, NotNull } from '@sequelize/core/decorators-legacy';
import { TurnoTrabajadoTableName } from "./tableDefinition";
import { Trabajador } from "./trabajador.schema";

@Table({ tableName: TurnoTrabajadoTableName, timestamps: true })
export class TurnoTrabajado extends Model<
  InferAttributes<TurnoTrabajado>,
  InferCreationAttributes<TurnoTrabajado>
> {
    @Attribute(DataTypes.STRING)
    @PrimaryKey
    @NotNull
    declare id_Turno: CreationOptional<string>;
    
    @Attribute(DataTypes.DATE)
    @NotNull
    declare fechaLogin: Date;
    
    @Attribute(DataTypes.DATE)
    declare fechaLogout?: Date;

    @Attribute(DataTypes.UUID)
    declare id_Trabajador: ForeignKey<Trabajador['id_Trabajador']>;
    
    }