export interface SiteMenu {
	id: number;
	title: string;
	level: number;
	parentId: number | null;
	icon?: string;
	disabled?: boolean;
	children?: SiteMenu[];
}