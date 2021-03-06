import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import HeroImage from './HeroImage.js'
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn,
    }
}
const TYPE = {STR: 0, AGI: 1 , INT: 2, };
const arrayPush = ( type, arr , hoverArr, data) => {
    arr[TYPE[type]].push(data);
    hoverArr[TYPE[type]].push(false);
}

class HeroesComponent extends React.Component {
    constructor() {
       super();
       this.state = {
          heroName: "Choose a Hero",
          int: [],str: [],agi: [],
          intIsHover: [],strIsHover: [],agiIsHover: [],
          typeArray: [[],[],[]],
          isHoverArray: [[],[],[]]
       }
    }
    async componentDidMount () {
        let data=[];
        let typeArray = this.state.typeArray;
        let isHoverArray=this.state.isHoverArray;

        await axios.get('http://localhost:3000/heroes').then( res => {
            data = res.data;
        });
        for (let i in data ) {
            arrayPush(data[i].cat,typeArray,isHoverArray,data[i]);
        }
        this.setState({
            typeArray: typeArray,
            isHoverArray: isHoverArray
        });
    }
    setName = (name) => {
        this.setState({
            heroName: name
        })
    }

  render() {
    return (
        <div style={styles.wrap}>
            {this.props.isLoggedIn ? (
                <div style={styles.wrap}>
                    <div className="container" style={styles.container}>
                        <div className="title" style={styles.heroName}>
                            {this.state.heroName}
                        </div>
                        <div className = "heroesDisplay" style={styles.heroesDisplay}>
                            {this.state.typeArray.map(( item, i)=> {
                                return(
                                    <div key={i} style={styles.heroColumns}>
                                        {item.map((hero,j)=>{
                                            return ( <Link key={j} to={/heroes/+hero.name}>
                                                        <div  style={{padding: '9px',position: 'relative'}}>
                                                            <HeroImage data={hero} name={this.setName}/>
                                                        </div>
                                                    </Link>)
                                        })}                                            
                                    </div>)
                            })}                        
                        </div>
                    </div>
                </div>
            ):(
                <div style={styles.title}>Membership Only</div>
            )}
        </div>
    );
  }
}

const styles= ({
  wrap: {
      display: 'flex',
      paddingTop: '20px',
      justifyContent: 'center',
  },
  container: {
      display: 'flex',
      width: '960px',
      borderStyle: 'solid',
      borderWidth: '5px',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
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
  heroName: {
      fontSize: '250%',
      color: '#444',
      fontFamily: 'times, Times New Roman, times-roman, georgia, serif',
      paddingTop: '10px',
  },
  heroesDisplay: {
      display: 'flex',
      paddingTop: '20px',
      justifyContent: 'center',
  },
  heroColumns: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '320px',
      height: '500px',
      borderStyle: 'solid',
      borderWidth: '5px',
      alignContent: 'flex-start',
  },
});

const Heroes = connect(mapStateToProps,null,null,{  pure: false })(HeroesComponent);
export default Heroes;
