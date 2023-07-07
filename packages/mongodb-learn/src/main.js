const { MongoClient } = require("mongodb");

const connectedInfo = {
  user: 'leon',
  password: 'Leon.pu199139!',
  host: '1.116.37.43',
  port: 9703,
};

const connectedString = `mongodb://${connectedInfo.user}:${connectedInfo.password}@${connectedInfo.host}:${connectedInfo.port}`;

const client = new MongoClient(connectedString);

async function startup() {
  try {
    const database = client.db('lowcode');
    const movies = database.collection('movies');

    const r = await movies.insertOne({
      title: '黄飞鸿',
      description: '之英雄有梦'
    });

    // console.log(`r:`, r);

    // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    // const movie = await movies.findOne(query);
    // console.log(movie);


    // const count = await movies.countDocuments();
    // console.log(`count:`, count);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

startup().catch(console.dir);