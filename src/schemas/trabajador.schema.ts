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
import { TrabajadorTableName } from "./tableDefinition";
import { Cargo } from "./cargo.schema";

@Table({ tableName: TrabajadorTableName, timestamps: true })
export class Trabajador extends Model<
  InferAttributes<Trabajador>,
  InferCreationAttributes<Trabajador>
> {
  @Attribute(DataTypes.UUID)
  @Default(sql.uuidV4)
  @PrimaryKey
  @NotNull
  declare id_Trabajador: CreationOptional<string>;



  @Attribute(DataTypes.STRING)
  @NotNull
  declare nombre: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare apellido: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare passwordHash: string;

  @Attribute(DataTypes.UUID)
  declare id_Cargo: ForeignKey<Cargo['id_Cargo']>;

  @Attribute(DataTypes.DATE)
  declare createdAt: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updatedAt: CreationOptional<Date>;
}
