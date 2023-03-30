import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { getPolygons } from '../services/Map-service'

const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoicGF2bG92YW9sZ2FhIiwiYSI6ImNsZm84aDgzNTB0Y2szc212cDJlYjl5dWkifQ.r-aDHa_R2IVNd1FyGTLVtA',
    });

const PolygonsMap = () => {
    const [polygons, setPolygons] = useState({coordinates: []})

    useEffect(() => {
        getPolygons()
            .then(response => {
            console.log(response.data)
            parseData(response.data)
            })
    }, [])

    const parseData = async(plots) => {
        let initPlots = {coordinates: []}

        for (let i = 0; i < plots.length; i++){
            const coors = plots[i].attributes.coordinates.data
            let tempArr = [[]]
            for (let j = 0; j < coors.length; j++) {
                const coor = []
                coor.push(coors[j].attributes.longitude)
                coor.push(coors[j].attributes.latitude)
                tempArr[0].push(coor)
            }
            initPlots.coordinates.push(tempArr)
        }
        setPolygons(initPlots)
    }

    const onDrawCreate = e => {
        if(e) {
            const t = e.features[0].geometry
            let obj = polygons.coordinates
            obj.push([t.coordinates[0]])
            setPolygons({coordinates: obj})
        }
    }

    return (
        <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{ height: '100vh', width: '100vw' }}
        onStyleLoad={map => {
            map.addControl(new MapboxDraw({}))
            map.on('draw.create', onDrawCreate)
        }}
        >
        <Layer
            type="fill"
            id="polygon"
            paint={{
            'fill-color': '#f00',
            'fill-opacity': 0.5,
            }}
        >
            {polygons && <Feature coordinates={polygons.coordinates} />}
        </Layer>
        </Map>
    );
};

export default PolygonsMap