import { Card, CardContent, Container, Typography } from "@mui/material";


export default function LocationSet() {
  return (
    <Container sx={{display:'flex',gap:4}}>
        <Card>
            <CardContent>
                <Typography variant="h5">Today</Typography>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
                <Typography variant="h5">Tomorrow</Typography>
            </CardContent>
        </Card>
        
    </Container>
  )
}
