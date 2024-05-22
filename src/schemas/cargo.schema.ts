import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  sql
} from "@sequelize/core";
import { Attribute, Table, Default, PrimaryKey, NotNull } from '@sequelize/core/decorators-legacy';
import { CargoTableName } from "./tableDefinition";

@Table({ tableName: CargoTableName, timestamps: true, indexes: [] })
export class Cargo extends Model<
  InferAttributes<Cargo>,
  InferCreationAttributes<Cargo>
> {
  @Attribute(DataTypes.UUID)
  @Default(sql.uuidV4)
  @PrimaryKey
  @NotNull
  declare id_Cargo: CreationOptional<string>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare nombre: string;
}
