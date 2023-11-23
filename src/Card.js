import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Sloth from '../src/Logo/Sloth.png';

export default function ProductCard({ title, description, chef, price, image, handleBuy }) {

    return (
        <Card raised
            sx={{
                bgcolor: 'background.paper',
                width: '75%'
            }}
        >
            <CardMedia
                sx={{ height: 300 }}
                image={image}
                title={title}
            />
            <CardContent>
                <Box sx={{ height: 70 }}>
                    <Typography align='center' gutterBottom variant="h5" component="div" sx={{ width: "fit-content", mx: "auto" }}>
                        {title}
                    </Typography>
                </Box>
                <Typography variant="body2" gutterBottom color="text.secondary" sx={{ height: 80 }}>
                    {description}
                </Typography>
                <Typography variant="body1" color="info.main" align='center'>
                    By: {chef}
                </Typography>
            </CardContent>
            <CardActions
                sx={{ justifyContent: "center" }}>
                <Button variant="contained" size="small" sx={{ mb: 1 }} onClick={async () => { await handleBuy(title, price) }}> 
                <img src={Sloth} width={40} height={33}  alt="Sloth coin"></img> {price}</Button>
            </CardActions>
        </Card>
    );
}