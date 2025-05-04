import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export default function SettingsTable() {
  const dispatch = useAppDispatch();
  const debate_state = useAppSelector((state) => state.debate);
  return <div>{JSON.stringify(debate_state)}</div>;
}
