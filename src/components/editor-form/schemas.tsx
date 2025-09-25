import { getBase64 } from "../lib/helpers"
import { useEffect, useState } from "react";
import { Selector } from "../ui/selector/Selector";
import { CategoryService, type Category } from "../../services/CategoryService";
import { http } from "../../app/http/http";
import { MenuItem, Typography } from "@mui/material";


type FieldTypeMap = {
  text: string;
  textArea: string;
  file: File;
};

export interface Field<T extends keyof FieldTypeMap = keyof FieldTypeMap> {
  input: T;
  transform: (val: FieldTypeMap[T]) => T extends "file" ? Promise<string> : any;
  CustomComponent?: (val?: any) => React.ReactNode
}


const NumberProps: Field<"text"> = {
  input: "text",
  transform: (value) => Number(value),
};

const StringProps: Field<"text"> = {
  input: "text",
  transform: (value) => value,
};

const FileProps: Field<"file"> = {
  input: "file",
  transform: async (file) => {

    const result = await getBase64(file) ?? "";
    return result as string;
  },
};



const CategorySelector = ({id}:{id?: number}) => {
  const [categoris,setCategories] = useState<Array<Category> | null>(null)
  const categoryService = CategoryService.getInstance(http)
  useEffect(() => {
    categoryService.getCategories().then(data => setCategories(data))
  }, [])
  return <Selector defaultValue={id}  field="category_id" >{categoris && categoris.map(el => (<MenuItem value={el.id}>{el.name}</MenuItem>))}</Selector>
}

export const CategorySchema = {
    id:{
    ...NumberProps,
    CustomComponent: (value: any) => value && <Typography>ID: {value}</Typography>
  },
  name: StringProps,
  code: StringProps
};


export type CategoryKeys = keyof typeof CategorySchema

export const CategoryFields = Object.keys(CategorySchema).filter(
        (key): key is CatalogKeys => key in CategorySchema
);



export const CatalogSchema = {
  id:{
    ...NumberProps,
    CustomComponent: (value: any) => value && <Typography>ID: {value}</Typography>
  },
  imageUrl: FileProps,
  weight: NumberProps,
  price: NumberProps,
  name: StringProps,
  amount: NumberProps,
  discount_percent: NumberProps,
  sku:StringProps,
  category_id: {
    ...NumberProps,
    CustomComponent: (id?:number) => <CategorySelector id={id} />

  },
  description: StringProps
};


export type CatalogKeys = keyof typeof CatalogSchema

export const CatalogFields = Object.keys(CatalogSchema).filter(
        (key): key is CatalogKeys => key in CatalogSchema
);

