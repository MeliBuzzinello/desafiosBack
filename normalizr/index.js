const normalizr = require('normalizr');
const normalize = normalizr.normalize;

const schema = normalizr.schema;

const blogpost = {
  id: "1",
  title: "My awesome blog post",
  description: "My awesome blog post description",
  content: "Hello world",
  author: { id: "1", name: "Pablo" },
  comments: [
    { id: "1", author: "Bob", content: "Nice post" },
    { id: "2", author: "James", content: "Nice post too" },
  ],
};

const authorSchema = new schema.Entity('authors');

const commentSchema = new schema.Entity('comments');

const postSchema = new schema.Entity('posts',{
    author: authorSchema,
    comments: [commentSchema]
});

const util = require('util');

function print(objeto){
    console.log(util.inspect(objeto, false, 12, true))
};

const normalizrData = normalize(blogpost, postSchema);
print(normalizrData)