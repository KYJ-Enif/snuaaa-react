import React from 'react';
import AboutAAA from './contents/aboutAAA';
import Contact from './contents/contact';
import Equipment from './contents/equipment';
import Observation from './contents/observation';
import History from './contents/history';
import Officers from './contents/officers';

class About extends React.Component {

    state = {
        aboutIndex: 0
    }

    setIndex = (index) => {
        this.setState({
            aboutIndex: index
        })
    }

    //TODO : If aboutIndex doesn't change, component shouldn't update;
    
    render() {
        return (
            <div>
                <h2>동아리 소개</h2>
                <div className="intro-div-wrapper" id="intro-top">
                    <p><a onClick={(e) => this.setIndex(0)} className="intro-title">AAA는?</a></p>
                    <p><a onClick={(e) => this.setIndex(1)} className="intro-title">찾아오는 길 &amp; 연락처</a></p>
                    <p><a onClick={(e) => this.setIndex(2)} className="intro-title">장비소개</a></p>
                    <p><a onClick={(e) => this.setIndex(3)} className="intro-title">김태영 기념관측소 소개</a></p>
                    <p><a onClick={(e) => this.setIndex(4)} className="intro-title">동아리발자취</a></p>
                    <p><a onClick={(e) => this.setIndex(5)} className="intro-title">역대 회장단 / 임원진</a></p>
                </div>
                
                {
                    (() => {
                        console.log(this.state.aboutIndex);
                        if (this.state.aboutIndex === 0) return (<AboutAAA/>);
                        else if (this.state.aboutIndex === 1) return (<Contact/>);
                        else if (this.state.aboutIndex === 2) return (<Equipment/>);
                        else if (this.state.aboutIndex === 3) return (<Observation/>);
                        else if (this.state.aboutIndex === 4) return (<History/>);
                        else if (this.state.aboutIndex === 5) return (<Officers/>);
                        else return (<AboutAAA/>);
                    })()
                }
            </div>
        );
    }
}

export default About