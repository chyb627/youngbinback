import { IsEmail, Length } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Index, In, OneToMany, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import Post from './Post';
import Vote from './Vote';
import BaseEntity from './Entity';

@Entity('users')
export class User extends BaseEntity {
  @Index()
  @IsEmail(undefined, { message: '이메일 주소가 잘못되었습니다.' })
  @Length(1, 255, { message: '이메일 주소는 비워둘 수 없습니다.' })
  @Column({ unique: true })
  email: string;

  @Length(3, 32, { message: '사용자 이름은 3자 이상이어야 합니다.' })
  @Column()
  username: string;

  @Column()
  @Length(6, 255, { message: '비밀번호는 6자리 이상이어야 합니다.' })
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}

/*
@Entity() 데코레이터 클래스는 User 클래스가 엔티티임을 나타내는 데 사용된다. CREATE TABLE user 부분.
@IsEmail, @Length 는 유효성 체크
@Column 데코레이터 클래스는 User 엔티티의 email 및 username과 같은 다른 열을 나타내는 데 사용된다.
@Index() 데코레이터 클래스는 데이터베이스 인덱스를 생성한다. 엔터티 속성 또는 엔터티에 사용할 수 있다.
*/
