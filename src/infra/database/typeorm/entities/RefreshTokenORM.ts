// infra/database/typeorm/entities/RefreshTokenORM.ts
import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("refresh_tokens")
export class RefreshTokenORM {
  @PrimaryColumn("uuid")
  id!: string;

  @Column()
  token!: string;

  @Column()
  userId!: string;

  @Column()
  expiresIn!: Date;
}