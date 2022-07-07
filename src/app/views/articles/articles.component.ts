import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Subject, takeUntil } from "rxjs";
import { Article, ArticleType, ArticleTypeOption } from "src/app/core/models/article.model";
import { ZyllemApiService } from "src/app/core/services/zyllem-api.service";

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {
    public articles: Article[] = [];
    public data: Article[] = [];
    private _unsubscribe$: Subject<void> = new Subject<void>();
    public selectedType: string = "all";
    public articleTypeOptions: ArticleTypeOption[] = [
        {
            value: "all",
            label: "All"
        },
        {
            value: ArticleType.NORMAL,
            label: "Normal"
        },
        {
            value: ArticleType.FEATURED,
            label: "Featured"
        }
    ]
    
    constructor(
        private _service: ZyllemApiService
    ) { }

    public ngOnInit(): void {
        this._getArticles();
    }

    private _getArticles(): void {
        this._service.getArticles()
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe(data => {
                this.articles = data;
                this.data = data;
            })
    }

    public filterArticles() : void {
        this.data = [...this.articles];
        if(this.selectedType !== 'all') {
            this.data = [...this.data].filter(a => a.type === this.selectedType);
        }
    }

    public ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }

}