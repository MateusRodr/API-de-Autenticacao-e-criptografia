export type RefreshTokenProps = {
  id: string;
  token: string;
  userId: string;
  expiresIn: Date;
};

export class RefreshToken {
  private props: RefreshTokenProps;

  constructor(props: RefreshTokenProps) {
    this.props = props;
  }

  getId() {
    return this.props.id;
  }

  getToken() {
    return this.props.token;
  }

  getUserId() {
    return this.props.userId;
  }

  getExpiresIn() {
    return this.props.expiresIn;
  }

  toJSON() {
    return {
      id: this.props.id,
      token: this.props.token,
      userId: this.props.userId,
      expiresIn: this.props.expiresIn,
    };
  }
}
