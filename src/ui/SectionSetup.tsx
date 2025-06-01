import { Paper, Box, Typography, TextField, Button } from "@mui/material";
import { useAppDispatch } from "@/lib/store/hooks";
import { useState } from "react";
import { DebateSection } from "@/lib/store/debate-sections";
import { addSection, resetState } from "@/lib/store/debate-slice";

export default function SectionSetup() {
  const dispatch = useAppDispatch();
  const [name, setTitle] = useState("");

  const handleAddDebate = (sectionInfo: string) => {
    let sectionsToBeAdded: Array<
      Omit<DebateSection, "id" | "status" | "originalDuration">
    > = [
      {
        name: sectionInfo,
        team: "proposition",
        duration: 5 * 60,
      },
      {
        name: sectionInfo,
        team: "opposition",
        duration: 5 * 60,
      },
      {
        name: sectionInfo,
        team: "proposition",
        duration: 5 * 60,
      },
      {
        name: sectionInfo,
        team: "opposition",
        duration: 5 * 60,
      },
      {
        name: sectionInfo,
        team: "proposition",
        duration: 5 * 60,
      },
      {
        name: sectionInfo,
        team: "opposition",
        duration: 5 * 60,
      },
      {
        name: "خطاب الرد ",
        team: "opposition",
        duration: 3 * 60,
      },
      {
        name: "خطاب الرد ",
        team: "proposition",
        duration: 3 * 60,
      },
    ];

    dispatch(resetState());
    sectionsToBeAdded.forEach((s) => dispatch(addSection(s)));
  };
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" component="div">
        إضافة مناظرة بالإعدادات الافتراضية
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          id="name"
          label="عنوان  المناظرة  "
          value={name}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          size="large"
          variant="contained"
          onClick={() => handleAddDebate(name)}
        >
          إضافة مناظرة
        </Button>
      </Box>
    </Paper>
  );
}
