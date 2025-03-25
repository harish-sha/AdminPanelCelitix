import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Slide,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import InfoIcon from "@mui/icons-material/Info";
import MapIcon from "@mui/icons-material/Map";

const iconsMap = {
  city: <LocationOnIcon className="text-blue-500" fontSize="small" />,
  country_name: <PublicIcon className="text-green-500" fontSize="small" />,
  ip: <NetworkCheckIcon className="text-purple-500" fontSize="small" />,
  user_id: <InfoIcon className="text-orange-500" fontSize="small" />,
  insert_time: <MapIcon className="text-pink-500" fontSize="small" />,
  region: <MapIcon className="text-yellow-500" fontSize="small" />,
  country_code: <PublicIcon className="text-blue-600" fontSize="small" />,
  org: <NetworkCheckIcon className="text-indigo-600" fontSize="small" />,
};

export const IPDetailsDrawer = ({ row, open, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      transitionDuration={300}
      SlideProps={{ direction: "left" }}
    >
      <Slide
        direction="left"
        in={open}
        mountOnEnter
        unmountOnExit
        timeout={300}
      >
        <Box className="w-[60rem] h-full bg-white p-6 relative overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Typography variant="h6" className="font-semibold">
              IP Details
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* Divider */}
          <Divider className="mb-4" />

          {/* Content */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {Object.entries(row).map(([key, value]) => {
              return (
                <div
                  key={key}
                  className="flex items-start gap-3 px-2 py-2 bg-gray-100 shadow-sm rounded-xl"
                >
                  {/* Icon */}
                  <div className="mt-1">
                    {iconsMap[key] || (
                      <InfoIcon className="text-gray-400" fontSize="small" />
                    )}
                  </div>

                  {/* Data */}
                  <div className="text-sm">
                    <div className="font-medium text-gray-600 capitalize">
                      {key.replace(/_/g, " ")}
                    </div>
                    {/* <div className="font-semibold text-gray-800 break-all">
                      {value || "-"}
                    </div> */}
                    <div className="font-semibold text-gray-800 break-all">
                      {value === true
                        ? "Yes"
                        : value === false
                        ? "No"
                        : value !== null && value !== undefined
                        ? String(value)
                        : "-"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Box>
      </Slide>
    </Drawer>
  );
};
