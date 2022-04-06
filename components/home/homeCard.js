import { Card, CardContent, Table, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useQuery } from "react-query"
import { baseUrl } from '../../helpers/strings';
export default function HomeCard() {
    
    const { isLoading, error, data } = useQuery('scheduleData', () =>
        fetch(`${baseUrl}/schedule/day/?d=${new Date().getDay()}`).then(res =>
            res.json()
        )
    )
    //console.log(data);

    if (isLoading) return 'Loading'

    if (error) return 'An error has occurred: ' + error.message
    return (
        <div>
            <Card sx={{}}>
                <CardContent>
                    <Typography variant='h6' sx={{ fontWeight: 400 }}>Today</Typography>
                    <Table>
                        <TableHead>
                            <TableCell>Group</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>Duration</TableCell>
                        </TableHead>
                        {
                            data.map((daysch, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{daysch.name}</TableCell>
                                        <TableCell>{daysch.period}</TableCell>
                                        <TableCell>{daysch.duration}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
