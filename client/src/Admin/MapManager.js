import fire from '../firebase';

class MapManager {

    saveMap(obj) {
        let id = obj.id.toString().valueOf();
        fire.database().ref('database/maps').child(id).set(obj);
    }

    saveMapTemplate(obj) {
         let id = obj.id.toString().valueOf();
         fire.database().ref('database/maptemplates').child(id).set(obj);
    }

    getMapById(id){
        let val;
        fire.database().ref(`database/maps`).child(id)
        .on("value", snapshot => { 
            val = snapshot.val()
        })
        return val
    }

    getMapTemplateById(id){
        let val;
        fire.database().ref(`database/maptemplates`).child(id)
        .on("value", snapshot => {
            val = snapshot.val()
        })
        return val
    }

    deleteMap(id){
        fire.database().ref(`database/maps/${id}`).remove();
    }

    deleteMapTemplate(id){
        fire.database().ref(`database/maptemplates/${id}`).remove();
    }

    getAllMaps(){
        let arr = []
        fire.database().ref("database/maps")
        .on("value", snapshot => {
            snapshot.forEach(snap => {
                arr.push(snap.val())
            })
        })
        console.log(arr)
        return arr
    }

    getAllMapTemplates(){
        let arr = []
        fire.database().ref("database/maptemplates")
        .on("value", snapshot => {
            snapshot.forEach(snap => {
                arr.push(snap.val())
            })
        })
        console.log(arr)
        return arr
    }
}

export default MapManager