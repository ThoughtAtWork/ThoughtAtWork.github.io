import React, { Component } from 'react';
import SplashAnimation from './SplashAnimation';
import classnames from 'classnames';
import styles from '../../styles/components/home/homeSplash.module.scss';


export default class HomeSplash extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className={classnames()}>
        <div className={classnames('container flex flex-column gridish-container--complete gridish-padding--bottom')}>
          <h1 className="flex gridish-padding--bottom">thought at work</h1>
          <h2 className="flex gridish-grid__height--xsmall--10">october 19 - 21</h2>
        </div>
        <SplashAnimation />
      </div>
    );
  }
}