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
    /*
    #swagger.summary = "상점 추가 API";
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        area_id: {type: "integer"},
                        shop_name: {type: "string"}
                    }
                }
            }
        }
    };
    #swagger.responses[200] = {
      description: "상점 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  area_id: {type: "integer"},
                  shop_name: {type: "string"}
                }
              }
            }
          }
        }
      }
    };

    */
    console.log("가게 추가하기를 요청했습니다.");
    console.log("body: ", req.body);

    const newShop = await shopToArea(bodyToShop(req.body));
    res.status(StatusCodes.OK).success(newShop);
}

export const handleShopReview = async (req, res, next) => {
    /*
    #swagger.summary = "상점에 리뷰 추가 API";
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        user_id: {type: "integer"},
                        shop_id: {type: "integer"},
                        content: {type: "string"},
                        rating: {type: "number", format: "float"}
                    }
                    example: {
                        user_id: 1,
                        shop_id: 1,
                        content: "추가하려는 리뷰의 내용",
                        rating: 3.4
                    }
                }
            }
        }
    };
    #swagger.responses[200] = {
        description: "상점에 리뷰 추가 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "SUCCESS"},
                        error: {type: "object", nullable: true, example: null},
                        success: {
                            type: "object",
                            properties: {
                                content: {type: "string"},
                                rating: {type: "number", format: "float"}
                            }
                        }
                    }
                }
            }
        }
    };
    #swagger.responses[400] = {
        description: "상점에 리뷰 추가 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "FAIL"},
                        error: {
                            type: "object",
                            properties: {
                                errorCode: {type: "string", example: "U001"},
                                reason: {type: "string"},
                                data: {type: "object"}
                            }
                        },
                        success: {type: "object", nullable: true, example: null}
                    }
                }
            }
        }
    };
    */
    console.log("가게 리뷰 추가하기를 요청했습니다.");
    console.log("body: ", req.body);

    const newReview = await reviewToShop(bodyToReview(req.body));
    res.status(StatusCodes.OK).success(newReview);
}

export const handleNewMission = async (req, res, next) => {
    /* 
    #swagger.summary = "상점에 미션 추가 API";
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        area_id: {type: "integer"},
                        shop_id: {type: "integer"},
                        point: {type: "integer"},
                        mission_content: {type: "string"}
                    }
                }
            }
        }
    };
    #swagger.responses[200] = {
        description: "상점에 미션 추가 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "SUCCESS"},
                        error: {type: "object", nullable: true, example: null},
                        success: {
                            type: "object",
                            properties: {
                                shop_id: {type: "integer"},
                                mission_content: {type: "string"}
                            }
                        }
                    }
                }
            }
        }
    };
    #swagger.responses[400] = {
        description: "상점에 미션 추가 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "FAIL"},
                        error: {
                            type: "object",
                            properties: {
                                errorCode: {type: "string", example: "U001"},
                                reason: {type: "string" example: "상점을 찾을 수 없습니다."},
                                data: {type: "object"}
                            }
                        },
                        success: {type: "object", nullable: true, example: null}
                    }
                }
            }
        }
    };
    */
    console.log("새로운 미션 추가하기를 요청했습니다.");
    console.log("body: ", req.body);

    const newMission = await missionToShop(bodyToMission(req.body));
    res.status(StatusCodes.OK).success(newMission);
}

