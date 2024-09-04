import { Expose } from 'class-transformer';
import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './Entity';
import Post from './Post';
import { User } from './User';

@Entity('subs')
export default class Sub extends BaseEntity {
  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column({ nullable: true })
  bannerUrn: string;

  @Column()
  email: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];

  @Expose()
  get imageUrl(): string {
    return this.imageUrn
      ? `${process.env.APP_URL}/images/${this.imageUrn}`
      : 'https://www.gravatar.com/avatar?d=mp&f=y';
  }

  @Expose()
  get bannerUrl(): string {
    return this.bannerUrn ? `${process.env.APP_URL}/images/${this.bannerUrn}` : undefined;
  }
}

/*
@JoinColumn을 통해서 어떤 관계쪽이 외래 키(Foreign Key)를 가지고 있는지 나타냄
@JoinColumn을 설정하면 데이터베이스에 propertyName + referencedColumnName이라는 열이 자동으로 생성됨
이 데코레이터는 @ManyToOne의 경우 선택 사항이지만 @OneToOne의 경우 필수임
외래키는 참조하는 테이블에서 1개의 키 (속성, 속성의 집합)에 해당하고,
참조하는 측의 관계 변수는 참조되는 측의 테이블의 키를 가리킨다.
참조하는 테이블의 속성의 행 1개의 값은, 참조되는 측 테이블의 행 값에 대응된다.

name : 외래키 속성명, name이 없다면 propertyName + referencedColumnName이 default
referencedColumnName이 : 참조 엔티티의 참조 속성명. id가 default
둘다 없으면 FK필드는 FK속성명+id가 됨
*/
