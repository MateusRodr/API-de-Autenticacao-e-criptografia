import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("users")
export class UserORM {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;
}