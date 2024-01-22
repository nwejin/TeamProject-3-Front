export interface NewsProp {
    _id: string;
    url: string;
    title: string;
    smallimg: string;
    bigimg?: string | undefined;
    context: string;
    date: string;
    group: number;
}
