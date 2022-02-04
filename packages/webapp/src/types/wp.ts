interface WPObject {
	id: number;
	link: string; // changed programmatically
	name: string;
	slug: string;
	taxonomy:
	| 'category'
	| 'media'
	| 'post'
}

export interface WPCategory extends WPObject {
	count: number;
}

interface WPPostContent {
	rendered: string;
	raw?: string;
}

export interface WPPost extends WPObject {
	author: WPUser['id'];
	categories: Array<WPCategory['id']>;
	categories_names?: string; // added programmatically (comma-separated list of category names)
	content: WPPostContent;
	date: string;
	excerpt: WPPostContent;
	featured_media: number; // 0 if no media, else > 0
	featured_media_source_url?: string; // added programmatically (link to the media resource link)
	title: WPPostContent;
	user: WPUser | null; // added programmatically
}

export interface WPMedia extends WPObject {
	guid: WPPostContent; // media resource link
	source_url: string;  // media resource link (scaled)
}

export interface WPUser extends WPObject {
	url: string;
}
