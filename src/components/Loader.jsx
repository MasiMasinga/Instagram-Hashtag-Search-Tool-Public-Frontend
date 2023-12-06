import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Box';

const Loader = () => {
    return (
        <Stack alignItems="center">
            <CircularProgress sx={{ color: '#724cf9' }} />
        </Stack>
    );
}

export default Loader;