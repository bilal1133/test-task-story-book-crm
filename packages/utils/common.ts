type CustomObject= { [key: string]: string | string[] } 
export const convertObjectToDotNotation= ({object, fieldName}:{object:CustomObject,fieldName:string})=>{
  const helperObject:CustomObject = {};
  Object.entries(object).forEach(([key, value]) => {
    helperObject[`${fieldName}.${key}`] = value;
  });
  return helperObject
}