import { Component, Input, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Photo } from "src/app/core/models/photo.model";

@Component({
    selector: 'app-view-photo',
    templateUrl: './view-photo.component.html',
    styleUrls: ['./view-photo.component.css']
})
export class ViewPhotoComponent implements OnInit {
    @Input() photo: Subject<Photo>;
    public selected: Photo;
    public showPhoto: boolean = false;

    public ngOnInit(): void {
        this.photo.subscribe(val => {
            this.showPhoto = true;
            this.selected = val;

            if(val) {
                this._hideScrollBar(true);
            }
        })
    }

    private _hideScrollBar(hide: boolean): void {
        document.body.style.overflow = hide ? 'hidden' : 'visible';
    }

    public close(): void {
        this.showPhoto = false;
        this._hideScrollBar(false);
    }
}