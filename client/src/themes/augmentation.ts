import { ICardTagPalette, ITeamsColorPalette } from './type';

// Module augmentation to extend the PaletteOptions for the card tags and teams
declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    tags: ICardTagPalette;
    teams: ITeamsColorPalette;
  }
  interface PaletteOptions {
    tags: ICardTagPalette;
    teams: ITeamsColorPalette;
  }
}
