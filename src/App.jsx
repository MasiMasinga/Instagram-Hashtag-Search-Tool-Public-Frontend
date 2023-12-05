import React, { useState, useEffect } from "react";

// Mui
import Typography from '@mui/material/Typography';
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


function App() {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [postFormState, setPostFormState] = useState({
        user: "",
        content: "",
        hashtags: []
    });

    useEffect(() => {
        handleGetPosts();
    }, []);

    const handleGetPosts = async () => {
        setLoading(true);
        const response = await SearchService.getPosts();
        if (response && response.status) {
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

    const handleCreatePost = async (post) => {
        setLoading(true);
        const response = await SearchService.createPost(post);
        if (response && response.status) {
            setPosts(response.data);
        } else {
            setPosts([]);

        }
        setLoading(false);
        setPostFormState({
            user: "",
            content: "",
            hashtags: []
        });
        setOpenModal(false);
        handleGetPosts();
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setPostFormState({
          user: "",
          content: "",
          hashtags: []
        });
      };

    return (
        <>
            <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
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
                <Button variant="contained" onClick={() => setOpenModal(true)}>
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
                <DialogTitle>Subscribe</DialogTitle>
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
                    <Button onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleCreatePost(postFormState)}
                    >
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default App
