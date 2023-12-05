import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Box';

const Loader = () => {
    return (
        <Stack alignItems="center">
            <CircularProgress />
        </Stack>
    );
}

export default Loader;