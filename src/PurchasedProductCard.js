import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function PurchasedProductCard({ title, description, chef, image, instructions }) {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card raised
            sx={{
                bgcolor: 'background.paper',
                width: '50%'
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
                <Typography variant="body2" gutterBottom color="text.secondary" sx={{ height: 80, textAlign: 'center' }}>
                    {description}
                </Typography>
                <Typography variant="body1" color="info.main" align='center'>
                    By: {chef}
                </Typography>
            </CardContent>
            <CardActions
                sx={{ justifyContent: "center" }}>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <Typography>View instructions: </Typography>
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{instructions}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}