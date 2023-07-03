import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { PaletteOptions } from '@mui/material/styles/createPalette';


const lightTheme = createTheme({
    palette: {
        primary: blue,
        secondary: {
            main: '#39ace7', // Example secondary color

        },
        // Add more custom colors as needed
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: blue,
        secondary: {
            main: '#39ace7', // Example secondary color
        },
        // Add more custom colors as needed
    },
});

export { lightTheme, darkTheme };
