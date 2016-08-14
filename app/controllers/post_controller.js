import Post from '../models/post_model';

const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags };
  });
};

// Sydni Topper helped me with these functions
export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.author = req.user.username;
  console.log(`USER: ${req.user}`);
  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPosts = (req, res) => {
  Post.find()
  .then(result => {
    res.json(cleanPosts(result));
  })
  .catch(error => {
    res.json({ error });
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id)
  .then(result => {
    res.json(result);
  })
  .catch(error => {
    res.json({ error });
  });
};

export const deletePost = (req, res) => {
  Post.findById(req.params.id).remove()
  .then(result => {
    res.json({ message: 'Post deleted!' });
  })
  .catch(error => {
    res.json({ error });
  });
};

export const updatePost = (req, res) => {
  Post.findById(req.params.id)
  .then(result => {
    if (req.body.title) { result.title = req.body.title; }
    if (req.body.tags) { result.tags = req.body.tags; }
    if (req.body.content) { result.content = req.body.content; }
    result.save();
    res.json({ message: 'Post updated!' });
  })
  .catch(error => {
    res.json({ error });
  });
};
