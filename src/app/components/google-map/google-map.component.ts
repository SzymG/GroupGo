import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer,
    ViewChild
} from '@angular/core';
import {google} from 'google-maps';

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, OnDestroy {
    @Input() editable: boolean;
    @Input() start: {
        lat: number,
        lng: number,
    };
    @Input() end: {
        lat: number,
        lng: number,
    };
    @Output() locationsChanged = new EventEmitter();

    @ViewChild('map') mapElement;
    @ViewChild('setButton', {read: ElementRef}) setButton: ElementRef;

    private map: google.maps.Map<any>;
    private markerStart: google.maps.Marker;
    private markerEnd: google.maps.Marker;
    private tmpListener: any;

    constructor(
        private renderer: Renderer,
    ) { }

    ngOnInit() {
        this.initMap();

        if (this.editable) {
            this.tmpListener = this.renderer.listen(this.setButton.nativeElement, 'click', () => {
                const startLat = this.markerStart.getPosition().lat();
                const startLng = this.markerStart.getPosition().lng();
                const endLat = this.markerEnd.getPosition().lat();
                const endLng = this.markerEnd.getPosition().lng();
                const distance = this.calculateDistance(startLat, startLng, endLat, endLng);
                this.locationsChanged.emit({
                    start: {
                        lat: startLat,
                        lng: startLng,
                    },
                    end: {
                        lat: endLat,
                        lng: endLng,
                    },
                    distance: distance.toFixed(2),
                    cost: this.calculateCost(distance).toFixed(2),
                });
            });
        } else {
            this.setButton.nativeElement.style.display = 'none';
        }
    }

    ngOnDestroy() {
        if (this.editable) {
            this.tmpListener();
        }
    }

    private initMap() {
        const coords = new google.maps.LatLng(52.392682, 16.919682);
        const endCoords = new google.maps.LatLng(52.406376, 16.925167);
        const mapOptions: google.maps.MapOptions = {
            center: coords,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.markerStart = new google.maps.Marker({
            map: this.map,
            position: coords,
            draggable: this.editable,
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
        });

        this.markerEnd = new google.maps.Marker({
            map: this.map,
            position: endCoords,
            draggable: this.editable,
            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            }
        });

        /* Jeśli byśmy chcieli dodać linię między punktami
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();

        directionsRenderer.setMap(this.map);

        document.getElementById('setButton').addEventListener('click', () => {
            const startX = markerStart.getPosition().lat();
            const startY = markerStart.getPosition().lng();
            const endX = markerEnd.getPosition().lat();
            const endY = markerEnd.getPosition().lng();
            const start = new google.maps.LatLng({lat: startX, lng: startY});
            const end = new google.maps.LatLng({lat: endX, lng: endY});
            const request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING,
            };
            console.log('routing', request);
            directionsService.route(request, (response, status) => {
                console.log(response);
                console.log(status);
            });
        });*/
    }

    private calculateDistance(lat1, long1, lat2, long2) {
        // radians
        lat1 = (lat1 * 2.0 * Math.PI) / 60.0 / 360.0;
        long1 = (long1 * 2.0 * Math.PI) / 60.0 / 360.0;
        lat2 = (lat2 * 2.0 * Math.PI) / 60.0 / 360.0;
        long2 = (long2 * 2.0 * Math.PI) / 60.0 / 360.0;


        // use to different earth axis length
        const a = 6378137.0;        // Earth Major Axis (WGS84)
        const b = 6356752.3142;     // Minor Axis
        const f = (a - b) / a;        // "Flattening"
        const e = 2.0 * f - f * f;      // "Eccentricity"

        let beta = (a / Math.sqrt( 1.0 - e * Math.sin( lat1 ) * Math.sin( lat1 )));
        let cos = Math.cos( lat1 );
        let x = beta * cos * Math.cos( long1 );
        let y = beta * cos * Math.sin( long1 );
        let z = beta * ( 1 - e ) * Math.sin( lat1 );

        beta = ( a / Math.sqrt( 1.0 -  e * Math.sin( lat2 ) * Math.sin( lat2 )));
        cos = Math.cos( lat2 );
        x -= (beta * cos * Math.cos( long2 ));
        y -= (beta * cos * Math.sin( long2 ));
        z -= (beta * (1 - e) * Math.sin( lat2 ));

        return (Math.sqrt( (x * x) + (y * y) + (z * z) ) / 1000) * 100;
    }

    private calculateCost(distance) {
        const avgCombustionPer100km = 8;
        const avgPriceOfL = 4.5;
        return (distance / 100) * avgCombustionPer100km * avgPriceOfL;
    }
}
