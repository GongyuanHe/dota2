import React from 'react';
import Divider from 'material-ui/Divider';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import firebase from '../Firebase.js';
import LazyLoad  from 'react-lazyload';

import Modal from './Modal.js';



export default class Info extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
          info: [],
       }
    }
    async componentDidMount () {
        let modal = [];
        let info = this.state.info;
        let zip = [];
        let parcel = [];
        await firebase.database().ref("/").once("value").then(snapshot => {
            Object.entries(snapshot.val()).forEach(
                ([key, value]) => {
                    zip.push(key);
                    parcel.push(value);
                }
            );
        });
        for ( var i=0; i<zip.length; i++) {
            modal=[];
            var j=0;
            for (var key in parcel[i]){
                var thisprop = parcel[i][key];
                var owner = thisprop.owner;
                try {
                    modal.push( <div key = {j} style={styles.modal}>
                                    <LazyLoad  height={200} offset={100}>
                                        <Modal location={key} zip={owner.addr.city} data={thisprop}></Modal>
                                    </LazyLoad>
                                </div>);
                }
                catch (e) {

                }
                j+=1
            }
            info.push(<Card key={i} style={styles.card}>
                          <CardHeader
                            title={zip[i]}
                            actAsExpander={true}
                            showExpandableButton={true}
                            titleStyle={styles.title}
                          />
                          <CardText expandable={true}>
                              <Divider />
                              <div style={styles.post}>
                                  {modal}
                              </div>
                          </CardText>
                      </Card>);
        }
        this.setState({
            info: info,
        });
    }

  render() {
    return (
      <div>
          {this.state.info}
      </div>
    );
  }
}

const styles= ({
    post: {
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    modal: {
        margin: '20px',
    },
    title: {
      fontSize: '250%',
      fontFamily: 'times, Times New Roman, times-roman, georgia, serif',
      color: '#444',
      margin: '0',
      padding: '0px 0px 6px 0px',
      lineHeight: '44px',
      letterSpacing: '-2px',
      fontWeight: 'bold',
    },
    card: {
      margin: '20px',
    }
});
