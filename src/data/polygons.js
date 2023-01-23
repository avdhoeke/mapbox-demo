
export const draw_outline = (map, source) => {
    // Add a black outline around the polygon.
    map.current.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': source,
        'layout': {},
        'paint': {
        'line-color': '#000',
        'line-width': 3
        }
        });
    }

export const add_layer = (map, id) => {
    // Add a new layer to visualize the polygon.
    map.current.addLayer({
        'id': id,
        'type': 'fill',
        'source': 'maine', // reference the data source
        'layout': {},
        'paint': {
        'fill-color': '#0080ff', // blue color fill
        'fill-opacity': 0.5
        }
    });
}