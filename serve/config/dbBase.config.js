const db=require('./db.config');
const mysql=require('mysql');
class dataBase{
    constructor(){
        this.mydb=mysql.createConnection(db);
        this.mydb.connect(); 
    }
   
}
module.exports=dataBase;