
// Mui
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const HashtagPostCard = ({
    post: {
        user,
        content,
        hashtags,
        image,
    }
}) => {
    return (
        <Card sx={{ boxShadow: '0 3px 5px 2px #EFE9FB' }}>
            <CardContent>
                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#2f1a44' }}>
                    {user}
                </Typography>
                <CardMedia
                    component="img"
                    image={image}
                    alt="Hashtag Search App"
                    sx={{ objectFit: 'contain',  boxShadow: '0 3px 5px 2px #EFE9FB' }}
                />
                <Typography variant="body1" align="center" gutterBottom sx={{ color: '#2f1a44', mt: 2 }}>
                    {content}
                </Typography>
                <Typography variant="body1" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#724cf9' }}>
                    #{hashtags.join(' #')}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default HashtagPostCard;