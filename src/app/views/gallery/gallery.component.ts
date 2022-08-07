import { Component, HostListener, Inject, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { PhotoSet, Photo } from "src/app/core/models/photo.model";
import { GalleryService } from "src/app/core/services/gallery.service";

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    public photo: Subject<Photo> = new Subject<Photo>();
    public photoSet: PhotoSet = {
        page: 1,
        pages: 1,
        perpage: 100,
        total: 1,
        photo: []
    }

    private _currentPhotos:Photo[] = [];
    public searchText: string = "";
    public currentPage: number = 1;
    public isLoading: boolean = false;
    public isNewSearch: boolean = false;
    constructor(
        private _service: GalleryService
    ) { 

    }

    public ngOnInit(): void {
        this.isLoading = true;
        this._getPhotos();
    }

    private _getPhotos(): void {
        this._service.getPhotos(this.searchText, this.currentPage)
            .pipe(takeUntil(this._unsubscribe$)) 
            .subscribe(data => {
                this._currentPhotos = this.isNewSearch ? [] : [...this.photoSet.photo];
                this.photoSet = data;
                this.photoSet.photo =  [...this._currentPhotos, ...data.photo, ];
                this.isLoading = false;
            })
    }

    public search() {
        this.isNewSearch = true;
        this._getPhotos();
    }

    public viewPhoto(photo: Photo) {
        this.photo.next(photo);
    }

    @HostListener("window:scroll", [])
    onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.currentPage += 1;
            this._getPhotos();
        }
    }

}