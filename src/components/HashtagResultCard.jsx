import React from 'react';

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
        <Card>
            <CardContent>
                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {user}
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    {content}
                </Typography>
                <Typography variant="body1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                    #{hashtags.join(' #')}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default HashtagPostCard;