// import { Document, Model } from 'mongoose'

// export const updateGenericInstance = <S extends Document, T extends Model<S>>(initialInstance: T, updateInstance: T, excludeProperties: string[]) => {
export const updateGenericInstance = (
  initialInstance: any,
  updateInstance: any,
  excludeProperties: string[] = []
) => {
  Object.entries(updateInstance).forEach(([key, _]) => {
    if (excludeProperties.includes(key)) return;
    if (updateInstance[key] || typeof updateInstance[key] === "boolean") {
      initialInstance[key] = updateInstance[key];
    }
  });
};
