export class Drive {
    id?: string;
    title: string;
    author: string;
    authorId: string;
    number_of_places: number;
    start_point: {
        lat: number,
        lng: number,
    };
    end_point: {
        lat: number,
        lng: number,
    };
    distance?: string;
    price_per_person: string;
    start_date: Date;
    published: Date;
}
