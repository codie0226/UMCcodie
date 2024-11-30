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
    completeMission,
    userManip
} from "../repositories/user.repository.js";
import{
    NoShopDataError,
    MissionAcceptedError,
    NoReviewsError,
    NoUserError,
    NoMissionError,
    WrongMissionHandle
} from "../error.js"

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
        throw new NoShopDataError("상점을 찾을 수 없습니다.", data);
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

    if(newMissionId === null){
        throw new NoShopDataError("상점을 찾을 수 없습니다.", data);
    }

    return {shop_id: data.shop_id, mission_content: data.mission_content};
}

export const missionAccept = async(data) => {
    const acceptedMissionId = await acceptMission({
        mission_id: data.mission_id,
        user_id: data.user_id
    });

    if(acceptedMissionId === null){
        throw new MissionAcceptedError("이미 수락한 미션입니다.", data);
    }

    return {mission_id: data.mission_id, user_id: data.user_id};
}

export const listShopReviews = async(shopId, cursor) => {
    const reviews = await getAllStoreReviews(shopId, cursor);

    if(reviews === null){                      //상점을 찾았을 때 없으면 null반환후 에러 처리
        throw new NoShopDataError("리뷰를 불러올 상점이 없습니다.", shopId);
    }

    if(reviews.length == 0){                  //상점이 있지만 리뷰가 없어서 길이가 0일때 에러 처리
        throw new NoReviewsError("상점에 리뷰가 없습니다.", shopId);
    }
    return responseFromReviews(reviews);
};

export const listMyReviews = async(userId, cursor) => {
    const reviews = await getMyReviews(userId, cursor);

    if(reviews === null){                      
        throw new NoUserError("리뷰를 불러올 유저가 없습니다.", userId);
    }

    if(reviews.length == 0){                 
        throw new NoReviewsError("유저가 작성한 리뷰가 없습니다.", userId);
    }

    return responseFromReviews(reviews);
}

export const listShopMissions = async(shopId, cursor) => {
    const missions = await getStoreMissions(shopId, cursor);

    if(missions === null){                   
        throw new NoShopDataError("미션을 불러올 상점이 없습니다.", shopId);
    }

    if(missions.length == 0){           
        throw new NoMissionError("상점에 미션이 없습니다.", shopId);
    }

    return responseFromMissions(missions);
}

export const listMyMissions = async(userId, cursor) => {
    const missions = await getMyMissions(userId, cursor);

    if(missions === null){                      
        throw new NoUserError("미션을 불러올 유저가 없습니다.", userId);
    }

    if(missions.length == 0){                 
        throw new NoMissionError("유저가 수락한 미션이 없습니다.", userId);
    }

    return responseFromUserMissions(missions);
}

export const successMission = async(userId, missionId) => {
    const mission = await completeMission(userId, missionId);

    if(mission === null){
        throw new WrongMissionHandle("수락 처리할 미션 또는 유저가 없습니다.", userId);
    }
}

export const userInfo = async(userInfo) => {
    const user = await userManip(userInfo);

    if(user === null){
        throw new NoUserError("정보를 수정할 유저가 없습니다.", userInfo.username);
    }

    return user;
}