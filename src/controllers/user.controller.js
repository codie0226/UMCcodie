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
    missionAccept
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