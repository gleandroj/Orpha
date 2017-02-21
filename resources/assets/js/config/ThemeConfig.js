/**
 * Created by FG0003 on 20/02/2017.
 */
export default function ThemeConfig($mdThemingProvider, $mdDateLocaleProvider) {

    $mdThemingProvider.definePalette('orphaPrimaryPalette', {
        '50': '#6da7e0',
        '100': '#2e80d2',
        '200': '#2364a5',
        '300': '#17416a',
        '400': '#113151',
        '500': '#0c2238',
        '600': '#07131f',
        '700': '#010306',
        '800': '#000000',
        '900': '#000000',
        'A100': '#6da7e0',
        'A200': '#2e80d2',
        'A400': '#113151',
        'A700': '#010306',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', 'A100']
    });
    $mdThemingProvider.definePalette('orphaWarmPalette', {
        '50': '#ffffff',
        '100': '#f4cbcb',
        '200': '#ea9c9c',
        '300': '#de6161',
        '400': '#d84848',
        '500': '#d32f2f',
        '600': '#bc2828',
        '700': '#a22222',
        '800': '#891d1d',
        '900': '#701818',
        'A100': '#ffffff',
        'A200': '#f4cbcb',
        'A400': '#d84848',
        'A700': '#a22222',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100', '200', '300', 'A100', 'A200']
    });
    $mdThemingProvider.definePalette('orphaAccentPallet', {
        '50': '#c9ebcb',
        '100': '#91d795',
        '200': '#68c76d',
        '300': '#3eaa44',
        '400': '#36933b',
        '500': '#2e7d32',
        '600': '#266729',
        '700': '#1e5020',
        '800': '#153a17',
        '900': '#0d230e',
        'A100': '#c9ebcb',
        'A200': '#91d795',
        'A400': '#36933b',
        'A700': '#00C853',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50', '100', '200', '300', 'A100', 'A200']
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('orphaPrimaryPalette')
        .warnPalette('orphaWarmPalette')
        .accentPalette('orphaAccentPallet', {'default':'500'})
        .backgroundPalette('grey');
}