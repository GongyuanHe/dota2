import React from 'react';
import Radium from 'radium';

class HeroImageComponent extends React.Component {
    handleHover = (name) => {
        this.props.name(name);
    }

    render(){
        return (
            <div >
                <img src={this.props.data.logo} alt = "logo"></img>
                <img src={this.props.data.hover} alt = 'hover' style={styles.hover}
                    onMouseOver={ () => this.handleHover(this.props.data.name)}></img>       
            </div>
        )
    }
}

const styles = ({
    hover: {
        position: 'absolute',
        opacity: '0',
        left: '0',
        marginLeft: '-24px',
        top: '0',
        marginTop: '-11px',
        zIndex: '1',
        ':hover': {
            opacity: '1'
        }
    }
});

const HeroImage = Radium(HeroImageComponent);
export default HeroImage;
