import React, {useState} from 'react';
import fire from "../../firebase";

export default function GetM() {
    const [tab, setTab] = useState([]);

    function getAllM() {
        fire.database().ref("database")
            .on("value", snapshot => {
                let arr = [];
                snapshot.forEach(snap => {
                    arr.push(snap.val());
                });
                setTab(arr);
            });
        console.log(tab);
    }

    return (
        <div id="getm">
            <button id="getm" onClick={getAllM}>GetM</button>
        </div>
    )
}
