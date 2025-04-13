/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: { min: '0px', max: '479px' },
      // => @media (min-width: 320px) { ... }

      xs: { min: '480px', max: '639px' },
      // => @media (min-width: 480px) { ... }

      sm: { min: '640px', max: '767px' },
      // => @media (min-width: 640px) { ... }

      md: { min: '768px', max: '1023px' },
      // => @media (min-width: 768px) { ... }

      lg: { min: '1024px', max: '1279px' },
      // => @media (min-width: 1024px) { ... }

      xl: { min: '1280px', max: '1535px' },
      // => @media (min-width: 1280px) { ... }

      '2xl': { min: '1536px' },
      // => @media (min-width: 1536px) { ... }

      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px'
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        secondary: ['Rubik', 'sans-serif']
      },
      fontSize: {
        title: ['28px', '24px', '20px', '16px', '14px']
      },
      borderRadius: {
        DEFAULT: '4px'
      },
      stroke: {
        primary: '#226355',
        secondary: '#C38975',
        gray: '#666666',

        /*tobe decided*/
        success: {
          light: '#EBFFF3',
          DEFAULT: '#70CF98',
          dark: '#06B851'
        },
        info: {
          light: '#F1F7FF',
          DEFAULT: '#3FB2FF',
          dark: '#3183F2'
        },
        warning: {
          light: '#FBF4DB',
          DEFAULT: '#FFAD01',
          dark: '#D18E00'
        },
        error: {
          light: '#FFF5F4',
          DEFAULT: '#FF7777',
          dark: '#E83E3E'
        }
      },
      boxShadow: {
        navbar: '0px 4px 8px rgba(0, 0, 0, 0.05)',
        select: '0px 0px 8px rgba(0, 0, 0, 0.25)',
        card: '0px 0px 0px rgba(63, 63, 68, 0.05), 0px 1px 9px rgba(18, 18, 91, 0.15)',
        card2: '0px 0px 4px rgba(0, 0, 0, 0.015)',

        popper:
          '0px 0px 0px rgba(63, 63, 68, 0.05), 0px 1px 9px rgba(18, 18, 91, 0.15)',
        top: '0px -4px 6px rgb(0 0 0 / 8%)',
        bottom: '0px 4px 6px rgb(0 0 0 / 8%)'
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        // Colores semánticos
        success: {
          light: '#E3FCEF',
          DEFAULT: '#ABF5D1',
          dark: '#006644'
        },
        info: {
          light: '#DEEBFF',
          DEFAULT: '#B3D4FF',
          dark: '#0747A6'
        },
        warning: {
          light: '#FFEFB7',
          DEFAULT: '#FFD46E',
          dark: '#B1762F'
        },
        error: {
          light: '#FFEBE6',
          DEFAULT: '#FFBDAD',
          dark: '#BF2600'
        },

        oferente: '#42B883',
        demandante: '#222D63',
        gestor: '#5075D6',

        asessordecircularidad: '#006644',

        /* Propuesta 
          'uv-primary': {
            0:'#226355',
            10: '#226355',
            20: '#387265',
            30: '#4C8075',
            40: '#769D95',
            50: '#8CACA5',
            60: '#A1BBB5',
            70: '#B6CAC5',
            80: '#CBD8D5',
            90: '#E0E7E5',
          }, 
          'uv-secondary': {
            0: '#8E5F4E',
            10: '#B17965',
            20: '#C99A8A',
            30: '#CDA496',
            40: '#D0ADA1',
            50: '#D3B6AB',
            60: '#D7C0B8',
            70: '#DAC8C2',
            80: '#DED2CE',
            90: '#E1DBD9',
          },
        */

        'uv-primary': {
          0: '#225B2A',
          10: '#376B3E',
          20: '#4E7B54',
          30: '#638B69',
          40: '#7A9C7F',
          50: '#90AC94',
          60: '#A6BDA9',
          70: '#BCCDBE',
          80: '#D2DED4',
          90: '#E8EEE9'
        },

        'uv-secondary': {
          0: '#43A7B6',
          10: '#55AFBD',
          20: '#68B8C4',
          30: '#7BC1CB',
          40: '#8ECAD3',
          50: '#A0D3DA',
          60: '#B3DCE2',
          70: '#C6E4E9',
          80: '#D9EDF0',
          90: '#ECF6F8'
        },

        neutral: {
          white: '#FFFFFF',
          black: '#000000',
          0: '#233936',
          10: '#384C4A',
          20: '#4D5F5C',
          30: '#627270',
          40: '#778482',
          50: '#8C9796',
          60: '#A1AAA9',
          70: '#B6BDBC',
          80: '#CBCFCF',
          90: '#E0E3E2'
        },

        'background-primary': '#EFF5F4',
        'background-secondary': '#EDF8F9',
        card: '#FFFFFF'
      },
      animation: {
        'fade-in-right': 'fade-in-right 0.3s ease-in',
        'fade-out-right': 'fade-out-right 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-in',
        'fade-out': 'fade-out 0.3s ease-out'
      },
      screens: {
        xs: '420px',
        sm: '640px', // => @media (min-width: 640px) { ... }
        md: '768px', // => @media (min-width: 768px) { ... }
        lg: '1024px', // => @media (min-width: 1024px) { ... }
        xl: '1280px', // => @media (min-width: 1280px) { ... }
        '2xl': '1280px'
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        'fade-out': {
          '0%': {
            opacity: '1'
          },
          '100%': {
            opacity: '0'
          }
        },
        'fade-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(200px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        'fade-out-right': {
          '0%': {
            opacity: '1',
            transform: 'translateX(0)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(200px)'
          }
        }
      }
    }
  },
  plugins: []
};
