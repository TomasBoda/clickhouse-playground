import { createClient } from '@clickhouse/client'
import { CREATE_FOLLOWERS_TABLE, CREATE_USERS_TABLE, CREATE_POSTS_TABLE, CREATE_LIKES_TABLE, CREATE_COMMENTS_TABLE } from './src/model.js';
import { USERS_AND_THEIR_POSTS, POSTS_AND_LIKES, TOP_10_USERS_BASED_ON_LIKES, FOLLOWERS, FOLLOWING } from './src/queries.js';
import { generateRandomComments, generateRandomFollowers, generateRandomLikes, generateRandomPosts, generateRandomUsers } from './src/generator.js';
import { query, exec, insert } from './src/lib.js';

export const client = createClient({
  host: 'http://localhost:8123',
  username: 'default',
  password: ''
});

export const NUM_USERS = 25000;
export const NUM_POSTS = 50000;
export const NUM_LIKES = 2000000;
export const NUM_COMMENTS = 1800000;
export const NUM_FOLLOWERS = 150000;

async function initialize() {
  // create tables (if they do not exist already)
  await exec(CREATE_USERS_TABLE);
  await exec(CREATE_POSTS_TABLE);
  await exec(CREATE_LIKES_TABLE);
  await exec(CREATE_COMMENTS_TABLE);
  await exec(CREATE_FOLLOWERS_TABLE);
  // clear all tables
  await exec('DELETE FROM users WHERE true');
  await exec('DELETE FROM posts WHERE true');
  await exec('DELETE FROM likes WHERE true');
  await exec('DELETE FROM comments WHERE true');
  await exec('DELETE FROM followers WHERE true');
  // fill users table
  await insert('users', generateRandomUsers(NUM_USERS));
  const getUserIds = await query('SELECT id FROM users');
  const userIds = getUserIds.result.map(obj => obj.id);
  // fill posts table
  await insert('posts', generateRandomPosts(userIds, NUM_POSTS));
  const getPostIds = await query('SELECT id FROM posts');
  const postIds = getPostIds.result.map(obj => obj.id);
  // fill likes table
  await insert('likes', generateRandomLikes(userIds, postIds, NUM_LIKES));
  // fill comments table
  await insert('comments', generateRandomComments(userIds, postIds, NUM_COMMENTS));
  // fill followers table
  await insert('followers', generateRandomFollowers(userIds, NUM_FOLLOWERS));
}

async function run() {
  await initialize();

  await USERS_AND_THEIR_POSTS();
  await POSTS_AND_LIKES();
  await TOP_10_USERS_BASED_ON_LIKES();
  await FOLLOWERS();
  await FOLLOWING();

  await client.close();
}

run();