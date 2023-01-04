<template>
    <div class="gmap"></div>
</template>

<script>

    import gmapsInit from '@/scripts/utilities/gmaps';

    export default{
        name: 'gmap',
        props:{
            markers: Array,
            default: function(){
                return [];
            }
        },
        data(){
            return{
                map: {},
                google: {},
                geocoder: {},
                isMapComplete: false
            }
        },
        watch:{
            markers: function(newVal){
                if(this.$utils.isEmpty(newVal)) return;

                this.setMarkers();
            }
        },
        methods:{
            setMarkers(){
                if(!this.isMapComplete)return;
                const map = this.map;
                const google = this.google;
                const geocoder = this.geocoder;

                const markerClickHandler = (marker, rental) => {
                    map.setZoom(13);
                    map.setCenter(marker.getPosition());
                };
                
                let bounds = new google.maps.LatLngBounds();
                this.markers.map((location) => {

                    // marker
                    const marker = new google.maps.Marker({ 
                        ...location, 
                        map: map
                    });
                    marker.addListener('click', () => markerClickHandler(marker, location));
                    bounds.extend(marker.getPosition());

                    //info window
                    let infoContent = '';
                    if(!location.position.isSubjectProp){
                        let formattedRent = this.$utils.formatAsCurrency(location.position.rent);
                        infoContent = `<b>${formattedRent}</b>`;
                    }else{
                        infoContent = "Your Property";
                    }
                    
                    const infowindow = new google.maps.InfoWindow({
                        content: infoContent
                    });
                    infowindow.open(map, marker);

                    return marker;
                });

                geocoder.geocode({ address: 'United States' }, (results, status) => {
                    if (status !== 'OK' || !results[0]) {
                        throw new Error(status);
                    }

                    map.setCenter(results[0].geometry.location);
                    map.fitBounds(bounds);
                });
            }
        },
        async mounted(){
            try {
                this.google = await gmapsInit();
                this.geocoder = new google.maps.Geocoder();
                this.map = new google.maps.Map(this.$el);
                this.isMapComplete = true;

                if(!this.$utils.isEmpty(this.markers)){
                    this.setMarkers();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
</script>

<style scoped>
    .gmap{
        width: 100%;
        height: 100%;
    }
</style>