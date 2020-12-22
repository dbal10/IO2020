import fire from '../firebase';

class ItemManager {

    saveItem(obj) {
        let id = obj.id.toString().valueOf();
        fire.database().ref('database/items').child(id).set(obj).then(() => console.log("Save successful"));
    }

    getItemById(id){
        let val;
        fire.database().ref(`database/items`).child(id)
        .once("value", snapshot => {
            val = snapshot.val()
            console.log(val)
            return val
        })
    }

    deleteItem(id){
        fire.database().ref('database/items').child(id).remove().then(() => console.log("Delete Successful"));
    }

    getAllItems(){
        let arr = []
        fire.database().ref("database/items")
        .on("value", snapshot => {
            snapshot.forEach(snap => {
                arr.push(snap.val())
            })
            console.log(arr)
            return arr
        })
    
    }
}

export default ItemManager