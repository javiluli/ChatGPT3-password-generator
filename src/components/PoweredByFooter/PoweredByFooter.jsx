import MuiBox from "@mui/material/Box";
import MuiStack from "@mui/material/Stack";
import MuiTypography from "@mui/material/Typography";

import { Link } from "@mui/material";

const PoweredByFooter = () => {
  return (
    <MuiStack direction="row" alignItems="center">
      <MuiTypography className="read-the-docs">
        Powered by
        <MuiTypography component={Link} href="https://chat.openai.com/chat" underline="none" sx={{ mx: 0.5 }}>
          ChatGPT-3
        </MuiTypography>
        from
      </MuiTypography>

      <MuiBox
        component="img"
        sx={{
          width: 20,
          ml: 0.75,
          mr: 0.25,
          // maxHeight: { xs: 233, md: 167 },
          // maxWidth: { xs: 350, md: 250 },
        }}
        alt="The house from the offer."
        src="../public/openai.svg"
      />

      <MuiTypography component={Link} href="https://openai.com/" underline="none">
        OpenAI
      </MuiTypography>
    </MuiStack>
  );
};

export default PoweredByFooter;
