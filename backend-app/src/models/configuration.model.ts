import { Document, Model, Schema, model, models } from "mongoose";
import IGeneric from "../interfaces/generic.interface";

export interface IConfiguration extends Document, IGeneric {
  id: objectId;
  businessName: string;
  nit?: string;
  phone: string;
  email: string;
  web?: string;
  address: string;
  s3BucketUrl?: string;
  measurementUnits: {
    name: string;
    shortName: string;
  }[];
}
export interface IModelConfiguration extends Model<IConfiguration> {}
const configurationSchema = new Schema<IConfiguration>(
  {
    businessName: {
      type: String,
      required: [true, "nombre de la empresa es obligatorio"],
      trim: true,
    },
    nit: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "telefono es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "email es obligatorio"],
    },
    web: { type: String },
    address: {
      type: String,
      required: [true, "dirección es obligatorio"],
    },
    s3BucketUrl: {
      type: String,
      // required: [true, "s3 url es obligatorio"],
    },
    measurementUnits: [
      {
        _id: false,
        name: {
          type: String,
          default: "Unidades",
        },
        shortName: String,
      },
    ],
  },
  { timestamps: true }
);

const Configuration = (models.Configuration as IModelConfiguration) || model<IConfiguration, IModelConfiguration>(
  "Configuration",
  configurationSchema,
  "configuration"
);

export default Configuration;
