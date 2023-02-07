import { useMemo, useState } from "react";

import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import { Grid } from "@mui/material";

import { CharacterTypes } from "../../constants";
import { updateMaxPasswordLength, useMaterialUIProvider } from "../../context";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const MenuWithOptions = () => {
  // Context
  const [state, dispatch] = useMaterialUIProvider();
  const { maxPasswordLength } = state;

  const [chipData, setChipData] = useState(CharacterTypes);

  const handleUpdateMaxPasswordLength = (event, newValue) => updateMaxPasswordLength(dispatch, newValue);

  const handleActiveChip = useMemo(
    () => (key) => {
      setChipData((prevData) => {
        const chip = [...prevData].find((element) => element.key === key);

        if (chip) {
          chip.use = !chip.use;
          return [...prevData];
        }
        return prevData;
      });
    },
    [chipData]
  );

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={2} sx={{ display: { xs: "none", sm: "block" } }}>
          <TextField
            id="outlined-number"
            type="number"
            value={maxPasswordLength}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleUpdateMaxPasswordLength}
          />
        </Grid>
        <Grid item xs>
          <Slider
            defaultValue={maxPasswordLength}
            value={maxPasswordLength}
            aria-label="Default"
            valueLabelDisplay="auto"
            max={32}
            onChange={handleUpdateMaxPasswordLength}
          />
        </Grid>
      </Grid>

      <Paper
        component="ul"
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          listStyle: "none",
          px: 0,
          py: 1.5,
          m: 0,
        }}
      >
        {chipData?.map((data) => {
          return (
            <ListItem key={data.key}>
              <Chip
                label={data.value}
                color="primary"
                variant={data.use ? "" : "outlined"}
                onClick={() => handleActiveChip(data.key)}
              />
            </ListItem>
          );
        })}
      </Paper>
    </Stack>
  );
};

export default MenuWithOptions;
