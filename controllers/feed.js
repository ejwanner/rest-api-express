exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{
      _id: '1',
      title: 'Hallo there',
      content: 'My first Post!!',
      imageUrl: '/images/auto.jpg',
      creator: {
        name: "Elias"
      },
      createdAt: new Date()
    }]
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  // Create post in db
  res.status(201).json({
    message: 'Very Successfully!',
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: 'Elias'
      },
      createdAt: new Date()
    }
  })
}