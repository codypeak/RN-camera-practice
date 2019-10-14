import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image) => {
    return async dispatch => {
        const fileName = image.split('/').pop(); //image is here is just a path to the image so it's a string, so we can split it by / and pop the last element off which is the file name.
        const newPath = FileSystem.documentDirectory;

        try {
            await FileSystem.moveAsync({ //stores image in new location.
                from: image,
                to: newPath,
            });
            const dbResult = await insertPlace(title, newPath, 'dummy address', 15.6, 12.3);
        } catch (err) {
            console.log(err);
            throw err;
        }

        dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title: title, image: newPath }}); //id added later when autogenerated by sqlite.
    }
};

export const loadPlaces = () => {
    return async dispatch => {
        try { 
            const dbResult = await fetchPlaces();
        } catch (err) {
            throw err;
        }
        dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    };
};