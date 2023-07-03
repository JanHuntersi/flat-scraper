import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const lightColors = {
    txt: '#142136',
    background: '#f5f5f5',
    btn: '#6366f1',
};

const darkColors = {
    txt: '#ffffff',
    background: '#142136',
    btn: '#22395d',
};

const lightTheme = createTheme({
    palette: {
        primary: {
            main: lightColors.btn,
        },
        text: {
            primary: lightColors.txt,
        },
        background: {
            default: lightColors.background,
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: darkColors.btn,
        },
        text: {
            primary: darkColors.txt,
        },
        background: {
            default: darkColors.background,
        },
    },
});

export { lightTheme, darkTheme };
