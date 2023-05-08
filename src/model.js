
export const CREATE_USERS_TABLE = `
    CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT generateUUIDv4(),
        name String,
        email String,
        date_of_birth Date,
        address Tuple (
            street String,
            zip UInt64,
            city String,
            country String
        ),
        PRIMARY KEY (id)
    )
    ENGINE = MergeTree()
    ORDER BY id;
`;

export const CREATE_POSTS_TABLE = `
    CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT generateUUIDv4(),
        posted_at DateTime DEFAULT now(),
        content Tuple (
            text String,
            images Array(String)
        ),
        user_id UUID,
        PRIMARY KEY (id)
    )
    ENGINE = MergeTree
    ORDER BY id;
`;

export const CREATE_LIKES_TABLE = `
    CREATE TABLE IF NOT EXISTS likes (
        user_id UUID,
        post_id UUID,
        created_at DateTime DEFAULT now(),
        PRIMARY KEY (user_id, post_id)
    )
    ENGINE = MergeTree
    ORDER BY (user_id, post_id);
`;

export const CREATE_COMMENTS_TABLE = `
    CREATE TABLE IF NOT EXISTS comments (
        id UUID DEFAULT generateUUIDv4(),
        user_id UUID,
        post_id UUID,
        text String,
        posted_at DateTime DEFAULT now(),
        PRIMARY KEY (post_id, id)
    )
    ENGINE = MergeTree
    ORDER BY (post_id, id);
`;

export const CREATE_FOLLOWERS_TABLE = `
    CREATE TABLE IF NOT EXISTS followers (
        follower_id UUID,
        followed_id UUID,
        created_at DateTime DEFAULT now()
    ) ENGINE = MergeTree
    ORDER BY follower_id;
`;