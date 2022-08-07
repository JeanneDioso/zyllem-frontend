import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GalleryComponent } from "./views/gallery/gallery.component";

const routes: Routes = [
    {
        path: '', component: GalleryComponent, pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy"})],
    exports: [RouterModule]
})

export class AppRoutingModule {} 