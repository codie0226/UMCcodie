import {responseFromUser} from "./user.dto.js";
import { 
    responseFromReviews,
    responseFromMissions,
    responseFromUserMissions
} from "../dtos/user.dto.js";
import {
    addUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
    addShop,
    addReview,
    addMission,
    acceptMission,
    getAllStoreReviews,
    getMyReviews,
    getStoreMissions,
    getMyMissions,
    completeMission
} from "../repositories/user.repository.js";

export const userSignUp = async(data)=>{   //실제로 회원가입을 위한 함수
    const joinUserId = await addUser({
        email: data.email,
        name: data.name,
        gender: data.gender,
        birth: data.birth,
        address: data.address,
        detailAddress: data.detailAddress,
        phoneNumber: data.phoneNumber,
    });

    if(joinUserId === null){
        throw new Error("이미 존재하는 이메일입니다.");   //중복 이메일 거르기
    }

    for(const preference of data.preferences){     //preferences는 배열 형태로 넘어옴 for-of문으로 하나씩 긁기
        await setPreference(joinUserId, preference);
    }

    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);

    return responseFromUser({user, preferences});
};

export const shopToArea = async(data) => {
    const newShopId = await addShop({
        area_id: data.area_id,
        shop_name: data.shop_name
    });

    return {area_id: data.area_id, shop_name: data.shop_name};
};

export const reviewToShop = async(data) => {
    const newReviewId = await addReview({
        user_id: data.user_id,
        shop_id: data.shop_id,
        content: data.content,
        rating: data.rating
    });

    if(newReviewId === null){
        throw new Error(
            '상점이 존재하지 않습니다.'
        );
    }

    return {content: data.content, rating: data.rating};
};

export const missionToShop = async(data) => {
    const newMissionId = await addMission({
        area_id: data.area_id,
        shop_id: data.shop_id,
        point: data.point,
        mission_content: data.mission_content
    });

    return {shop_id: data.shop_id, mission_content: data.mission_content};
}

export const missionAccept = async(data) => {
    const acceptedMissionId = await acceptMission({
        mission_id: data.mission_id,
        user_id: data.user_id
    });

    if(acceptedMissionId === null){
        throw new Error(
            '이미 수락한 미션입니다.'
        );
    }

    return {mission_id: data.mission_id, user_id: data.user_id};
}

export const listShopReviews = async(shopId, cursor) => {
    const reviews = await getAllStoreReviews(shopId, cursor);
    return responseFromReviews(reviews);
};

export const listMyReviews = async(userId, cursor) => {
    const reviews = await getMyReviews(userId, cursor);
    return responseFromReviews(reviews);
}

export const listShopMissions = async(shopId, cursor) => {
    const missions = await getStoreMissions(shopId, cursor);
    return responseFromMissions(missions);
}

export const listMyMissions = async(userId, cursor) => {
    const missions = await getMyMissions(userId, cursor);
    return responseFromUserMissions(missions);
}

export const successMission = async(userId, missionId) => {
    const mission = await completeMission(userId, missionId);
}