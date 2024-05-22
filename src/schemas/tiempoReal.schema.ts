import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  sql
} from "@sequelize/core";
import { Attribute, Table, Default, PrimaryKey, NotNull, Unique, AfterFind } from '@sequelize/core/decorators-legacy';
import { TiempoRealTableName } from "./tableDefinition";

export enum TipoDato {
  BOOLEAN = "BOOLEAN",
  INT = "INT",
  REAL = "REAL",
  ARRAY = "ARRAY",
  DATE = "DATE",
}

@Table({ tableName: TiempoRealTableName, timestamps: true, indexes: [] })
export class TiempoReal extends Model<
  InferAttributes<TiempoReal>,
  InferCreationAttributes<TiempoReal>
> {
  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  @PrimaryKey
  declare clave: string;

  @Attribute(DataTypes.TEXT('medium'))
  @NotNull
  declare valor: string;

  @Attribute(DataTypes.VIRTUAL())
  declare valorParseado?: boolean | number | (boolean)[] | Date;

  @Attribute(DataTypes.ENUM(Object.values(TipoDato)))
  @NotNull
  declare tipo: TipoDato;

  @AfterFind
  static parsearValor(tiempoReal: TiempoReal | TiempoReal[] | null) {
    if (!tiempoReal) return;
    
    function parseNow(tiempoReal: TiempoReal) {
      switch (tiempoReal.tipo) {
        case TipoDato.BOOLEAN:
          return tiempoReal.valor === "true";
        case TipoDato.INT:
          return Number(tiempoReal.valor);
        case TipoDato.REAL:
          return parseFloat(tiempoReal.valor);
        case TipoDato.ARRAY:
          return  JSON.parse(tiempoReal.valor);  
        case TipoDato.DATE:
          return new Date(tiempoReal.valor);
        default:
          throw new Error("Tipo de dato no soportado");
      }
    }

    if (Array.isArray(tiempoReal)) {
      tiempoReal.forEach((tiempoReal) => {
        tiempoReal.valorParseado = parseNow(tiempoReal);
      });
    } else {
      tiempoReal.valorParseado = parseNow(tiempoReal);
    }
  }
}