export const handleMissionAccept = async (req, res, next) => {
    /* 
    #swagger.summary = "미션 수락하기 API";
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        mission_id: {type: "integer"},
                        user_id: {type: "integer"}
                    }
                }
            }
        }
    };
    #swagger.responses[200] = {
        description: "유저 미션 수락 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "SUCCESS"},
                        error: {type: "object", nullable: true, example: null},
                        success: {
                            type: "object",
                            properties: {
                                mission_id: {type: "integer"},
                                user_id: {type: "integer"}
                            }
                        }
                    }
                }
            }
        }
    };
    #swagger.responses[400] = {
        description: "유저 미션 수락 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "FAIL"},
                        error: {
                            type: "object",
                            properties: {
                                errorCode: {type: "string", example: "U001"},
                                reason: {type: "string" example: "이미 수락한 미션입니다."},
                                data: {type: "object"}
                            }
                        },
                        success: {type: "object", nullable: true, example: null}
                    }
                }
            }
        }
    };
    */
    console.log("미션 수락하기를 요청했습니다.");
    console.log("body: ", req.body);

    const missionAcception = await missionAccept(req.body);
    res.status(StatusCodes.OK).success(missionAcception);
}

export const handleListShopReviews = async(req, res, next) => {
    /* 
    #swagger.summary = "상점 리뷰 목록 불러오기 API";
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    shopId: {type: "integer"},
                    cursor: {type: "integer"}
                }
            }
        }
    };
    #swagger.responses[200] = {
        description: "상점 리뷰 목록 불러오기 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "SUCCESS"},
                        error: {type: "object", nullable: true, example: null},
                        success: {
                            type: "object",
                            properties: {
                                data: {type: "array",
                                    item: {
                                        type: "object",
                                        properties: {
                                            id: {type: "integer"},
                                            content: {type: "string"},
                                            shop_id: {type: "integer"},
                                            user_id: {type: "integer"},
                                            rating: {type: "number", format: "float"}
                                        }
                                    }
                                }
                                cursor: {type: "integer"}
                            }
                        }
                    }
                }
            }
        }
    };
    #swagger.responses[400] = {
        description: "상점 리뷰 불러오기 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "FAIL"},
                        error: {
                            type: "object",
                            properties: {
                                errorCode: {type: "string", example: "U001"},
                                reason: {type: "string" example: "상점에 리뷰가 없습니다."},
                                data: {type: "object"}
                            }
                        },
                        success: {type: "object", nullable: true, example: null}
                    }
                }
            }
        }
    };
    */
    console.log("리뷰 불러오기를 요청합니다.");
    console.log(req.params.shopId);
    const reviews = await listShopReviews(
        parseInt(req.params.shopId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0   //cursor값이 없으면 0으로 설정
    );
    res.status(StatusCodes.OK).success(reviews);
};

export const handleListMyReviews = async(req, res, next) => {
    /* 
    #swagger.summary = "나의 리뷰 목록 불러오기 API";
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    userId: {type: "integer"},
                    cursor: {type: "integer"}
                }
            }
        }
    };
    #swagger.responses[200] = {
        description: "나의 리뷰 목록 불러오기 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "SUCCESS"},
                        error: {type: "object", nullable: true, example: null},
                        success: {
                            type: "object",
                            properties: {
                                data: {type: "array",
                                    item: {
                                        type: "object",
                                        properties: {
                                            id: {type: "integer"},
                                            content: {type: "string"},
                                            shop_id: {type: "integer"},
                                            user_id: {type: "integer"},
                                            rating: {type: "number", format: "float"}
                                        }
                                    }
                                }
                                cursor: {type: "integer"}
                            }
                        }
                    }
                }
            }
        }
    };
    #swagger.responses[400] = {
        description: "나의 리뷰 불러오기 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "FAIL"},
                        error: {
                            type: "object",
                            properties: {
                                errorCode: {type: "string", example: "U001"},
                                reason: {type: "string" example: "유저가 작성한 리뷰가 없습니다."},
                                data: {type: "object"}
                            }
                        },
                        success: {type: "object", nullable: true, example: null}
                    }
                }
            }
        }
    };
    */
    console.log("나의 리뷰 불러오기를 요청합니다.");
    const reviews = await listMyReviews(
        parseInt(req.params.userId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
};

export const handleListShopMissions = async(req, res, next) => {
    /* 
    #swagger.summary = "상점 미션 목록 불러오기 API";
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    shopId: {type: "integer"},
                    cursor: {type: "integer"}
                }
            }
        }
    };
    #swagger.responses[200] = {
        description: "상점 미션 목록 불러오기 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "SUCCESS"},
                        error: {type: "object", nullable: true, example: null},
                        success: {
                            type: "object",
                            properties: {
                                data: {type: "array",
                                    item: {
                                        type: "object",
                                        properties: {
                                            id: {type: "integer"},
                                            area_id: {type: "integer"},
                                            shop_id: {type: "integer"},
                                            point: {type: "integer"},
                                            mission_content: {type: "string"}
                                        }
                                    }
                                }
                                cursor: {type: "integer"}
                            }
                        }
                    }
                }
            }
        }
    };
    #swagger.responses[400] = {
        description: "상점 미션 목록 불러오기 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "FAIL"},
                        error: {
                            type: "object",
                            properties: {
                                errorCode: {type: "string", example: "U001"},
                                reason: {type: "string" example: "상점에 미션이 없습니다."},
                                data: {type: "object"}
                            }
                        },
                        success: {type: "object", nullable: true, example: null}
                    }
                }
            }
        }
    };
    */
    console.log("상점 미션 불러오기를 요청합니다.");
    const missions = await listShopMissions(
        parseInt(req.params.shopId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(missions);
};

export const handleListMyMissions = async(req, res, next) => {
    /* 
    #swagger.summary = "나의 미션 목록 불러오기 API";
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    userId: {type: "integer"},
                    cursor: {type: "integer"}
                }
            }
        }
    };
    #swagger.responses[200] = {
        description: "나의 미션 목록 불러오기 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "SUCCESS"},
                        error: {type: "object", nullable: true, example: null},
                        success: {
                            type: "object",
                            properties: {
                                data: {type: "array",
                                    item: {
                                        type: "object",
                                        properties: {
                                            id: {type: "integer"},
                                            mission_id: {type: "integer"},
                                            is_complete: {type: "boolean"},
                                            user_id: {type: "integer"}
                                        }
                                    }
                                }
                                cursor: {type: "integer"}
                            }
                        }
                    }
                }
            }
        }
    };
    #swagger.responses[400] = {
        description: "나의 미션 목록 불러오기 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "FAIL"},
                        error: {
                            type: "object",
                            properties: {
                                errorCode: {type: "string", example: "U001"},
                                reason: {type: "string" example: "유저가 수락한 미션이 없습니다."},
                                data: {type: "object"}
                            }
                        },
                        success: {type: "object", nullable: true, example: null}
                    }
                }
            }
        }
    };
    */
    console.log("나의 미션 목록 불러오기를 요청합니다.");
    const missions = await listMyMissions(
        parseInt(req.params.userId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor): 0
    );
    res.status(StatusCodes.OK).success(missions);
};

export const handleMissionSuccess = async(req, res, next) => {
    /* 
    #swagger.summary = "미션 성공하기 API";
    #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    userId: {type: "integer"},
                    missionId: {type: "integer"}
                }
            }
        }
    };
    #swagger.responses[200] = {
        description: "미션 성공하기 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "SUCCESS"},
                        error: {type: "object", nullable: true, example: null},
                        success: {
                            type: "object", nullable: true, example: null
                        }
                    }
                }
            }
        }
    };
    #swagger.responses[400] = {
        description: "미션 성공하기 실패 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: {type: "string", example: "FAIL"},
                        error: {
                            type: "object",
                            properties: {
                                errorCode: {type: "string", example: "U001"},
                                reason: {type: "string" example: "수락 처리할 미션 또는 유저가 없습니다."},
                                data: {type: "object"}
                            }
                        },
                        success: {type: "object", nullable: true, example: null}
                    }
                }
            }
        }
    };
    */
    console.log("미션 완수를 요청합니다.");
    const mission = await successMission(
        parseInt(req.params.userId),
        parseInt(req.params.missionId)
    );

    res.status(StatusCodes.OK).success(mission);
}