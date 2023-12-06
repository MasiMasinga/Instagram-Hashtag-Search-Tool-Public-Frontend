
// Mui
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const HashtagPostCard = ({
    post: {
        user,
        content,
        hashtags,
    }
}) => {
    return (
        <Card sx={{ boxShadow: '0 3px 5px 2px #EFE9FB' }}>
            <CardContent>
                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#2f1a44' }}>
                    {user}
                </Typography>
                <Typography variant="body1" align="center" gutterBottom sx={{color: '#2f1a44'}}>
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