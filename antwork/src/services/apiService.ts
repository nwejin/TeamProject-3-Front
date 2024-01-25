// Api 호출을 처리하는 파일
import axios from 'axios';

// 회원가입
export const register = async (userData: any) => {
  console.log(userData);
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKSERVER + '/register',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('예상치 못한 오류가 발생했습니다!');
  }
};

// 로그인
export const login = async (userData: any) => {
  console.log(userData);
  console.log(process.env.REACT_APP_BACKSERVER);
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKSERVER + '/login',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('예상치 못한 오류가 발생했습니다!');
  }
};

export const idChecker = async (userData: any) => {
  console.log(userData);
  console.log(process.env.REACT_APP_BACKSERVER);
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKSERVER + '/idValidate',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('예상치 못한 오류가 발생했습니다!');
  }
};

export const nicknameChecker = async (userData: any) => {
  console.log(userData);
  console.log(process.env.REACT_APP_BACKSERVER);
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKSERVER + '/nicknameValidate',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('예상치 못한 오류가 발생했습니다!');
  }
};

export const FindId = async (userData: any) => {
  console.log(userData);
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKSERVER + '/findId',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('예상치 못한 오류가 발생했습니다!');
  }
};

export const FindPw = async (userData: any) => {
  console.log(userData);
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKSERVER + '/findPw',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('예상치 못한 오류가 발생했습니다!');
  }
};

export const ChangePw = async (userData: any) => {
  console.log(userData);
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKSERVER + '/changePw',
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('예상치 못한 오류가 발생했습니다!');
  }
};

// 커뮤니티 게시글 생성
export const newPost = async (communityData: any) => {
  console.log('communityData>', communityData);
  console.log('Sending POST request to /community/write');
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKSERVER + '/community/write',
      communityData,
      {
        headers: {
          // 'Content-Type': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log(process.env.REACT_APP_BACKSERVER + '/community/write');
    throw new Error('예상치 못한 오류가 발생했습니다!');
  }
};

// 커뮤니티 게시글 가져오기 (커뮤니티 메인 화면에 띄우기)
export const getCommunityPosts = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_BACKSERVER + '/community/read'
    );
    return response.data;
  } catch (error) {
    console.error(error); // 에러 메시지를 콘솔에 출력
    throw new Error('예상치 못한 오류가 발생했습니다!');
  }
};

// 좋아요
export const like = async (like: any) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKSERVER + '/community/like',
      like,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('예상치 못한 오류가 발생했습니다!');
  }
};
