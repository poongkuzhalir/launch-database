import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

interface ICloudSelect {
  lists: string[];
  labelName: string;
  selectedValue: string[];
  selectLabelId: string;
  isMultiple: boolean;
  handleChange: Function;
}

const CloudSelect = (props: ICloudSelect) => {
  const { lists, labelName, selectedValue, selectLabelId, isMultiple } = props;

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    props.handleChange(event);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id={selectLabelId}>{labelName}</InputLabel>
      <Select
        labelId={selectLabelId}
        multiple={isMultiple}
        value={selectedValue}
        onChange={handleChange}
        input={<OutlinedInput />}
        data-test-id="cloud-select"
        renderValue={(selected) => {
          const item = isMultiple ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          ) : (
            selected
          );
          return item;
        }}
      >
        {lists.map((selectedValue) => (
          <MenuItem key={selectedValue} value={selectedValue}>
            {selectedValue}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CloudSelect;
