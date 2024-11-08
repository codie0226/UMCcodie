import {StatusCodes} from "http-status-codes";
import {
    bodyToUser,
    bodyToShop,
    bodyToReview,
    bodyToMission
} from "../dtos/user.dto.js";
import {
    userSignUp,
    shopToArea,
    reviewToShop,
    missionToShop,
    missionAccept,
    listShopReviews,
    listMyReviews,
    listShopMissions,
    listMyMissions,
    successMission
} from "../services/user.service.js";


export const handleUserSignUp = async (req, res, next) => {
    console.log("회원가입을 요청했습니다.");
    console.log("body: ", req.body);

    const user = await userSignUp(bodyToUser(req.body));  //dto변환후 userSignUp호출
    res.status(StatusCodes.OK).json({result: user});
}

export const handleShopAdd = async (req, res, next) => {
    console.log("가게 추가하기를 요청했습니다.");
    console.log("body: ", req.body);

    const newShop = await shopToArea(bodyToShop(req.body));
    res.status(StatusCodes.OK).json({result: newShop});
}

export const handleShopReview = async (req, res, next) => {
    console.log("가게 리뷰 추가하기를 요청했습니다.");
    console.log("body: ", req.body);

    const newReview = await reviewToShop(bodyToReview(req.body));
    res.status(StatusCodes.OK).json({result: newReview});
}

export const handleNewMission = async (req, res, next) => {
    console.log("새로운 미션 추가하기를 요청했습니다.");
    console.log("body: ", req.body);

    const newMission = await missionToShop(bodyToMission(req.body));
    res.status(StatusCodes.OK).json({result: newMission});
}

export const handleMissionAccept = async (req, res, next) => {
    console.log("미션 수락하기를 요청했습니다.");
    console.log("body: ", req.body);

    const missionAcception = await missionAccept(req.body);
    res.status(StatusCodes.OK).json({result: missionAcception});
}

export const handleListShopReviews = async(req, res, next) => {
    console.log("리뷰 불러오기를 요청합니다.");
    console.log(req.params.shopId);
    const reviews = await listShopReviews(
        parseInt(req.params.shopId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0   //cursor값이 없으면 0으로 설정
    );
    res.status(StatusCodes.OK).json({reviews});
};

export const handleListMyReviews = async(req, res, next) => {
    console.log("나의 리뷰 불러오기를 요청합니다.");
    const reviews = await listMyReviews(
        parseInt(req.params.userId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({reviews});
};

export const handleListShopMissions = async(req, res, next) => {
    console.log("상점 미션 불러오기를 요청합니다.");
    const missions = await listShopMissions(
        parseInt(req.params.shopId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({missions});
};

export const handleListMyMissions = async(req, res, next) => {
    console.log("나의 미션 목록 불러오기를 요청합니다.");
    const missions = await listMyMissions(
        parseInt(req.params.userId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor): 0
    );
    res.status(StatusCodes.OK).json({missions});
};

export const handleMissionSuccess = async(req, res, next) => {
    console.log("미션 완수를 요청합니다.");
    const mission = await successMission(
        parseInt(req.params.userId),
        parseInt(req.params.missionId)
    );

    res.status(StatusCodes.OK).send("성공적으로 완수되었습니다.");
}