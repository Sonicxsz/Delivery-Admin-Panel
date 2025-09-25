import type { ReactNode } from "react"
import { FormControl, InputLabel, Select } from "@mui/material";

export const Selector = ({field,  children, defaultValue}:{field: string, children: ReactNode, defaultValue:any }) => {
  return <FormControl fullWidth>
      <InputLabel id="select-label">{field}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        label={field}
        name={field}
        defaultValue={defaultValue}
      >
        {children}
      </Select>
</FormControl>

}
