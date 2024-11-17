import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {
  handleUserSignUp,
  handleShopAdd,
  handleShopReview,
  handleNewMission,
  handleMissionAccept,
  handleListShopReviews,
  handleListMyReviews,
  handleListShopMissions,
  handleListMyMissions,
  handleMissionSuccess
} from "./controllers/user.controller.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");                                                                                                                                                              
});


app.use((req, res, next) => {
  res.success = (success) => {    //res.success 함수의 정의
    return res.json({resultType: "SUCCESS", error: null, success});
  };

  res.error = ({errorCode = "unknown", reason = null, data = null}) => {   //res.error 함수의 정의
    return res.json({
      resultType: "FAIL",
      error: {errorCode, reason, data},
      success: null,
    });
  };

  next();
});



app.post("/home/users/signup", handleUserSignUp);  //controllers/user.controller.js의 handleUserSignUp 호출

app.post("/home/area/addShop", handleShopAdd);

app.post("/shops/reviews/upload", handleShopReview);

app.post("/shops/missions/addMission", handleNewMission);

app.post("/home/users/missionAccept", handleMissionAccept);

app.get("/shops/:shopId/reviews", handleListShopReviews);

app.get("/home/users/:userId/myReviews", handleListMyReviews);

app.get("/shops/:shopId/missions", handleListShopMissions);

app.get("/home/users/:userId/myMissions", handleListMyMissions);

app.patch("/home/users/:userId/:missionId/success", handleMissionSuccess);

app.use((err, req, res, next) => {     //에러 처리 미들웨어
  if(res.headersSent){                 //응답에서 http 헤더가 존재하면
    return next(err);                  //에러처리로 넘어감
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",      //errorCode가 존재하면 반환. 없으면 unknown 반환
    reason: err.reason || err.message || null, //err.reason가 존재하면 반환. 없으면 err.message 반환. 이마저도 없으면 null반환
    data: err.data || null,                     //err.data가 존재하면 반환. 없으면 null 반환
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});