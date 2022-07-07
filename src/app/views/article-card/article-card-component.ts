import { Component, Input, OnInit } from "@angular/core";
import { Article } from "src/app/core/models/article.model";

@Component({
    selector: 'app-article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {
    @Input('article') public article: Article;

    constructor() { }

    public ngOnInit(): void {

    }

}