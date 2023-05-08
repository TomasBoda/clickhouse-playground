
export function generateRandomUsers(count) {
    function generateRandomUser() {
        const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Emily', 'Frank', 'Grace', 'Henry', 'Isabella', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Sam', 'Tom', 'Victoria', 'William', 'Xander', 'Yara', 'Zoe'];
        const lastNames = ['Anderson', 'Brown', 'Chen', 'Davis', 'Edwards', 'Fisher', 'Gonzalez', 'Hernandez', 'Ibrahim', 'Johnson', 'Kumar', 'Lee', 'Miller', 'Nguyen', 'Olsen', 'Patel', 'Quinn', 'Rodriguez', 'Smith', 'Thomas', 'Usman', 'Vargas', 'Wang', 'Xu', 'Yang', 'Zhang'];
        const streets = ['Main St', 'Oak St', 'Park Ave', 'Elm St', 'Maple Dr', 'Pine St', 'Cedar Ln', 'Highland Ave', 'Maple St', 'Washington St'];
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
        const countries = ['USA', 'Canada', 'Mexico', 'UK', 'Germany', 'France', 'Spain', 'Italy', 'China', 'Japan'];
      
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
        const date_of_birth = new Date(Math.floor(Math.random() * (new Date().getTime() - new Date(1950, 0, 1).getTime())) + new Date(1950, 0, 1).getTime()).toISOString().slice(0, 10);
        const street = `${Math.floor(Math.random() * 1000) + 1} ${streets[Math.floor(Math.random() * streets.length)]}`;
        const zip = Math.floor(Math.random() * 90000) + 10000;
        const city = cities[Math.floor(Math.random() * cities.length)];
        const country = countries[Math.floor(Math.random() * countries.length)];
      
        return { name: `${firstName} ${lastName}`, email, date_of_birth, address: { street, zip, city, country } };
    }

    let users = [];

    for (let i = 0; i < count; i++) {
        users.push(generateRandomUser());
    }

    return users;
}

export function generateRandomPosts(userIds, count) {
    function generateRandomText() {
        const texts = [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ];

        return texts[Math.floor(Math.random() * texts.length)];
    }

    function generateRandomImages() {
        const images = [
          'https://picsum.photos/200',
          'https://picsum.photos/300',
          'https://picsum.photos/400',
        ];

        const randomCount = Math.floor(Math.random() * images.length);
        return images.slice(0, randomCount);
    }

    const posts = [];

    for (let i = 0; i < count; i++) {
        const content = {
            text: generateRandomText(),
            images: generateRandomImages(),
        };

        const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];

        const post = {
            content,
            user_id: randomUserId,
        };

        posts.push(post);
    }

    return posts;
}

export function generateRandomLikes(userIds, postIds, count) {
    const likes = [];

    for (let i = 0; i < count; i++) {
        const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
        const randomPostId = postIds[Math.floor(Math.random() * postIds.length)];

        const like = {
            user_id: randomUserId,
            post_id: randomPostId
        };

        likes.push(like);
    }

    return likes;
}

export function generateRandomComments(userIds, postIds, count) {
    function generateRandomText() {
        const texts = [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        ];

        return texts[Math.floor(Math.random() * texts.length)];
    }

    const comments = [];

    for (let i = 0; i < count; i++) {
        const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
        const randomPostId = postIds[Math.floor(Math.random() * postIds.length)];

        const comment = {
            text: generateRandomText(),
            user_id: randomUserId,
            post_id: randomPostId
        };

        comments.push(comment);
    }

    return comments;
}

export function generateRandomFollowers(userIds, count) {
    const follows = [];

    for (let i = 0; i < count; i++) {
        const randomUserId1 = userIds[Math.floor(Math.random() * userIds.length)];
        const randomUserId2 = userIds[Math.floor(Math.random() * userIds.length)];

        const follow = {
            follower_id: randomUserId1,
            followed_id: randomUserId2
        };

        follows.push(follow);
    }

    return follows;
}