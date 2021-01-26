import React, {Component} from 'react';
import GetM from "./GetM";
import PostM from "./PostM";
import DeleteM from "./DeleteM";

class FirebaseText extends Component {

    state = {
        data: {
            id: '',
            file: 'jan pawel 2',
            itemName: '',
            width: 0,
            length: 0,
            realHeight: 0,
            price: 0,
            itemType: 'yes',
        },
    }

    render() {
        return (
            <div className="fireClass">
                <GetM/>
                <PostM/>
                <DeleteM/>
            </div>

        )
    }
}

export default FirebaseText;
