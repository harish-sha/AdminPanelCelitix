import React from "react";
import { Popper, Paper, ClickAwayListener } from "@mui/material";
import { motion } from "framer-motion";

const InfoPopover = ({
  anchorEl,
  open,
  onClose,
  children,
  placement = "right-start",
}) => {
  if (!open || !anchorEl) return null;

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement}
      disablePortal={false}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ]}
    >
      <ClickAwayListener onClickAway={onClose}>
        <Paper
          elevation={4}
          sx={{
            zIndex: 1500,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-3 min-w-[280px] max-w-full"
          >
            {children}
          </motion.div>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default InfoPopover;

