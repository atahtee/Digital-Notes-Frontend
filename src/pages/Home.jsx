import {  useEffect } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import PostHead from "../components/PostHead";
import styles from '../styles/styles.module.scss';
import PostForm from "../components/PostForm";
const Home = () => {
    const {posts,dispatch} = usePostsContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:4000/api/posts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) dispatch({type: 'SET_POSTS',payload: json});
        }

        if (user) fetchPosts();
    }, [user, dispatch]);
    return (
        <>
            <div>
                <h1 className="diary-header">Diary</h1>
                <ul className={styles.postList}>
                    {posts && posts.map(post => (
                        <PostHead key={post._id} post={post} />
                    ))}
                </ul>
            </div>
            <div>
                <PostForm />
            </div>
        </>
    )
}

export default Home;