import { ICardTagPalette } from './type';

// Module augmentation to extend the PaletteOptions for the card tags
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    tags: ICardTagPalette;
  }
  interface PaletteOptions {
    tags: ICardTagPalette;
  }
}
