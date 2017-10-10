import BatchSelectCheckboxPure from './BatchSelectCheckbox.Pure';
import styler from '../../../style/styler';

export default styler(({ colors, fonts, helpers, keywords, transitions }) => ({
  // Static `className` declarations necessary for nested references:
  batchSelect: {},
  invertedCheckbox: {},

  selectionCheckbox: {
    margin: 0,

    '& input[type="checkbox"]': {
      ...helpers.setElementVisibility(),
      left: -9999,
      position: 'absolute',

      '& + label': {
        cursor: 'pointer',
        paddingLeft: '2.5rem',

        '&:before': {
          border: {
            color: colors.white.primary,
            radius: '3px',
            style: 'solid',
            width: 2.5,
          },
          content: '""',
          height: '1rem',
          left: '0.35rem',
          position: 'absolute',
          transition: transitions.customTimingFunction,
          width: '1rem',
        },
      },

      '&:checked': {
        '& + label': {
          '&:before': {
            border: {
              color: colors.white.primary,
              radius: 3,
              style: 'solid',
              width: 3,
            },
            borderLeftColor: keywords.transparent,
            borderTopColor: keywords.transparent,
            height: 22,
            left: '0.15rem',
            top: -9,
            transform: 'rotate(40deg)',
            width: 12,
          },
        },
      },

      '&$batchSelect': {
        '& + label:before': {
          height: '1.75rem',
          left: '-0.25rem',
          width: '1.75rem',
        },

        '&:checked + label:before': {
          height: '2rem',
          left: '0.5rem',
          top: '0.05rem',
          width: '1rem',
        },
      },

    },
    '&$invertedCheckbox': {
      position: 'absolute',
      right: 0,

      '& input[type="checkbox"]': {
        '&$batchSelect': {
          '& + label:before': {
            left: keywords.auto,
            right: '0.25rem',
          },

          '&:checked + label:before': {
            left: keywords.auto,
            right: '0.25rem',
          },
        },
      },
    },
  },
}), {
  styleName: 'BatchSelectCheckboxStyles',
})(BatchSelectCheckboxPure);