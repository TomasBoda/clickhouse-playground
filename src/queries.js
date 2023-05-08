import { query, writeToJSON } from "./lib.js";

export async function POSTS_AND_LIKES() {
    const data = await query(`
      SELECT
        post.id AS id,
        post.posted_at AS posted_at,
        post.content.text AS text,
        length(likes) AS like_count,
        groupArray(user) AS likes
      FROM
        posts AS post
      INNER JOIN
        (
          SELECT
            like.post_id AS post_id,
            user.name AS user
          FROM
            likes AS like
          RIGHT JOIN
            users AS user
          ON
            like.user_id = user.id
        ) AS post_like
      ON
        post.id = post_like.post_id
      GROUP BY
        post.id, post.content.text, post.posted_at;
    `)
  
    writeToJSON('results/posts_and_likes.json', data);
  }
  
  export async function TOP_10_USERS_BASED_ON_LIKES() {
    const data = await query(`
      SELECT
        user.name AS user_name,
        user.email AS user_email,
        COUNT() AS total_likes
      FROM users AS user
      INNER JOIN posts AS post ON post.user_id = user.id
      INNER JOIN likes AS like ON post.id = like.post_id
      GROUP BY user.id, user.name, user.email
      ORDER BY total_likes DESC
      LIMIT 10;
    `);
  
    writeToJSON('results/top_users_based_on_likes.json', data);
  }
  
  export async function USERS_AND_THEIR_POSTS() {
    const data = await query(`
      SELECT
        users.name AS user_name,
        count() AS total_posts,
        groupArray(tuple(posts.posted_at, posts.content)) AS user_posts
      FROM users
      INNER JOIN posts
      ON users.id = posts.user_id
      GROUP BY users.id, users.name;
    `);
  
    writeToJSON('results/users_and_their_posts.json', data);
  }
  
  export async function FOLLOWING() {
    const following = await query(`
      SELECT
        user.name AS user_name,
        groupArray(DISTINCT(followed.name)) AS following
      FROM
        users AS user
      LEFT JOIN
        followers AS follower ON user.id = follower.follower_id
      LEFT JOIN
        users AS followed ON follower.followed_id = followed.id
      GROUP BY
        user.id, user.name
      ORDER BY
        user.name;
    `);
  
    writeToJSON('results/following.json', following);
  }
  
  export async function FOLLOWERS() {
    const followers = await query(`
      SELECT
        user.name AS user_name,
        groupArray(DISTINCT(followed.name)) AS followers
      FROM
        users AS user
      LEFT JOIN
        followers AS follower ON user.id = follower.followed_id
      LEFT JOIN
        users AS followed ON follower.follower_id = followed.id
      GROUP BY
        user.id, user.name
      ORDER BY
        user.name;
    `);
  
    writeToJSON('results/followers.json', followers);
  }