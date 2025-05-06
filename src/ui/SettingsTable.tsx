import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { teamsMapping, statusMapping } from "@/lib/ar-mapping";
import { formatTime } from "@/lib/utils";
import {
  ArrowUpward,
  ArrowDownward,
  Delete,
  Edit,
  Check,
} from "@mui/icons-material";
import { useState } from "react";
import {
  updateSection,
  deleteSection,
  reorderSections,
} from "@/lib/store/debate-slice";
import { Team } from "@/lib/store/debate-sections";

const headLabelList = ["العنوان", "الفريق", "المدة", "الحالة", "العمليات"];

export default function SettingsTable() {
  const dispatch = useAppDispatch();
  const debate_state = useAppSelector((state) => state.debate);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editTeam, setEditTeam] = useState<Team>("proposition");
  const [editDuration, setEditDuration] = useState(0);

  const handleMoveUp = (index: number) => {
    if (index === 0) return; // Already at the top
    
    const newSections = [...debate_state.sections];
    const sectionIds = newSections.map(section => section.id);
    
    // Swap the current section with the one above it
    [sectionIds[index], sectionIds[index - 1]] = [sectionIds[index - 1], sectionIds[index]];
    
    dispatch(reorderSections(sectionIds));
  };

  const handleMoveDown = (index: number) => {
    if (index === debate_state.sections.length - 1) return; // Already at the bottom
    
    const newSections = [...debate_state.sections];
    const sectionIds = newSections.map(section => section.id);
    
    // Swap the current section with the one below it
    [sectionIds[index], sectionIds[index + 1]] = [sectionIds[index + 1], sectionIds[index]];
    
    dispatch(reorderSections(sectionIds));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSection(id));
  };

  const handleEditStart = (section: any) => {
    setEditingSectionId(section.id);
    setEditName(section.name);
    setEditTeam(section.team);
    setEditDuration(Math.floor(section.duration / 60)); // Convert seconds to minutes for editing
  };

  const handleEditConfirm = () => {
    if (editingSectionId) {
      dispatch(
        updateSection({
          id: editingSectionId,
          updates: {
            name: editName,
            team: editTeam,
            duration: editDuration * 60, // Convert minutes to seconds
          },
        })
      );
      setEditingSectionId(null);
    }
  };

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headLabelList.map((h, index) => (
                <TableCell key={index}>
                  <Typography fontWeight={500}>{h}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {debate_state.sections.map((section, index) => (
              <TableRow key={section.id}>
                <TableCell>
                  {editingSectionId === section.id ? (
                    <TextField
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Typography>{section.name}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {editingSectionId === section.id ? (
                    <TextField
                      value={editTeam}
                      onChange={(e) => setEditTeam(e.target.value as Team)}
                      select
                      size="small"
                      fullWidth
                    >
                      {teamsMapping.map((team) => (
                        <MenuItem key={team.value} value={team.value}>
                          {team.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <Typography>
                      {teamsMapping.find((x) => x.value === section.team)?.label}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {editingSectionId === section.id ? (
                    <TextField
                      value={editDuration}
                      onChange={(e) => setEditDuration(Number(e.target.value))}
                      type="number"
                      size="small"
                      fullWidth
                      inputProps={{ min: 0 }}
                    />
                  ) : (
                    <Typography>{formatTime(section.duration)}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography>{statusMapping[section.status]}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex" }}>
                    <IconButton
                      size="small"
                      onClick={() => handleMoveUp(index)}
                      aria-label="move up"
                    >
                      <ArrowUpward fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleMoveDown(index)}
                      aria-label="move down"
                    >
                      <ArrowDownward fontSize="small" />
                    </IconButton>
                    {editingSectionId === section.id ? (
                      <IconButton
                        size="small"
                        onClick={handleEditConfirm}
                        aria-label="confirm edit"
                      >
                        <Check fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        onClick={() => handleEditStart(section)}
                        aria-label="edit"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(section.id)}
                      aria-label="delete"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
