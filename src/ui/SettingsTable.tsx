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
} from "@mui/material";
import { teamsMapping, statusMapping } from "@/lib/ar-mapping";
import { formatTime } from "@/lib/utils";

const headLabelList = ["العنوان", "الفريق", "المدة", "الحالة", "العمليات"];

export default function SettingsTable() {
  const dispatch = useAppDispatch();
  const debate_state = useAppSelector((state) => state.debate);
  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headLabelList.map((h) => (
                <TableCell>
                  <Typography fontWeight={500}>{h}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {debate_state.sections.map((section) => (
              <TableRow key={section.id}>
                <TableCell>
                  <Typography>{section.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {teamsMapping.find((x) => x.value === section.team)?.label}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{formatTime(section.duration)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{statusMapping[section.status]}</Typography>
                </TableCell>
                <TableCell>TODO</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
