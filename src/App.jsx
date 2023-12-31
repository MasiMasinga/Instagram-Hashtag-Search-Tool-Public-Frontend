import { useState, useEffect } from "react";

// Mui
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// Services
import SearchService from "./services/posts.service";

// Components
import HashtagResultCard from './components/HashtagResultCard'
import Loader from "./components/Loader";

// Image
import TTAGZLogo from './assets/download.png';

function App() {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [postFormState, setPostFormState] = useState({
        user: "",
        content: "",
        hashtags: [],
        image: null
    });

    useEffect(() => {
        handleGetPosts();
    }, []);

    const handleGetPosts = async () => {
        setLoading(true);
        const response = await SearchService.getPosts();
        if (response) {
            setPosts(response.data);
        } else {
            setPosts([]);
        }
        setLoading(false);
    }

    const handleSearch = async (e) => {
        setLoading(true);
        setSearch(e.target.value);

        const queryString = e.target.value.replace('#', '');

        if (queryString.length > 0) {
            const response = await SearchService.searchHashtag(queryString);

            if (response && response.status) {
                setPosts(response.data);
            } else {
                setPosts([]);
            }
        } else {
            setPosts([]);
            handleGetPosts();
        }
        setLoading(false);
    }

    const handleCreatePost = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('user', postFormState.user);
        formData.append('content', postFormState.content);
        if (postFormState.hashtags) {
            postFormState.hashtags.forEach((hashtag, index) => {
                formData.append(`hashtags[${index}]`, hashtag);
            });
        }
        formData.append('image', postFormState.image);

        const response = await SearchService.createPost(formData);
        if (response) {
            setPosts(response.data);
        } else {
            setPosts([]);
        }

        setLoading(false);
        setPostFormState({
            user: "",
            content: "",
            hashtags: [],
            image: null
        });

        setOpenModal(false);
        handleGetPosts();
    };

    const handleFileChange = (event) => {
        console.log('here');
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
            setPostFormState({ ...postFormState, image: fileReader.result });
        });
        fileReader.readAsDataURL(file);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setPostFormState({
            user: "",
            content: "",
            hashtags: []
        });
    };

    return (
        <div style={{ backgroundColor: '#fffdfb' }}>

            <CardMedia
                component="img"
                image={TTAGZLogo}
                alt="Hashtag Search App"
                sx={{
                    objectFit: 'contain',
                    height: '100px',
                }}
            />
            <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#2f1a44', mt: 1 }}>
                Hashtag Search App
            </Typography>

            <Stack sx={{ p: 3 }}>
                <TextField
                    id="search"
                    label="Search"
                    variant="outlined"
                    value={search}
                    fullWidth
                    onChange={handleSearch}
                />
            </Stack>

            <Stack alignItems="center" sx={{ px: 3 }}>
                <Button
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                    sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        textTransform: 'none',
                        backgroundColor: '#724cf9',
                        "&:hover": {
                            backgroundColor: '#724cf9',
                        },
                    }}
                >
                    Create Post
                </Button>
            </Stack>

            <Stack sx={{ p: 3 }}>
                {
                    loading ?
                        <Stack alignItems="center" sx={{ p: 3 }}>
                            <Loader />
                        </Stack>
                        :
                        posts.length > 0 ?
                            <Stack sx={{ p: 3 }}>
                                <Grid container spacing={2}>
                                    {
                                        posts.map((post, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <HashtagResultCard post={post} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Stack>
                            :
                            <Stack alignItems="center" sx={{ p: 3 }}>
                                <Typography variant="body1" align="center" gutterBottom>
                                    No results found
                                </Typography>
                            </Stack>
                }
            </Stack>

            <Dialog open={openModal} fullWidth={true} onClose={handleCloseModal}>
                <DialogTitle>
                    Create Post
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField
                            id="name"
                            label="User"
                            fullWidth
                            variant="standard"
                            value={postFormState.user}
                            onChange={(e) =>
                                setPostFormState({ ...postFormState, user: e.target.value })
                            }
                        />
                        <TextField
                            id="name"
                            label="Content"
                            fullWidth
                            variant="standard"
                            value={postFormState.content}
                            onChange={(e) =>
                                setPostFormState({ ...postFormState, content: e.target.value })
                            }
                        />
                        <TextField
                            id="upload-button"
                            type="file"
                            accept="image/jpeg,image/png"
                            fullWidth
                            variant="standard"
                            onChange={handleFileChange}
                        />
                        <TextField
                            id="name"
                            label="Hashtag"
                            fullWidth
                            variant="standard"
                            value={postFormState.hashtags.join(' ')}
                            onChange={(e) =>
                                setPostFormState({ ...postFormState, hashtags: e.target.value.split(' ') })
                            }
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseModal}
                        sx={{
                            fontWeight: 600,
                            textTransform: 'none',
                            color: '#724cf9',
                            "&:hover": {
                                color: '#724cf9',
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleCreatePost(postFormState)}
                        sx={{
                            fontWeight: 600,
                            textTransform: 'none',
                            backgroundColor: '#724cf9',
                            "&:hover": {
                                backgroundColor: '#724cf9',
                            },
                        }}
                    >
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default App
