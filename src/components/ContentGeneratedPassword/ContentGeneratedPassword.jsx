import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

import MuiBox from "@mui/material/Box";
import MuiCircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import MuiCachedRoundedIcon from "@mui/icons-material/CachedRounded";
import MuiContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

import { InputBase, LinearProgress, Tooltip } from "@mui/material";
import useOpeniaCompletions from "../../hooks/useOpeniaCompletions";

import { useMaterialUIProvider } from "../../context";

const colorsLevelPasswordStrength = {
  0: { value: 5, color: "#EB1C23" },
  1: { value: 25, color: "#FF7B00" },
  2: { value: 50, color: "#F4BB00" },
  3: { value: 75, color: "#C0CC00" },
  4: { value: 100, color: "#5CB400" },
};

const ContentGeneratedPassword = () => {
  // Context
  const [state] = useMaterialUIProvider();
  const { maxPasswordLength } = state;

  const [toggle, setToggle] = useState(false);

  const { data, loading } = useOpeniaCompletions(toggle, maxPasswordLength);

  const [passwordStrength, setPasswordStrength] = useState(0);

  const [tooltipCopy, setTooltipCopy] = useState("Copiar");

  const handleGeneratePassword = () => {
    setToggle((prev) => !prev);
  };

  const copyToClipboard = () => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(data);
    }
    return Promise.reject("The Clipboard API is not available.");
  };

  const handleClickCopyButton = () => {
    copyToClipboard();
    setTooltipCopy("¡Copiado!");
  };

  useEffect(() => {
    setTimeout(() => {
      setTooltipCopy("Copiar");
    }, 2000);
  }, [tooltipCopy]);

  useEffect(() => {
    if (!loading && data) {
      let pass = zxcvbn(data);
      setPasswordStrength(pass.score);
    }
  }, [loading]);

  return (
    <MuiBox>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          px: 2.5,
          py: 1.5,
        }}
      >
        <MuiBox
          sx={{
            position: "relative",
            width: "100%",
            " &::after": {
              content: "''",
              position: "absolute",
              right: 0,
              width: 30,
              height: "100%",
              pointerEvents: "none",
              background: "linear-gradient(270deg, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 100%)",
            },
          }}
        >
          <InputBase
            value={data}
            placeholder="Generar contraseña"
            inputProps={{ "aria-label": "generar contraseña" }}
            sx={{ width: "100%", fontSize: "1.25rem" }}
            disabled={loading}
          />
        </MuiBox>

        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Tooltip title={tooltipCopy} placement="top" arrow>
            <IconButton
              aria-label="regenerate password"
              onClick={handleClickCopyButton}
              sx={{ color: "hsla(0, 0%, 0%, 0.5)" }}
            >
              <MuiContentCopyRoundedIcon />
            </IconButton>
          </Tooltip>

          {loading ? (
            <MuiBox sx={{ p: 1.25 }}>
              <CustomCircularProgress />
            </MuiBox>
          ) : (
            <Tooltip title="Generar" placement="top" arrow>
              <IconButton
                aria-label="regenerate password"
                onClick={handleGeneratePassword}
                sx={{ color: "hsla(0, 0%, 0%, 0.5)" }}
              >
                <MuiCachedRoundedIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>

      <MuiBox sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={colorsLevelPasswordStrength[passwordStrength].value}
          sx={{
            bgcolor: "hsla(0, 0%, 0%, 0.05)",
            borderRadius: 2,

            "& .MuiLinearProgress-bar": {
              bgcolor: colorsLevelPasswordStrength[passwordStrength].color,
            },
          }}
        />
      </MuiBox>
    </MuiBox>
  );
};

export default ContentGeneratedPassword;

// Inspired by the former Facebook spinners.
function CustomCircularProgress(props) {
  return (
    <MuiBox sx={{ position: "relative", height: 20 }}>
      <MuiCircularProgress
        variant="determinate"
        sx={{
          color: "hsla(0, 0%, 0%, 0.3)",
        }}
        size={20}
        thickness={6}
        {...props}
        value={100}
      />

      <MuiCircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          position: "absolute",
          left: 0,
          color: "hsla(0, 0%, 100%, 0.5)",
          animationDuration: "400ms",
          ["& .MuiCircularProgress-circle"]: {
            strokeLinecap: "round",
          },
        }}
        size={20}
        thickness={6}
        {...props}
      />
    </MuiBox>
  );
}
