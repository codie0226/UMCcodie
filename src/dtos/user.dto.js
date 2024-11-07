//요청을 받을 때 넘어온 req.body를 dto로 변환
export const bodyToUser = (body) => {
    const birth = new Date(body.birth);

    return{
        email: body.email,
        name: body.name,
        gender: body.gender,
        birth,
        address: body.address || "",
        detailAddress: body.detailAddress || "",
        phoneNumber: body.phoneNumber,
        preferences: body.preferences,
    };
};

export const bodyToShop = (body) => {
    return{
        area_id: body.area_id,
        shop_name: body.shop_name
    };
};

export const bodyToReview = (body) => {
    return{
        user_id: body.user_id,
        shop_id: body.shop_id,
        content: body.content,
        rating: body.rating
    };
};

export const bodyToMission = (body) => {
    return{
        area_id: body.area_id,
        shop_id: body.shop_id,
        point: body.point,
        mission_content: body.mission_content
    };
};