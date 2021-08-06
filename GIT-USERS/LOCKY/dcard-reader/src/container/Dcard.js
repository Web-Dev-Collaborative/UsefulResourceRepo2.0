import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import classes from './Dcard.module.css';

const Dcard = (props) => {
  const { isLoading, error, hasMore, data, sendRequest } = useAxios();
  const [before, setBefore] = useState(null);
  const [posts, setPosts] = useState([]);
  let observer = undefined;

  useEffect(() => {
    const limit = 30;
    if (before) {
      sendRequest(`posts?popular=true&limit=${limit}&before=${before}`);
    } else {
      sendRequest(`posts?popular=true&limit=${limit}`);
    }
  }, [before, sendRequest]);

  useEffect(() => {
    if (data) {
      setPosts((prevPost) => {
        return [...prevPost, ...data];
      });
    }
  }, [data]);

  const lastPostElement = (node) => {
    if (isLoading) {
      return;
    }

    if (observer) {
      // stops watching all of its target elements for visibility changes ...
      observer.disconnect();
    }

    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setBefore(node.dataset.id);
      }
    });

    if (node !== null) {
      // tell the observer to watch the node ...
      observer.observe(node);
    }
  };

  return (
    <div className={classes.PostContainer}>
      <ul>
        {posts.map((post, idx) => {
          if (posts.length === idx + 1) {
            return (
              <li key={idx} ref={lastPostElement} data-id={post.id}>
                <div className={classes.Forum}>
                  {post.forumName}・{post.school ? post.school : '匿名'}
                </div>
                <div className={classes.Title}>{post.title}</div>
                <div className={classes.Excerpt}>{post.excerpt}</div>
              </li>
            );
          } else {
            return (
              <li key={idx}>
                <div className={classes.Forum}>
                  {post.forumName}・{post.school ? post.school : '匿名'}
                </div>
                <div className={classes.Title}>{post.title}</div>
                <div className={classes.Excerpt}>{post.excerpt}</div>
              </li>
            );
          }
        })}
      </ul>
      {isLoading ? (
        <span style={{ color: 'rgb(0, 50, 78)' }}>Loading ...</span>
      ) : null}
      {error ? <span style={{ color: 'red' }}>Loading failed ...</span> : null}
    </div>
  );
};

export default Dcard;
