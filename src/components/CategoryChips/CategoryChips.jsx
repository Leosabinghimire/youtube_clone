import { useEffect, useRef } from "react";
import { Box, Chip } from "@mui/material";
import { CATEGORIES } from "../../constants/categories";
import { NAVBAR_HEIGHT } from "../../theme";

export default function CategoryChips({ value, onChange }) {
  const activeRef = useRef(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [value]);

  return (
    <Box
      role="tablist"
      aria-label="Categories"
      sx={{
        position: "sticky",
        top: NAVBAR_HEIGHT,
        zIndex: 2,
        display: "flex",
        gap: { xs: 1, sm: 1.5 },
        px: { xs: 2, sm: 3 },
        py: 1.5,
        bgcolor: "background.default",
        overflowX: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {CATEGORIES.map(({ id, label, chip }) => {
        const active = id === value;
        return (
          <Chip
            key={id}
            ref={active ? activeRef : null}
            label={chip ?? label}
            clickable
            role="tab"
            aria-selected={active}
            onClick={() => onChange(id)}
            sx={
              active
                ? { bgcolor: "chip.active", color: "chip.activeText", "&:hover": { bgcolor: "chip.active" } }
                : undefined
            }
          />
        );
      })}
    </Box>
  );
}
