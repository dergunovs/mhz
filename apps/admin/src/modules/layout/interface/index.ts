import { FunctionalComponent } from 'vue';

export interface INavItem {
  _id: string;
  url: string;
  title: string;
  icon: FunctionalComponent;
}

export interface IPageTitleLink {
  url: string;
  title?: string;
}
