import {Component} from 'react'
import {FiSearch} from 'react-icons/fi'
import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  progress: 'IN_PROGRESS',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    countryWideList: [],
    searchInput: '',
    searchedList: [],
    appStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.startFetchingData()
  }

  startFetchingData = () => {
    this.setState(
      {appStatus: apiStatusConstants.progress},
      this.getNationalData,
    )
  }

  getNationalData = async () => {
    const apiURl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiURl, options)
    const data = await response.json()

    if (response.ok) {
      const newData = statesList.map(eachState => {
        if (data[eachState.state_code]) {
          return {
            confirmed: data[`${eachState.state_code}`].total.confirmed,
            recovered: data[`${eachState.state_code}`].total.recovered,
            deceased: data[`${eachState.state_code}`].total.deceased,
            active:
              data[`${eachState.state_code}`].total.confirmed -
              (data[`${eachState.state_code}`].total.recovered +
                data[`${eachState.state_code}`].total.deceased),
            stateCode: eachState.state_code,
            stateName: eachState.state_name,
          }
        }
        return {
          confirmed: 0,
          active: 0,
          recovered: 0,
          deceased: 0,
          population: 0,
          stateCode: eachState.state_code,
          stateName: eachState.state_name,
        }
      })
      this.setState({
        countryWideList: newData,
        appStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div
      className="products-details-loader-container"
      data-testid="homeRouteLoader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAscendingOrderData = () => {
    const {countryWideList} = this.state
    const ascendingSortedData = countryWideList.sort((a, b) => {
      const x = a.stateName.toLowerCase()
      const y = b.stateName.toLowerCase()
      return x > y ? 1 : -1
    })
    this.setState({countryWideList: ascendingSortedData})
  }

  renderDescendingOrderData = () => {
    const {countryWideList} = this.state
    const descendingSortedData = countryWideList.sort((a, b) => {
      const x = a.stateName.toLowerCase()
      const y = b.stateName.toLowerCase()
      return x < y ? 1 : -1
    })
    this.setState({countryWideList: descendingSortedData})
  }

  onChangeSearchInput = event => {
    const newSearchedList = statesList.filter(eachValue =>
      eachValue.stateName
        .toLowerCase()
        .includes(event.target.value.toLowerCase()),
    )
    this.setState({
      searchInput: event.target.value,
      searchedList: newSearchedList,
    })
  }

  successCovidDataContainer = () => {
    const {countryWideList, searchInput, searchedList} = this.state
    const confirmedCasesCount = countryWideList.map(
      eachCount => eachCount.confirmed,
    )
    const activeCasesCount = countryWideList.map(eachCount => eachCount.active)
    const recoveredCasesCount = countryWideList.map(
      eachCount => eachCount.recovered,
    )
    const deceasedCasesCount = countryWideList.map(
      eachCount => eachCount.deceased,
    )
    const totalConfirmedCases = confirmedCasesCount.reduce((a, b) => a + b, 0)
    const totalActiveCases = activeCasesCount.reduce((a, b) => a + b, 0)
    const totalRecoveredCases = recoveredCasesCount.reduce((a, b) => a + b, 0)
    const totalDeceasedCases = deceasedCasesCount.reduce((a, b) => a + b, 0)

    return (
      <div className="home-container">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-bar"
            placeholder="Enter the State"
            value={searchInput}
            onChange={this.onChangeSearchInput}
          />
        </div>
        {searchedList.length !== 0 && searchInput !== '' && (
          <ul>
            {searchedList.map(eachValue => (
              <Link to={`/state/${eachValue.state_code}`} className="link-home">
                <li key={eachValue.state_code}>
                  <p>{eachValue.state_code}</p>
                  <div>
                    <p>{eachValue.state_name}</p>
                    <BiChevronRightSquare />
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
        <div className="stats-main-container">
          <div className="top-container">
            <div className="stats-container">
              <p className="stats-description red">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dzfr8ujso/image/upload/v1650906699/check-mark_1_o3kbj1.png"
                alt="total confirmed cases pic"
              />
              <p className="stats-count red">{totalConfirmedCases}</p>
            </div>
            <div className="stats-container">
              <p className="stats-description blue">Active</p>
              <img
                src="https://res.cloudinary.com/dzfr8ujso/image/upload/v1650906741/protection_1_re7mxu.png"
                alt="total active cases pic"
              />
              <p className="stats-count blue">{totalActiveCases}</p>
            </div>
            <div className="stats-container">
              <p className="stats-description green">Recovered</p>
              <img
                src="https://res.cloudinary.com/dzfr8ujso/image/upload/v1650906752/recovered_1_kpsqyj.png"
                alt="total recovered cases pic"
              />
              <p className="stats-count green">{totalRecoveredCases}</p>
            </div>
            <div className="stats-container">
              <p className="stats-description gray">Deceased</p>
              <img
                src="https://res.cloudinary.com/dzfr8ujso/image/upload/v1650906686/breathing_1_dkacsd.png"
                alt="total deceased cases pic"
              />
              <p className="stats-count gray">{totalDeceasedCases}</p>
            </div>
          </div>
          <div className="main-table-style">
            <div className="table-header-row">
              <div className="first-column ">
                <p className="stats-heading">States/UT</p>
                <button
                  type="button"
                  className="order-button"
                  data-testid="ascendingSort"
                  onClick={this.renderAscendingOrderData}
                >
                  <FcGenericSortingAsc className="order-icon" />
                </button>
                <button
                  type="button"
                  className="order-button"
                  data-testid="descendingSort"
                  onClick={this.renderDescendingOrderData}
                >
                  <FcGenericSortingDesc className="order-icon" />
                </button>
              </div>
              <p className="stats-heading">Confirmed</p>
              <p className="stats-heading">Active</p>
              <p className="stats-heading">Recovered</p>
              <p className="stats-heading">Deceased</p>
              <p className="stats-heading">Population</p>
            </div>
            <ul className="state-result-table">
              {countryWideList.map(eachValue => (
                <li className="state-result-row" key={eachValue.id}>
                  <Link
                    to={`/state/${eachValue.id}`}
                    className="state-link-item"
                  >
                    <p className="name-column">{eachValue.state_name}</p>
                  </Link>
                  <p className="number-column red">{eachValue.confirmed}</p>
                  <p className="number-column blue">{eachValue.active}</p>
                  <p className="number-column green">{eachValue.recovered}</p>
                  <p className="number-column silver">{eachValue.deceased}</p>
                  <p className="number-column grey">{eachValue.population}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  resultView = () => {
    const {appStatus} = this.state
    switch (appStatus) {
      case appStatus.progress:
        return this.renderLoadingView()

      default:
        return this.successCovidDataContainer()
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.resultView()}
        <Footer />
      </>
    )
  }
}

export default Home
