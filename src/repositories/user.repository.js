import { pool } from "../db.config.js";

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
    const conn = await pool.getConnection();

    try{
      const [shop] = await pool.query(
        'INSERT INTO shops (area_id, shop_name) VALUES (?, ?);',
        [
          data.area_id,
          data.shop_name
        ]
      );

      return shop.insertId;
    }catch(err){
      throw new Error(
        `오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`
      );
    }finally{
      conn.release();
    }
  };

  export const addReview = async(data) => { 
    const conn = await pool.getConnection();

    try{
      const [confirm] = await pool.query(
        'SELECT EXISTS(SELECT 1 FROM shops WHERE id = ?) as isExistShop;', data.shop_id
      );

      if(!confirm[0].isExistShop){
        return null;
      }

      const [review] = await pool.query(
        'INSERT INTO reviews (user_id, shop_id, content, rating) VALUES(?, ?, ?, ?);',
        [
          data.user_id,
          data.shop_id,
          data.content,
          data.rating
        ]
      )

      return review.insertId;
    }catch(err){
      throw new Error(
        `오류가 발생했습니다. 요청 패러미터를 확인해주세요. (${err})`
      );
    }finally{
      conn.release();
    }
  }

  export const addMission = async(data) => {
    const conn = await pool.getConnection();

    try{
      const [mission] = await pool.query(
        'INSERT INTO missions(area_id, shop_id, point, mission_content) VALUES (?, ?, ?, ?);',
        [
          data.area_id,
          data.shop_id,
          data.point,
          data.mission_content
        ]
      );

      return mission.insertId;
    }catch(err){
      throw new Error(
        `오류가 발생했습니다. 요청 패러미터를 확인해주세요. (${err})`
      );
    }finally{
      conn.release();
    }
  }

  export const acceptMission = async(data) => {
    const conn = await pool.getConnection();

    try{
      const [confirm] = await pool.query(
        'SELECT EXISTS(SELECT 1 FROM missions WHERE id = ?) as isExistMission;', data.mission_id
      );

      if(confirm[0].isExistMission){
        return null;
      }

      const [accept] = await pool.query(
        'INSERT INTO user_missions(mission_id, user_id, is_complete) VALUES (?, ?, ?)', data.mission_id
      );

      return accept.insertId;
    }catch(err){
      throw new Error(
        `오류가 발생했습니다. 요청 패러미터를 확인해주세요. (${err})`
      );
    }finally{
      conn.release();
    }
  }