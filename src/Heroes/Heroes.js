import React from 'react';

import firebase from '../Firebase.js';



export default class Info extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
          heroName: "Choose a Hero",
          int: [],
          str: [],
          agi: [],
          intIsHover: [],
          strIsHover: [],
          agiIsHover: [],

       }
    }
    async componentDidMount () {
        let data = {};
        let int=[];
        let str=[];
        let agi=[];
        let intIsHover=[];
        let agiIsHover=[];
        let strIsHover=[];

        await firebase.database().ref("/heroes").once("value").then(snapshot => {
            data = snapshot.val();
        });
        Object.entries(data).forEach(
            ([key, value]) => {
                switch (value.cat) {
                    case "INT":
                        int.push(value);
                        intIsHover.push(false);
                        break;
                    case "STR":
                        str.push(value);
                        strIsHover.push(false);
                        break;
                    case "AGI":
                        agi.push(value);
                        agiIsHover.push(false);
                        break;
                    default:
                        break;
                }
            }
        );
        this.setState({
            int: int,
            str: str,
            agi: agi,
            intIsHover: intIsHover,
            agiIsHover: agiIsHover,
            strIsHover: strIsHover,
        });
    }

    handleHeroHover = (name,type,i) => {
        switch(type){
            case "str":
                let strIsHover=this.state.strIsHover;
                strIsHover[i]=true;
                this.setState({
                    heroName: name,
                    strIsHover: strIsHover,
                });
                break;
            case "agi":
                let agiIsHover=this.state.agiIsHover;
                agiIsHover[i]=true;
                this.setState({
                    heroName: name,
                    agiIsHover: agiIsHover,
                });
                break;
            case "int":
                let intIsHover=this.state.intIsHover;
                intIsHover[i]=true;
                this.setState({
                    heroName: name,
                    intIsHover: intIsHover,
                });
                break;
            default:
                break;
        }
    }
    handleHeroOut = (str,type,i) => {
        switch(type){
            case "str":
                let strIsHover=this.state.strIsHover;
                strIsHover[i]=false;
                this.setState({
                    heroName: str,
                    strIsHover: strIsHover,
                });
                break;
            case "agi":
                let agiIsHover=this.state.agiIsHover;
                agiIsHover[i]=false;
                this.setState({
                    heroName: str,
                    agiIsHover: agiIsHover,
                });
                break;
            case "int":
                let intIsHover=this.state.intIsHover;
                intIsHover[i]=false;
                this.setState({
                    heroName: str,
                    intIsHover: intIsHover,
                });
                break;
            default:
                break;
        }
    }

  render() {

    return (
        <div style={styles.wrap}>
            <div className="container" style={styles.container}>
                <div className="title" style={styles.heroName}>
                    {this.state.heroName}
                </div>
                <div className = "heroesDisplay" style={styles.heroesDisplay}>
                    <div style={styles.heroColumns}>
                        {this.state.str.map((item,i)=>{
                            return ( <div key={i} style={{padding: '9px',position: 'relative'}}>
                                        <img src={item.logo} alt = "logo"
                                         onMouseOver={ () => this.handleHeroHover(item.name,"str",i)}></img>
                                        {
                                           this.state.strIsHover[i] ? (
                                              <div style={styles.hover}>
                                                  <img src={item.hover} alt = 'hover'
                                                   onMouseOut={ () => this.handleHeroOut("Choose a Hero","str",i)}></img>
                                              </div>
                                           ):(
                                               <div style={styles.notHover}>
                                                   <img src={item.hover} alt = 'hover'
                                                    onMouseOut={ () => this.handleHeroOut("Choose a Hero","str",i)}></img>
                                               </div>
                                           )
                                        }
                                     </div>)
                        })}
                    </div>
                    <div style={styles.heroColumns}>
                        {this.state.agi.map((item,i)=>{
                            return ( <div key={i} style={{padding: '9px',position: 'relative'}}>
                                        <img src={item.logo} alt = "logo"
                                         onMouseOver={ () => this.handleHeroHover(item.name,"agi",i)}></img>
                                        {
                                           this.state.agiIsHover[i] ? (
                                              <div style={styles.hover}>
                                                  <img src={item.hover} alt = 'hover'
                                                   onMouseOut={ () => this.handleHeroOut("Choose a Hero","agi",i)}></img>
                                              </div>
                                           ):(
                                               <div style={styles.notHover}>
                                                   <img src={item.hover} alt = 'hover'
                                                    onMouseOut={ () => this.handleHeroOut("Choose a Hero","agi",i)}></img>
                                               </div>
                                           )
                                        }
                                     </div>)
                        })}
                    </div>
                    <div style={styles.heroColumns}>
                        {this.state.int.map((item,i)=>{
                            return ( <div key={i} style={{padding: '9px',position: 'relative'}}>
                                        <img src={item.logo} alt = "logo"
                                         onMouseOver={ () => this.handleHeroHover(item.name,"int",i)}></img>
                                        {
                                           this.state.intIsHover[i] ? (
                                              <div style={styles.hover}>
                                                  <img src={item.hover} alt = 'hover'
                                                   onMouseOut={ () => this.handleHeroOut("Choose a Hero","int",i)}></img>
                                              </div>
                                           ):(
                                               <div style={styles.notHover}>
                                                   <img src={item.hover} alt = 'hover'
                                                    onMouseOut={ () => this.handleHeroOut("Choose a Hero","int",i)}></img>
                                               </div>
                                           )
                                        }
                                     </div>)
                        })}
                    </div>
                </div>
            </div>
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
      alignContent: 'flex-start'
  },
  hover: {
      position: 'absolute',
      display: 'block',
      left: '0',
      marginLeft: '-24px',
      top: '0',
      marginTop: '-11px',
      zIndex: '1',

  },
  notHover: {
      position: 'absolute',
      display: 'none',
      left: '0',
      marginLeft: '-24px',
      top: '0',
      marginTop: '-11px',
  }
});
