import React, { Component } from 'react';
import Slider from 'react-slick';
import { Carousel } from 'react-responsive-carousel';
import style from 'react-responsive-carousel/lib/styles/carousel.min.css';

import home1 from '../assets/home_1.jpg';
import home2 from '../assets/home_2.jpg';
import home3 from '../assets/home_3.jpg';
import home4 from '../assets/home_4.jpg';
import home5 from '../assets/home_5.jpg';
import home6 from '../assets/home_6.jpg';
import homeVideo from '../assets/home_video.mp4';

// const settings = {
//     autoplay: true,
//     autoplaySpeed: 3000,
//     infinite: false,
//     pauseOnHover: false,
//     dots: false
// }
class Home extends Component {

    render () {
        return(
            <div>
                <div style={styles.container}>
                    <video autoPlay="autoplay" loop="true" preload="auto" style={styles.video}>
                        <source src={homeVideo} type="video/mp4" />
                    </video>
                </div>
                <div style={{paddingTop: '10px', paddingBottom: '20px'}}>
                    {/* <Slider {...settings}>
                        <div style={styles.slide}><img style={styles.img} src={home1} alt="1"></img></div>
                        <div style={styles.slide}><img style={styles.img} src={home2} alt="2"></img></div>
                        <div style={styles.slide}><img style={styles.img} src={home3} alt="3"></img></div>
                        <div style={styles.slide}><img style={styles.img} src={home4} alt="4"></img></div>
                        <div style={styles.slide}><img style={styles.img} src={home5} alt="5"></img></div>
                        <div style={styles.slide}><img style={styles.img} src={home6} alt="6"></img></div>
                    </Slider> */}
                    <Carousel showArrows={true} >
                        <div>
                            <img src={home1} />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img src={home2} />
                            <p className="legend">Legend 2</p>
                        </div>
                        <div>
                            <img src={home3} />
                            <p className="legend">Legend 3</p>
                        </div>
                        <div>
                            <img src={home4} />
                            <p className="legend">Legend 4</p>
                        </div>
                        <div>
                            <img src={home5} />
                            <p className="legend">Legend 5</p>
                        </div>
                        <div>
                            <img src={home6} />
                            <p className="legend">Legend 6</p>
                        </div>
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
        minHeight: '0',
        minWidth: '0',
    },
    img : {
        borderRadius: '10%'
    }
})

export default Home;
