import { pool } from "../db.config.js";
import {prisma} from "../db.config.js";

export const addUser = async (data) => {
    const conn = await pool.getConnection();

    try{
        const [confirm] = await pool.query(
            'SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;',
            data.email
        );

        if(confirm[0].isExistEmail){
            return null;
        }

        const [result] = await pool.query(
            'INSERT INTO user (email, name, gender, birth, address, detail_address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?);',
            [
                data.email,
                data.name,
                data.gender,
                data.birth,
                data.address,
                data.detailAddress,
                data.phoneNumber,
            ]
        );

        return result.insertId;
    }catch(err){
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    }finally{
        conn.release();
    }
};

export const getUser = async (userId) => {
    const conn = await pool.getConnection();

    try{
        const [user] = await pool.query('SELECT * FROM user WHERE id = ?', userId);

        console.log(user);

        if(user.length == 0){
            return null;
        }

        return user;
    }catch(err){
        throw new Error(
            `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
        );
    }finally{
        conn.release();
    }
};

export const setPreference = async (userId, foodCategoryId) => {
    const conn = await pool.getConnection();
  
    try {
      await pool.query(
        `INSERT INTO user_favor_category (food_category_id, user_id) VALUES (?, ?);`,
        [foodCategoryId, userId]
      );
  
      return;
    } catch (err) {
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
  };
  
  // 사용자 선호 카테고리 반환
  export const getUserPreferencesByUserId = async (userId) => {
    const conn = await pool.getConnection();
  
    try {
      const [preferences] = await pool.query(
        "SELECT ufc.id, ufc.food_category_id, ufc.user_id, fcl.name " +
          "FROM user_favor_category ufc JOIN food_category fcl on ufc.food_category_id = fcl.id " +
          "WHERE ufc.user_id = ? ORDER BY ufc.food_category_id ASC;",
        userId
      );
  
      return preferences;
    } catch (err) {
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
  };

  export const addShop = async (data) => {
    // const conn = await pool.getConnection();

    // try{
    //   const [shop] = await pool.query(
    //     'INSERT INTO shops (area_id, shop_name) VALUES (?, ?);',
    //     [
    //       data.area_id,
    //       data.shop_name
    //     ]
    //   );

    //   return shop.insertId;
    // }catch(err){
    //   throw new Error(
    //     `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
    //   );
    // }finally{
    //   conn.release();
    // }

    try{
      const created = await prisma.shops.create({data: data});

      return created.id;
    }catch(err){
      throw new Error(
        `오류가 발생했습니다. (${err})`
      );
    }
  };

  export const addReview = async(data) => { 
    const created = await prisma.reviews.create({data: data});

    return created.id;
  }

  export const addMission = async(data) => {
    const created = await prisma.missions.create({data: data});

    return created.id;
  }

  export const acceptMission = async(data) => {
    const isExistMission = await prisma.user_missions.findFirst({where: {
        AND: [
          {mission_id: data.mission_id},
          {user_id: data.user_id}
        ]
      }
    });
    if(isExistMission != null){
      return null;
    }

    const created = await prisma.user_missions.create({data: data});
  }

  export const getAllStoreReviews = async(shopId, cursor) => {
    const reviews = await prisma.reviews.findMany({
      select: {
        id: true,
        content: true,
        shop_id: true,
        user_id: true,
        rating: true
      },
      where: {shop_id: shopId, id: {gt: cursor}},
      orderBy: {id: "asc"},
      take: 5,
    });

    return reviews;
  }

  export const getMyReviews = async(userId, cursor) => {
    const reviews = await prisma.reviews.findMany({
      select: {
        id: true,
        content: true,
        shop_id: true,
        user_id: true,
        rating: true
      },
      where: {user_id: userId, id: {gt: cursor}},
      orderBy: {id: "asc"},
      take: 5,
    });

    return reviews;
  }

  export const getStoreMissions = async(shopId, cursor) => {
    const missions = await prisma.missions.findMany({
      select: {
        id: true,
        area_id: true,
        shop_id: true,
        point: true,
        mission_content: true
      },
      where: {shop_id: shopId, id: {gt: cursor}},
      orderBy: {id: "asc"},
      take: 5,
    });

    return missions
  }

  export const getMyMissions = async(userId, cursor) => {
    const missions = await prisma.user_missions.findMany({
      select: {
          id: true,
          mission_id: true,
          is_complete: true,
          user_id: true,
      },
      
      where: {user_id: userId, id: {gt: cursor}},
      
      orderBy: {id: "asc"},
      take: 5,
    })

    return missions;
  }

  export const completeMission = async(userId, missionId) => {
    const mid = await prisma.user_missions.findFirst({
      where: {user_id: userId, mission_id: missionId},
    });
    const mission = await prisma.user_missions.update({
      where: {id: mid.id},
      data: {
        is_complete: true
      },
    })
  }