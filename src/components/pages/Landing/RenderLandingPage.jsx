import React, { useState } from 'react';
// ADD IMPORTS BACK FOR GRAPHS SECTION
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import HrfPhoto from '../../../styles/Images/paper-stack.jpg';
import '../../../styles/RenderLandingPage.less';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// for the purposes of testing PageNav
// import PageNav from '../../common/PageNav';

function RenderLandingPage(props) {
  const [download, setDownload] = useState('');

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  function handleClick() {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://humanrightsfirst.org/wp-content/uploads/2022/10/COW2021001887-I589Data.csv'
      )
      .then(res => {
        setDownload(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    const csvData = download;
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'filename.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  const history = useHistory();

  return (
    <div className="main">
      <div className="header">
        <div className="header-text-container">
          <h1>Asylum Office Grant Rate Tracker</h1>
          <h3>
            The Asylum Office Grant Rate Tracker provides asylum seekers,
            researchers, policymakers, and the public an interactive tool to
            explore USCIS data on Asylum Office decisions
          </h3>
        </div>
      </div>

      {/* Graphs Section: Add code here for the graphs section for your first ticket */}
      <div className="graphs-section">
        <div className="graph1">
          <img
            className="graphs"
            src={GrantRatesByOfficeImg}
            alt="Grant Rates By Office Graph"
          />
          <figcaption className="bolded">
            Search Grant Rates By Office
          </figcaption>
        </div>
        <div className="graph2">
          <img
            className="pie"
            src={GrantRatesByNationalityImg}
            alt="Grant Rates By Nationality Graph"
          />
          <figcaption className="bolded">
            Search Grant Rates By Nationality
          </figcaption>
        </div>
        <div className="graph3">
          <img
            className="graphs"
            src={GrantRatesOverTimeImg}
            alt="Grant Rates Over Time Graph"
          />
          <figcaption className="bolded">
            Search Grant Rates Over Time
          </figcaption>
        </div>
      </div>
      <div className="view-more-data-btn-container">
        <div>
          <a
            href={`data:text/csv;charset=utf-8,${escape(download)}`}
            download="filename.csv"
          >
            {' '}
            <Button
              className="buttonUnderGraphs"
              type="default"
              style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
              onClick={() => history.push('/graphs')}
            >
              View the Data
            </Button>
          </a>
        </div>
        <div>
          <button
            className="buttonUnderGraphs downloadData"
            type="default"
            style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
            onClick={handleClick}
          >
            Download The Data
          </button>
        </div>
      </div>
      <div className="middle-section">
        <div className="hrf-img-container">
          <img src={HrfPhoto} alt="Human Rights First" className="hrf-img" />
        </div>
        <div className="middle-section-text-container">
          <h3>
            Human Rights First has created a search tool to give you a
            user-friendly way to explore a data set of asylum decisions between
            FY 2016 and May 2021 by the USCIS Asylum Office, which we received
            through a Freedom of Information Act request. You can search for
            information on asylum grant rates by year, nationality, and asylum
            office, visualize the data with charts and heat maps, and download
            the data set
          </h3>
        </div>
      </div>
      <div>
        {/* Bottom Section: Add code here for the graphs section for your first ticket */}
        <div className="bottom-section">
          <div>Systemic Disparity Insites </div>
        </div>
        <div className="statistics">
          <div>
            <div className="percentage">36%</div>
            <div className="details">
              By the end of the Trump administration, the average <br />
              asylum office grant rate had fallen 36 percent from an <br />
              average of 44 percent in fiscal year 2016 to 28 percent <br /> in
              fiscal year 2020.
            </div>
          </div>
          <div>
            <div className="percentage">5%</div>
            <div className="details">
              The New York asylum office grant rate dropped to 5 <br /> percent
              in fiscal year 2020.
            </div>
          </div>
          <div>
            <div className="percentage">6x Lower</div>
            <div className="details">
              Between fiscal year 2017 and 2020, the New York <br />
              asylum office’s average grant rate was six times lower <br />
              than the San Francisco asylum office.
            </div>
          </div>
        </div>
        <div>
          <a
            href="https://humanrightsfirst.org/library/uscis-records-reveal-systemic-disparities-in-asylum-decisions/"
            rel="noreferrer"
            target="_blank"
          >
            {' '}
            <button
              className="buttonUnderGraphs readmore"
              type="default"
              style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
            >
              Read More
            </button>
          </a>
        </div>
        <p onClick={() => scrollToTop()} className="back-to-top">
          Back To Top ^
        </p>
      </div>
    </div>
  );
}
export default RenderLandingPage;
