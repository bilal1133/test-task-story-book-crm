import {
  WPCategory, WPPost
} from '@app/types';

export interface BlogHomeProps {
  categories: Array<WPCategory>;
  pinned: Array<WPPost>;
  gallery: Array<WPPost>;
}

export interface BlogArticleProps {
  post: WPPost;
  authorSection: WPPost;
}

export interface SiteHomeBlogProps {
  latest3BlogPosts: Array<WPPost>;
  latest4BlogPosts: Array<WPPost>;
}
