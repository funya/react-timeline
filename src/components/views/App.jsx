import React, { Component }   from 'react';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { ClassNamesPropType } from 'aesthetic';
import { Redirect }           from 'react-router-dom';
import { fetchSeedData }      from '~/actions/asyncActions';
import Timeline               from '~/containers/Timeline';
import { fetchAllCloudinary } from '~/state/cloudinaryImageStore';
import styler                 from '~/style/styler';
import { tlEventPropTypes }   from '~/util/TypeChecking';

// Import global CSS transpiled stylesheet:
import '@root/assets/styles/master.scss';

@connect(
  ({ cloudinaryImageStore, seedDataAggregator }) => ({
    cloudinaryImageStore,
    seedData: seedDataAggregator,
  }),
  (dispatch) => bindActionCreators({ fetchAllCloudinary, fetchSeedData }, dispatch),
)
@styler(({ fonts, keywords }) => ({
  hamburger: {
    cursor: 'pointer',
    font: {
      family: fonts.face.default,
      lineHeight: 1,
      size: '4rem',
      stretch: keywords.normal,
      style: keywords.normal,
      variant: keywords.normal,
      weight: 'lighter',
    },
    margin: ['1.5rem', '2rem'],
    position: 'fixed',
    top: 0,
  },
  tlContainer: {
    minHeight: '75vh',
  },
}), {
  styleName: 'AppViewStyles',
})
export default class App extends Component {
  static displayName = 'App';

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]),
    classNames: ClassNamesPropType,
    cloudinaryImageStore: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    seedData: PropTypes.objectOf(tlEventPropTypes),
  };

  static defaultProps = {
    children: null,
    classNames: {},
    cloudinaryImageStore: null,
    seedData: null,
  };

  componentWillMount() { // Alternatively, use `componentDidMount()`
    const { fetchAllCloudinary, fetchSeedData } = this.props;

    fetchSeedData();
    fetchAllCloudinary();

    return new Promise((resolve, reject) => resolve(fetchSeedData()))
      .then((data) => fetchAllCloudinary());
  }

  componentWillReceiveProps(nextProps) { // Alternatively, use `componentDidUpdate()`
    // console.log('Component Will Receive Props');
  }

  clickHandler() {
    return (
      <Redirect
        to={{
          pathname: '/search',
          state: { from: this.props.location },
        }}
      />
    );
  }

  render() {
    const { children, classNames, cloudinaryImageStore, seedData } = this.props;

    return (
      <div className={classNames.tlContainer}>
        <Timeline
          withOpenInterval
          cIS={cloudinaryImageStore}
          seedData={seedData}
        />
        {children}
      </div>
    );
  }
}
