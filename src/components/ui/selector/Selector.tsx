import type { ReactNode } from "react"
import { FormControl, InputLabel, Select } from "@mui/material";

export const Selector = ({field, children}:{field: string, children: ReactNode}) => {
  return <FormControl fullWidth>
      <InputLabel id="select-label">{field}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        label={field}
        name={field}
      >
        {children}
      </Select>
</FormControl>

}
