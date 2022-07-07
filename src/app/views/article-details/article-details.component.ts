import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { Article, ArticleType, ArticleTypeOption, FeaturedArticle, NormalArticle } from "src/app/core/models/article.model";
import { ZyllemApiService } from "src/app/core/services/zyllem-api.service";

@Component({
    selector: 'app-article-details',
    templateUrl: './article-details.component.html',
    styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit, OnDestroy {
    public article: Article;
    private _articleId: string;
    private _unsubscribe$: Subject<void> = new Subject<void>();
    
    constructor(
        private _service: ZyllemApiService,
        private _activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this._articleId = this._activatedRoute.snapshot.paramMap.get('id');
        this._getArticle();
    }

    private _getArticle(): void {
        this._service.getArticle(this._articleId)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe(data => {
                this.article = data;
            })
    }


    public ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}