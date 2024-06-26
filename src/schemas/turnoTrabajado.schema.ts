import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    sql
  } from "@sequelize/core";

import { Attribute, Table, Default, PrimaryKey, NotNull, AllowNull } from '@sequelize/core/decorators-legacy';
import { TurnoTrabajadoTableName } from "./tableDefinition";
import { Trabajador } from "./trabajador.schema";

@Table({ tableName: TurnoTrabajadoTableName, timestamps: false })
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
    @AllowNull
    declare fechaLogout: Date | null;

    @Attribute(DataTypes.UUID)
    declare id_Trabajador: ForeignKey<Trabajador['id_Trabajador']>;
    
    }