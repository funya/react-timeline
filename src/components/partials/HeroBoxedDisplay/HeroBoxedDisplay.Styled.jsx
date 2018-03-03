import { default as HeroBoxedDisplayPure } from './HeroBoxedDisplay.Pure';
import styler                              from '~/style/styler';

export default styler(({ colors, fonts, helpers, keywords }) => ({
  // Static declarations necessary for subsequent reference(s):
  eventsDrawerIcon: {},

  backgroundImageContainer: {
    ...helpers.flexify('row', 'center'),
    background: {
      attachment: null,
      color: colors.grey.line,
      repeat: 'no-repeat',
      position: ['center', 'center'],
      size: [keywords.auto, '60%'],
    },
    height: 600,
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100vw',
  },
  boxedDisplayContainer: {
    height: 600,
    overflow: 'hidden',
    position: 'fixed',
    width: '100%',
  },
  boxedDisplayHeader: {
    margin: [0, keywords.auto],
    maxWidth: 800,
    position: 'absolute',
    textAlign: 'center',
    top: '40%',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },
  boxedDisplayHeroContainer: {
    ...helpers.flexify('column', 'center', ['center', 'center']),
    height: 600,
  },
  eventsDrawerToggleButton: {
    position: `absolute ${keywords.important}`,
    zIndex: 1,
  },
  eventTitle: {
    background: {
      color: colors.red.primary,
      image: `linear-gradient(0deg, ${keywords.transparent} 0, ${colors.red.primary} 0)`,
      position: 0,
      size: '1rem',
      repeat: 'no-repeat',
    },
    boxDecorationBreak: 'clone',
    color: colors.grey.armadillo,
    display: 'inline',
    font: {
      lineHeight: 1.4,
      size: '4rem',
    },
    padding: [0, '1.285714rem'], // => `18px`
    WebkitBoxDecorationBreak: 'clone',
  },
}), {
  styleName: 'HeroBoxedDisplayStyles',
})(HeroBoxedDisplayPure);