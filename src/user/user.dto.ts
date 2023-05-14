export class CreateUserDto {
  readonly name: string;
  readonly age: number;
  readonly gender: string;
}

export class UpdateUserDto {
  readonly name: string;
  readonly age: number;
  readonly gender: string;
}

export class FindUserDto {
  readonly page: number;
  readonly size: number;
  readonly query: string;
  readonly order: string;
}
