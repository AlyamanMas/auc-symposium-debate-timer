import {
  Paper,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useState } from "react";
import { DebateSection, Team } from "@/lib/store/debate-sections";
import { addSection, resetState } from "@/lib/store/debate-slice";
import { teamsMapping } from "@/lib/ar-mapping";

export default function DebateSectionAdder() {
  const dispatch = useAppDispatch();
  const debate_state = useAppSelector((state) => state.debate);
  const [name, setTitle] = useState("");
  const [team, setTeam] = useState<Team>("proposition");
  const [duration, setDuration] = useState(0);

  const handleAddSection = (
    sectionInfo: Omit<DebateSection, "id" | "status" | "originalDuration">
  ) => {
    dispatch(addSection(sectionInfo));
  };
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5" component="div">
        إضافة مقطع جديد
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          id="name"
          label="عنوان المقطع"
          value={name}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          id="team"
          label="الفريق"
          value={team}
          onChange={(e) => setTeam(e.target.value as Team)}
          select
          sx={{ flexGrow: 2, minWidth: "7em" }}
        >
          {teamsMapping.map((team) => (
            <MenuItem key={team.value} value={team.value}>
              {team.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="duration"
          label="المدة (بالدقائق)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          sx={{ flexGrow: 1 }}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          size="large"
          variant="contained"
          onClick={() =>
            handleAddSection({
              name: name,
              team: team,
              duration: duration * 60, // we multiply by 60 since the actual section duration is in seconds but here we get it in minutes
            })
          }
        >
          إضافة مقطع
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={() => dispatch(resetState())}
        >
          إعادة ضبط أقسام المناقشة
        </Button>
      </Box>
    </Paper>
  );
}
