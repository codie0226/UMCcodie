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

