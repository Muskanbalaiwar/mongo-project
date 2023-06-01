const mongodb=require('mongodb');

const Mongoclient=mongodb.MongoClient;

let _db;

const mongoConnect = (callback)=>{
Mongoclient.connect('mongodb+srv://MuskanGupta:EyQ9RKz99FTwUO4X@cluster0.xuil7ce.mongodb.net/shop?retryWrites=true&w=majority')
.then((res)=>{
    //console.log(res)
    console.log('connected>>>>>>>>>>>>>>>>>>>>>');
    _db=res.db();
    callback();
}).catch((err)=>{
    console.log(err)
})}


const getDb = () => {
    if (_db) {
      return _db;
    }
    throw 'No database found!';
  };
  
  exports.mongoConnect = mongoConnect;
  exports.getDb = getDb;