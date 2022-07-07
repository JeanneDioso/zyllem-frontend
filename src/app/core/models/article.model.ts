
export abstract class Article {
    id: string
    title: string;
    author: string;
    publishedAt: string; //date time in ISO format 
    url: string;
    type: ArticleType;
}

export class NormalArticle extends Article {
    description: string;
}

export class FeaturedArticle extends  Article {
    featureImgUrl: string;
}

export class ArticleTypeOption {
    value: string;
    label: string;
}

export enum ArticleType {
    NORMAL = "NORMAL",
    FEATURED = "FEATURED",
}