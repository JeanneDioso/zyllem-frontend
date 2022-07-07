import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleDetailsComponent } from "./views/article-details/article-details.component";
import { ArticlesComponent } from "./views/articles/articles.component";

const routes: Routes = [
    {
        path: '', component: ArticlesComponent, pathMatch: 'full'
    },
    {
        path: ':id', component: ArticleDetailsComponent, pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy"})],
    exports: [RouterModule]
})

export class AppRoutingModule {} 