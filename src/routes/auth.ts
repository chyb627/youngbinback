import { Validator, isEmpty, validate } from 'class-validator';
import { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '@/entities/User';
import userMiddleware from '@/middlewares/user';
import authMiddleware from '@/middlewares/auth';

dotenv.config();
const mapError = (errors: Object[]) => {
  return errors.reduce((prev: any, err: any) => {
    prev[err.property] = Object.entries(err.constraints)[0][1];

    return prev;
  }, {});
};

const me = async (req: Request, res: Response) => {
  return res.json(res.locals.user);
};

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    let errors: any = {};

    // 이메일이 이미 저장 사용되고 있는 것인지 확인.
    const emailUser = await User.findOneBy({ email });

    // 이미 있다면 errors 객체에 넣어줌.
    if (emailUser) errors.email = '이미 해당 이메일 주소가 사용되었습니다.';

    // 에러가 있다면 return으로 에러를 response 보내줌.
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    // 엔티티에 정해 놓은 조건으로 user 데이터의 유효성 검사를 해줌.
    const validator = new Validator();
    errors = await validator.validate(user);
    // errors = await validate(user);

    if (errors.length > 0) return res.status(400).json(mapError(errors));

    // 유저 정보를 user table에 저장.
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let errors: any = {};
    // 비워져있다면 에러를 프론트엔드로 보내주기
    if (isEmpty(email)) errors.email = '이메일은 비워둘 수 없습니다.';
    if (isEmpty(password)) errors.password = '비밀번호는 비워둘 수 없습니다.';
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // 디비에서 이메일로 정보 찾기
    const user = await User.findOneBy({ email });

    if (!user) return res.status(404).json({ email: '이메일이 등록되지 않았습니다.' });

    // 이메일이 있다면 비밀번호 비교하기
    const passwordMatches = await bcrypt.compare(password, user.password);

    // 비밀번호가 다르다면 에러 보내기
    if (!passwordMatches) {
      return res.status(401).json({ password: '비밀번호가 잘못되었습니다.' });
    }

    // 비밀번호가 맞다면 토큰 생성
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET || '');

    // 쿠키저장
    // 쿠키옵션
    // httpOnly : 자바스크립트 같은 클라이언트 측 스크립트가 쿠키를 사용할 수 없게 한다. document.cookie를 통해 쿠키를 볼 수도 없고 조작할 수도 없다.
    // secure : HTTPS 연결에서만 쿠키를 사용할 수 있게 한다.
    // sameSite : 요청이 외부 사이트에서 일어날 때, 브라우저가 쿠키를 보내지 못하도록 막아준다. XSRF공격을 막는데 유용하다.
    // expires/max-age : 쿠키의 만료 시간을 정해준다. 이 옵션이 없으면 브라우저가 닫힐 때 쿠키도 같이 삭제 된다.
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });

    return res.json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const logout = async (_: Request, res: Response) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
  res.status(200).json({ success: true });
};

const router = Router();

router.get('/me', userMiddleware, authMiddleware, me);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', userMiddleware, authMiddleware, logout);

export default router;
