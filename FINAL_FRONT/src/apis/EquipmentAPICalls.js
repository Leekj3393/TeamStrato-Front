import { getEquipment, getEquipments , getCategory , postEquipment} from "../modules/EquipmentModule";

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/equipment`;

export const callEquipmentListAPI = ({ currentPage = 1 }) =>
{
    const requestURL = `${PRE_URL}/findCategory?page=${currentPage}`;

    return async (dispatch,getState) => {
        const result = await fetch(requestURL).then(resp => resp.json());
        
        if(result.status === 200)
        {
            console.log("[callEquipmentListAPI] result : ", result);
            dispatch(getEquipments(result));
        }

    };
}


export const callEquipmentDetailAPI = ({ categoryCode , currentPage = 1  }) =>
{
    const requestURL = `${PRE_URL}/detail/${categoryCode}?page=${currentPage}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL).then(resp => resp.json());

        if(result.status === 200)
        {
            console.log("[callEquipmentDetailAPI] result : ", result);
            dispatch(getEquipment(result));
        }
    }
}

export const callEquipmentCategory = () =>
{
    const requestURL = `${PRE_URL}/regist`;

    return async (dispatch,getState) =>{
        const result = await fetch(requestURL).then(resp => resp.json());

        if(result.status === 200)
        {
            console.log("[callEquipmentCategory] result : " , result);
            dispatch(getCategory(result));
        }
    }
}

export const callEquipmentRegist = (formData) =>
{
    console.log("forData : " , formData);
    const requestURL = `${PRE_URL}/regist`;

    console.log(requestURL);
    return async (dispatch , getState) => {
        const result = await fetch(requestURL,
            {
                method : 'POST',
                body : formData
            }).then(resp => resp.json());

            if(result.status === 200)
            {
                dispatch(postEquipment(result));
            }
    }
}