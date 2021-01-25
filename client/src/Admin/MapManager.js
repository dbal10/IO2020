import fire from '../firebase';

class MapManager {

    saveMap(obj) {
        let id = obj.id.toString().valueOf();
        fire.database().ref('database/maps').child(id).set(obj).then(() => console.log("Save successful"));
    }

    saveMapTemplate(obj) {
         let id = obj.id.toString().valueOf();
         fire.database().ref('database/maptemplates').child(id).set(obj).then(() => console.log("Save successful"));
    }

    getMapById(id){
        let val;
        fire.database().ref(`database/maps`).child(id)
        .once("value", snapshot => { 
            val = snapshot.val()
            console.log(val)
            return val
        })
        
    }

    getMapTemplateById(id){
        let val;
        fire.database().ref(`database/maptemplates`).child(id)
        .once("value", snapshot => {
            val = snapshot.val()
            console.log(val)
            return val
        })
        
    }

    deleteMap(id){
        fire.database().ref('database/maps').child(id).remove().then(() => console.log("Delete Successful"));
    }

    deleteMapTemplate(id){
        fire.database().ref('database/maptemplates').child(id).remove().then(() => console.log("Delete Successful"));
    }

    getAllMaps(){
        let arr = []
        fire.database().ref("database/maps")
        .on("value", snapshot => {
            snapshot.forEach(snap => {
                arr.push(snap.val())
            })
            console.log(arr)
            return arr
        })
        
    }

    getAllMapTemplates(){
        let arr = []
        fire.database().ref("database/maptemplates")
        .on("value", snapshot => {
            snapshot.forEach(snap => {
                arr.push(snap.val())
            })
            console.log(arr)
            return arr
        })
        
    }
}

export default MapManager