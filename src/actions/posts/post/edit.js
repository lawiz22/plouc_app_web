import axios from 'axios';
import {normalize} from 'normalizr';
import actionTypes from '../../../config/action-types';
import settings from '../../../config/settings';
import {setNormalized} from '../../../utils/general';
import {POST} from '../../../utils/normalize';
import {tokenHeader} from '../../../utils/requestHeaders';
import moment from 'moment';


export const editPost = data => async dispatch => {
    const MODEL = 'POSTS';
    dispatch({type: actionTypes[`SET_${MODEL}_PENDING`]});
    let formData = new FormData();
    formData.append('body', data.body || '');
    formData.append('title', data.title || '');
    formData.append('date_debut',data.date_debut || '');
    formData.append('date_fin', data.date_fin || '');
    formData.append('is_active', data.is_active || '');
    if(data.image) formData.append('image', data.image);
    try {
        const response = await axios.patch(`${settings.API_ROOT}/posts/${data.id}`, formData, tokenHeader());
        const {entities} = normalize(response.data, POST);
        setNormalized(dispatch, entities);
        return entities;
    } catch(error) {
        throw error;
    }
};
