import MuiContainer from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { ContentGeneratedPassword, MenuWithOptions, PoweredByFooter, Title } from "./components";

function App() {
  return (
    <Stack
      sx={{
        bgcolor: "hsl(0, 0%, 96%)",
      }}
    >
      <MuiContainer maxWidth="sm">
        <Stack
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
          sx={{
            minHeight: "100vh",
            py: 4,
          }}
        >
          <Stack spacing={4}>
            <Title />

            <Stack spacing={4} sx={{ px: 2.5, py: 1.5, bgcolor: "background.default", borderRadius: 2 }}>
              <ContentGeneratedPassword />

              <MenuWithOptions />
            </Stack>
          </Stack>

          <PoweredByFooter />
        </Stack>
      </MuiContainer>
    </Stack>
  );
}

export default App;
