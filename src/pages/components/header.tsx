import "../../styles/globals.css";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { styled, useColorScheme } from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Level } from "@/types/level";

type headerProps = {
  level: Level | undefined;
};

function HeaderComponent(level: headerProps) {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
    toggleColorScheme();
  };
  const { mode, setMode } = useColorScheme();

  const toggleColorScheme = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  return (
    <div className="flex flex-row-reverse items-center justify-between w-full bg-lightTheme-secondary dark:bg-darkTheme-secondary h-[100px]">
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ height: "800px" }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>

      <div className="flex flex-row-reverse items-center">
        <h1 className="font-mono leading-tight tracking-tighter text-5xl mr-5">
          חיבורים
        </h1>

        <span className="m-4 self-end text-2xl">חידה #{level.level?.id}</span>
      </div>

      <div className="flex items-center">
        <span
          onClick={() => setOpen(true)}
          className="text-2xl m-10 hover:cursor-pointer hover:text-white dark:hover:text-black"
        >
          ?איך משחקים
        </span>
        <button onClick={() => darkModeHandler()}>
          {dark ? <BedtimeIcon /> : <WbSunnyIcon />}
        </button>
      </div>
    </div>
  );
}

export default HeaderComponent;
