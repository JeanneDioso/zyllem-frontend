export interface PhotoResponse {
    photos: PhotoSet;
}

export interface PhotoSet {
    page: number;
    pages: number;
    perpage: number;
    photo: Photo[];
    total: number;
}

export interface Photo {
    id: string;
    owner?: Owner;
    secret?: string;
    server?: string;
    farm?: number;
    title: string;
    isPublic?: boolean;
    isFriend?: boolean;
    isFamily?: boolean;
    url_l?: string;
    url_m?: string;
    description?: string;
    dateTaken?: string;
    ownername?: string;
    views: string;
}

export interface Owner {
    realname: string;
    username: string;
}
