interface IUser {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
export class User implements IUser {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}


// @Entity()
// export class User {

//   @PrimaryGeneratedColumn("uuid")
//   id: string;

//   @Column()
//   login: string;

//   @Column()
//   password: string;

//   @VersionColumn()
//   version: number;

//   @CreateDateColumn()
//   createdAt: string;

//   @UpdateDateColumn()
//   updatedAt: string;

// }; 