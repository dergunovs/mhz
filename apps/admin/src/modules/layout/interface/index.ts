import { FunctionalComponent } from 'vue';

export interface INavItem {
  _id: number;
  url: string;
  title: string;
  icon: FunctionalComponent;
}
