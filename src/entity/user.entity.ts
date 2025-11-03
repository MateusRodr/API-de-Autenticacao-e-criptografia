export interface userProps {
    id: string;
    email: string;
    name: string;
    password: string;
}

export class User {

    private props: userProps;
    public readonly id: string;

    constructor(props: userProps) {
        this.props = props;
        this.id = props.id;
    }

    public getEmail(): string {
        return this.props.email;
    }

    public getName(): string {
        return this.props.name;
    }

    public getPassword(): string {
        return this.props.password;
    }

    toJSON(){
        return {
            id: this.id,
            email: this.props.email,
            name: this.props.name,
            password: this.props.password
        };
    }
}