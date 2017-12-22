import React from 'react';

class HeroImage extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            hover: false,
        });
    }
    handleHover = (str,isHover) => {
        this.setState({
            hover: isHover
        });
    }

    render(){
        return (
            <div>
                <img src={this.props.data.logo} alt = "logo"
                    onMouseEnter={ () => this.handleHover(this.props.data.name,true)}></img>
                {this.state.hover ? (
                    <div style={styles.hover}>
                        <img src={this.props.data.hover} alt = 'hover'
                            onMouseOut={ () => this.handleHover("Choose a Hero",false)}></img>
                    </div>
                ):(
                    <div style={styles.notHover}>
                        <img src={this.props.data.hover} alt = 'hover'
                            onMouseOut={ () => this.handleHover("Choose a Hero",false)}></img>
                    </div>
                )} 
            </div>
        )
    }
}

const styles = ({
    hover: {
        position: 'absolute',
        display: '',
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

export default HeroImage;
