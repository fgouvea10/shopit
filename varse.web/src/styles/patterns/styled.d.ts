import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      baseColor: string;
      baseColorSecondary: string;
      baseColorTertiary: string;
      bodyColor: string;
      bodyColorWhite: string;
      strokes: string;
      texts: string;
    };

    fontWeight: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
    };

    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      oneXl: string;
      twoXl: string;
      fourXl: string;
    };

    lineHeight: {
      shorter: string;
      short: string;
      tall: string;
      taller: string;
    };

    borderRadius: {
      base: string;
      pill: string;
    };

    padding: {
      spacing0: string;
      spacing1: string;
      spacing2: string;
      spacing3: string;
      spacing4: string;
      spacing5: string;
      spacing6: string;
      spacing8: string;
      spacing10: string;
      spacing12: string;
      spacing16: string;
      spacing20: string;
      spacing40: string;
    };
  }
}
