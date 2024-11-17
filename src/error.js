export class NoShopDataError extends Error{
    errorCode = "E001";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class MissionAcceptedError extends Error{
    errorCode = "E002";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NoReviewsError extends Error{
    errorCode = "E003";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NoUserError extends Error{
    errorCode = "E004";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class NoMissionError extends Error{
    errorCode = "E005";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}

export class WrongMissionHandle extends Error{
    errorCode = "E006";

    constructor(reason, data){
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}