// for all colors
const COLORS = {
  background: '#fff',
  foreground: '#000',

  primary: '#D2DE32',
  secondary: '#000',
  danger: '#ef4444',
  warning: '#eab308',

  gray: '#83829A',
  gray2: '#C1C0C8',

  white: '#F3F4F8',
  lightWhite: '#FAFAFC',
};

// for font family
const FONTS = {
  poppins_black: 'Poppins-Black',
  poppins_bold: 'Poppins-Bold',
  poppins_extrabold: 'Poppins-ExtraBold',
  poppins_extralight: 'Poppins-ExtraLight',
  poppins_light: 'Poppins-Light',
  poppins_medium: 'Poppins-Medium',
  poppins_regular: 'Poppins-Regular',
  poppins_semibold: 'Poppins-SemiBold',
  poppins_thin: 'Poppins-Thin',
};

// for font size
const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

// for box shadow
const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

// for border radius
const ROUNDED = {
  none: 0,
  xSmall: 1,
  small: 2,
  medium: 4,
  large: 8,
  xLarge: 12,
  xxLarge: 16,
};

export default {COLORS, FONTS, SIZES, SHADOWS, ROUNDED};
