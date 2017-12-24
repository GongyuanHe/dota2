import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import home1 from '../assets/home_1.jpg';
import home2 from '../assets/home_2.jpg';
import home3 from '../assets/home_3.jpg';
import home4 from '../assets/home_4.jpg';
import home5 from '../assets/home_5.jpg';
import home6 from '../assets/home_6.jpg';
import home7 from '../assets/home_7.jpg';
import home8 from '../assets/home_8.jpg';
import home9 from '../assets/home_9.jpg';
import home10 from '../assets/home_10.jpg';
import home11 from '../assets/home_11.jpg';
import homeVideo from '../assets/home_video.mp4';

class Home extends Component {

    render () {
        return(
            <div>
                <div style={styles.container}>
                    <video autoPlay="autoplay" loop="true" preload="auto" style={styles.video}>
                        <source src={homeVideo} type="video/mp4" />
                    </video>
                </div>
                <div style={styles.slide}>
                    <Carousel showArrows={true} autoPlay={true} interval={3000} showStatus={false}
                    infiniteLoop={true} width={'1024px'} emulateTouch={true} >
                        <div><img src={home1} alt='img' style={styles.img}/></div>
                        <div><img src={home2} alt='img' style={styles.img}/></div>
                        <div><img src={home3} alt='img' style={styles.img}/></div>
                        <div><img src={home4} alt='img' style={styles.img}/></div>
                        <div><img src={home5} alt='img' style={styles.img}/></div>
                        <div><img src={home6} alt='img' style={styles.img}/></div>
                        <div><img src={home7} alt='img' style={styles.img}/></div>
                        <div><img src={home8} alt='img' style={styles.img}/></div>
                        <div><img src={home9} alt='img' style={styles.img}/></div>
                        <div><img src={home10} alt='img' style={styles.img}/></div>
                        <div><img src={home11} alt='img' style={styles.img}/></div>
                    </Carousel>
                </div>

            </div>
      )
    }
}
const styles = ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        display: 'inline'
    },
    slide: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10px', 
        paddingBottom: '20px'
    },
    img : {
        borderRadius: '10%'
    }
})

export default Home;
