import React, { useEffect, useState } from 'react';
  import api from '../utils/api';
  import Navbar from '../Components/Navbar';
  import PostItem from '../Components/PostItem';

  const PastPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      api.get('/posts/?type=old')
        .then(res => setPosts(res.data))
        .catch(err => console.error('Error fetching posts:', err));
    }, []);

    return (
        <div>
          <Navbar />
          <div style={{ padding: '1rem' }}>
            {posts.length > 0 ? (
              posts.map((post, idx) => (
                <PostItem key={post._id} post={post} index={idx + 1} />
              ))
            ) : (
              <div>There is no old post</div>
            )}
          </div>
        </div>
      );
      
  };

  export default PastPage;