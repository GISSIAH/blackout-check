import { Schedule } from "@/types";
import {
  Card,
  CardContent,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const HomeCard = () => {
  const { isLoading, error, data } = useQuery<Schedule[]>(
    ["scheduleData"],
    (): Schedule[] => {
      return [{ name: "Jeff", period: "Here", duration: "8" }];
    }
  );

  if (isLoading) return <>Loading</>;

  if (error) return <>An error has occurred</>;

  return (
    <div>
      <Card sx={{}}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 400 }}>
            Today
          </Typography>
          <Table>
            <TableHead>
              <TableCell>Group</TableCell>
              <TableCell>From</TableCell>
              <TableCell>Duration</TableCell>
            </TableHead>
            {data?.map((daysch, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{daysch.name}</TableCell>
                  <TableCell>{daysch.period}</TableCell>
                  <TableCell>{daysch.duration}</TableCell>
                </TableRow>
              );
            })}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeCard;
