import { CircularProgress } from "@mui/material";
const Progress = ({ caption, size, thickness, color }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      {caption && <span style={{ marginRight: "1rem" }}>{caption}</span>}
      <CircularProgress
        size={size}
        thickness={thickness}
        sx={{ color: color }}
      />
    </div>
  );
};

export default Progress;
