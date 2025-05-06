import {
  Paper,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Select,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Dispatch, SetStateAction, useState } from "react";
import { DebateSection, Team } from "@/lib/store/debate-sections";
import {
  addSection,
  resetAllSections,
  resetState,
} from "@/lib/store/debate-slice";
import teamsMapping from "@/lib/teamsMapping";

export default function DebateSectionAdder() {
  const dispatch = useAppDispatch();
  const debate_state = useAppSelector((state) => state.debate);
  const [name, setTitle] = useState("");
  const [team, setTeam] = useState<Team>("proposition");
  const [duration, setDuration] = useState(0);

  const handleAddSection = (
    sectionInfo: Omit<DebateSection, "id" | "status">
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
        />
        <TextField
          id="team"
          label="الفريق"
          sx={{ width: "10em" }}
          value={team}
          onChange={(e) => setTeam(e.target.value as Team)}
          select
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
