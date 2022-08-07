import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Photo, PhotoResponse, PhotoSet } from '../models/photo.model';

@Injectable()
export class GalleryService {
    private readonly ROUTE_API = "https://api.flickr.com/services/rest";
    private readonly API_KEY = "f87a30028db92d275d4e18683969939f";
    private readonly USER_ID = "66956608@N06"
    private _standardParam = {
        api_key: this.API_KEY,
        nojsoncallback: 1,
        per_page: 100,
        page: 1,
        format: "json",
        extras: "url_l,date_taken,description,owner_name,views,url_m",
        sort: "relevance",
        lang: "en-US"
    }

    constructor(private _httpClient: HttpClient) { }

    public getPhotos(searchText?: string, page?: number): Observable<PhotoSet> {
        let params: any = {
            ...this._standardParam,
            method: "flickr.photos.search",
            page: page
        };

        if (searchText) {
            params.text = searchText;
        }

        return this._httpClient.get<PhotoResponse>(this.ROUTE_API, {
            params: params
        })
            .pipe(
                map(val => { return val.photos; }),
                catchError(err => {
                    throw 'Failed to get photos';
                })
            );
    }
}