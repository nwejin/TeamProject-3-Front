// Api 호출을 처리하는 파일
import axios from 'axios';

// 회원가입
export const register = async (userData: any) => {
  console.log(userData);
  try {
      const response = await axios.post('/register', userData);
      return response.data;
  } catch (error) {
      throw new Error('예상치 못한 오류가 발생했습니다!');
  }
};